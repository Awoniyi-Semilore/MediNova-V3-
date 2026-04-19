import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { User, UserRole, TokenValidation, Hospital } from '../types';

const ADMIN_TOKEN = 'ADMIN-MEDINOVA-2026';

// Token verification
export const verifyToken = async (token: string): Promise<TokenValidation> => {
  // Check admin token
  if (token === ADMIN_TOKEN) {
    return { valid: true, type: 'admin', hospitalId: 'admin', hospitalName: 'MediNova Global' };
  }

  // Check hospital tokens
  const hospitalsRef = collection(db, 'hospitals');
  const q = query(hospitalsRef, where('tokens.hospital', '==', token));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const hospital = querySnapshot.docs[0].data() as Hospital;
    return { valid: true, type: 'learner', hospitalId: hospital.id, hospitalName: hospital.name };
  }

  // Check supervisor tokens
  const supervisorQuery = query(hospitalsRef, where('tokens.supervisor', '==', token));
  const supervisorSnapshot = await getDocs(supervisorQuery);

  if (!supervisorSnapshot.empty) {
    const hospital = supervisorSnapshot.docs[0].data() as Hospital;
    return { valid: true, type: 'supervisor', hospitalId: hospital.id, hospitalName: hospital.name };
  }

  // Check care tokens
  const careQuery = query(hospitalsRef, where('tokens.care', '==', token));
  const careSnapshot = await getDocs(careQuery);

  if (!careSnapshot.empty) {
    const hospital = careSnapshot.docs[0].data() as Hospital;
    return { valid: true, type: 'care', hospitalId: hospital.id, hospitalName: hospital.name };
  }

  return { valid: false };
};

// Check if email exists for hospital
export const checkEmailForHospital = async (email: string, hospitalId: string): Promise<User | null> => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email), where('hospitalId', '==', hospitalId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userData = querySnapshot.docs[0].data();
    return { ...userData, id: querySnapshot.docs[0].id } as User;
  }

  return null;
};

// Create new user
export const createUser = async (
  email: string, 
  fullName: string, 
  role: UserRole, 
  hospitalId: string,
  hospitalName: string,
  title?: string
): Promise<User> => {
  // Create auth user with temporary password
  const tempPassword = Math.random().toString(36).slice(-8);
  const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword);
  
  const userData: Omit<User, 'id'> = {
    email,
    fullName,
    title,
    role,
    hospitalId,
    hospitalName,
    createdAt: new Date(),
    lastLoginAt: new Date(),
    progress: {
      completedCases: 0,
      averageScore: 0,
      totalCases: 0
    }
  };

  await setDoc(doc(db, 'users', userCredential.user.uid), {
    ...userData,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp()
  });

  return { ...userData, id: userCredential.user.uid };
};

// Update user profile
export const updateUserProfile = async (
  email: string,
  updates: Partial<User>
): Promise<void> => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    await updateDoc(doc(db, 'users', userDoc.id), updates);
  }
};

// Login user
export const loginUser = async (email: string, password: string = 'temp123'): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
  
  if (!userDoc.exists()) {
    throw new Error('User data not found');
  }

  const userData = userDoc.data() as Omit<User, 'id'>;
  
  // Update last login
  await updateDoc(doc(db, 'users', userCredential.user.uid), {
    lastLoginAt: serverTimestamp()
  });

  return { ...userData, id: userCredential.user.uid };
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Get current user
export const getCurrentUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  if (userDoc.exists()) {
    const userData = userDoc.data() as Omit<User, 'id'>;
    return { ...userData, id: userDoc.id };
  }
  return null;
};

// Auth state listener
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await getCurrentUser(firebaseUser);
      callback(user);
    } else {
      callback(null);
    }
  });
};

// Register new staff (for supervisor)
export const registerStaff = async (
  email: string,
  fullName: string,
  role: UserRole,
  hospitalId: string,
  hospitalName: string,
  title?: string
): Promise<User> => {
  return createUser(email, fullName, role, hospitalId, hospitalName, title);
};

// Send new user notification to hospital
export const sendNewUserNotification = async (
  hospitalEmail: string,
  userName: string,
  userEmail: string,
  userRole: string
): Promise<void> => {
  // EmailJS integration would go here
  console.log('📧 New user notification:', {
    to: hospitalEmail,
    userName,
    userEmail,
    userRole,
    message: `A new user (${userName}, ${userEmail}) has requested access as ${userRole}`
  });
};
