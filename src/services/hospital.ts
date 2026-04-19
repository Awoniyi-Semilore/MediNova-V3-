import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Hospital, User, Patient, Case, Simulation } from '../types';

// Generate unique tokens
const generateToken = (prefix: string): string => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `${prefix}-${random}-${year}`;
};

export const getUpcomingAppointments = async (
  hospitalId: string,
  days: number
): Promise<Patient[]> => {
  const patients = await getHospitalPatients(hospitalId);

  const now = new Date();
  const future = new Date();
  future.setDate(now.getDate() + days);

  return patients.filter(p => {
    if (!p.nextAppointment) return false;
    const date = new Date(p.nextAppointment);
    return date >= now && date <= future;
  });
};

// Create hospital
export const createHospital = async (
  name: string,
  country: string,
  contactEmail: string,
  phone: string,
  paymentInfo?: string,
  notes?: string
): Promise<Hospital> => {
  const hospitalRef = doc(collection(db, 'hospitals'));
  
  const hospitalData: Omit<Hospital, 'id'> = {
    name,
    country,
    contactEmail,
    phone,
    paymentInfo,
    notes,
    tokens: {
      hospital: generateToken('HOSP'),
      supervisor: generateToken('SUPV'),
      care: generateToken('CARE')
    },
    createdAt: new Date(),
    staffCount: 0,
    patientCount: 0
  };

  await setDoc(hospitalRef, {
    ...hospitalData,
    createdAt: serverTimestamp()
  });

  return { ...hospitalData, id: hospitalRef.id };
};

// Get all hospitals
export const getAllHospitals = async (): Promise<Hospital[]> => {
  const q = query(collection(db, 'hospitals'), orderBy('name'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Omit<Hospital, 'id'>),
    id: doc.id
  }));
};

// Search hospitals
export const searchHospitals = async (searchTerm: string): Promise<Hospital[]> => {
  const hospitals = await getAllHospitals();
  const lowerTerm = searchTerm.toLowerCase();
  
  return hospitals.filter(h => 
    h.name.toLowerCase().includes(lowerTerm) ||
    h.country.toLowerCase().includes(lowerTerm)
  );
};

// Get hospital by ID
export const getHospitalById = async (id: string): Promise<Hospital | null> => {
  const docSnap = await getDoc(doc(db, 'hospitals', id));
  if (docSnap.exists()) {
    return { ...(docSnap.data() as Omit<Hospital, 'id'>), id: docSnap.id };
  }
  return null;
};

// Update hospital
export const updateHospital = async (
  id: string,
  updates: Partial<Hospital>
): Promise<void> => {
  await updateDoc(doc(db, 'hospitals', id), updates);
};

// Delete hospital
export const deleteHospital = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'hospitals', id));
};

// Get hospital staff
export const getHospitalStaff = async (hospitalId: string): Promise<User[]> => {
  const q = query(
    collection(db, 'users'),
    where('hospitalId', '==', hospitalId),
    orderBy('fullName')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Omit<User, 'id'>),
    id: doc.id
  }));
};

// Get hospital patients
export const getHospitalPatients = async (hospitalId: string): Promise<Patient[]> => {
  const q = query(
    collection(db, 'patients'),
    where('hospitalId', '==', hospitalId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Omit<Patient, 'id'>),
    id: doc.id,
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
    dateOfBirth: doc.data().dateOfBirth?.toDate(),
    expectedDeliveryDate: doc.data().expectedDeliveryDate?.toDate(),
    deliveryDate: doc.data().deliveryDate?.toDate(),
    nextAppointment: doc.data().nextAppointment?.toDate()
  }));
};

// Update hospital stats
export const updateHospitalStats = async (hospitalId: string): Promise<void> => {
  const staff = await getHospitalStaff(hospitalId);
  const patients = await getHospitalPatients(hospitalId);
  
  await updateDoc(doc(db, 'hospitals', hospitalId), {
    staffCount: staff.length,
    patientCount: patients.length
  });
};

// Get all staff (admin)
export const getAllStaff = async (): Promise<User[]> => {
  const q = query(collection(db, 'users'), orderBy('fullName'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Omit<User, 'id'>),
    id: doc.id
  }));
};

// Get all patients (admin)
export const getAllPatients = async (): Promise<Patient[]> => {
  const q = query(collection(db, 'patients'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Omit<Patient, 'id'>),
    id: doc.id,
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
    dateOfBirth: doc.data().dateOfBirth?.toDate(),
    expectedDeliveryDate: doc.data().expectedDeliveryDate?.toDate(),
    deliveryDate: doc.data().deliveryDate?.toDate(),
    nextAppointment: doc.data().nextAppointment?.toDate()
  }));
};

// Case management
export const createCase = async (caseData: Omit<Case, 'id' | 'createdAt'>): Promise<Case> => {
  const caseRef = doc(collection(db, 'cases'));
  
  await setDoc(caseRef, {
    ...caseData,
    createdAt: serverTimestamp()
  });

  return { ...caseData, id: caseRef.id, createdAt: new Date() };
};

export const getAllCases = async (): Promise<Case[]> => {
  const q = query(collection(db, 'cases'), orderBy('order'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Omit<Case, 'id'>),
    id: doc.id,
    createdAt: doc.data().createdAt?.toDate()
  }));
};

export const updateCase = async (id: string, updates: Partial<Case>): Promise<void> => {
  await updateDoc(doc(db, 'cases', id), updates);
};

export const deleteCase = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'cases', id));
};

// Simulation management
export const createSimulation = async (simData: Omit<Simulation, 'id' | 'createdAt'>): Promise<Simulation> => {
  const simRef = doc(collection(db, 'simulations'));
  
  await setDoc(simRef, {
    ...simData,
    createdAt: serverTimestamp()
  });

  return { ...simData, id: simRef.id, createdAt: new Date() };
};

export const getAllSimulations = async (): Promise<Simulation[]> => {
  const q = query(collection(db, 'simulations'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Omit<Simulation, 'id'>),
    id: doc.id,
    createdAt: doc.data().createdAt?.toDate()
  }));
};

export const updateSimulation = async (id: string, updates: Partial<Simulation>): Promise<void> => {
  await updateDoc(doc(db, 'simulations', id), updates);
};

export const deleteSimulation = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'simulations', id));
};
