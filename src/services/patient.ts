import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Patient } from '../types';

// Generate patient ID
const generatePatientId = (): string => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `MED-${year}-${random}`;
};

// Create patient
export const createPatient = async (
  patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Patient> => {
  const patientRef = doc(collection(db, 'patients'));
  
  const newPatient: Omit<Patient, 'id'> = {
    ...patientData,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await setDoc(patientRef, {
    ...newPatient,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return { ...newPatient, id: patientRef.id };
};

// Get patient by ID
export const getPatientById = async (id: string): Promise<Patient | null> => {
  const docSnap = await getDoc(doc(db, 'patients', id));
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      ...(data as Omit<Patient, 'id'>),
      id: docSnap.id,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
      dateOfBirth: data.dateOfBirth?.toDate(),
      expectedDeliveryDate: data.expectedDeliveryDate?.toDate(),
      deliveryDate: data.deliveryDate?.toDate(),
      nextAppointment: data.nextAppointment?.toDate()
    };
  }
  return null;
};

// Update patient
export const updatePatient = async (
  id: string,
  updates: Partial<Patient>
): Promise<void> => {
  await updateDoc(doc(db, 'patients', id), {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

// Search patients
export const searchPatients = async (
  hospitalId: string,
  searchTerm: string
): Promise<Patient[]> => {
  const patients = await getPatientsByHospital(hospitalId);
  const lowerTerm = searchTerm.toLowerCase();
  
  return patients.filter(p =>
    p.fullName.toLowerCase().includes(lowerTerm) ||
    p.phoneNumber.includes(searchTerm) ||
    (p.babyName && p.babyName.toLowerCase().includes(lowerTerm))
  );
};

// Get patients by hospital
export const getPatientsByHospital = async (hospitalId: string): Promise<Patient[]> => {
  const q = query(
    collection(db, 'patients'),
    where('hospitalId', '==', hospitalId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...(data as Omit<Patient, 'id'>),
      id: doc.id,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
      dateOfBirth: data.dateOfBirth?.toDate(),
      expectedDeliveryDate: data.expectedDeliveryDate?.toDate(),
      deliveryDate: data.deliveryDate?.toDate(),
      nextAppointment: data.nextAppointment?.toDate()
    };
  });
};

// Get patients with upcoming appointments
export const getUpcomingAppointments = async (
  hospitalId: string,
  daysAhead: number = 7
): Promise<Patient[]> => {
  const patients = await getPatientsByHospital(hospitalId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + daysAhead);
  
  return patients.filter(p => {
    if (!p.nextAppointment) return false;
    const appointmentDate = new Date(p.nextAppointment);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate >= today && appointmentDate <= futureDate;
  }).sort((a, b) => {
    return new Date(a.nextAppointment!).getTime() - new Date(b.nextAppointment!).getTime();
  });
};

// Get patients by type
export const getPatientsByType = async (
  hospitalId: string,
  type: 'antenatal' | 'postnatal' | 'general'
): Promise<Patient[]> => {
  const q = query(
    collection(db, 'patients'),
    where('hospitalId', '==', hospitalId),
    where('patientType', '==', type),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...(data as Omit<Patient, 'id'>),
      id: doc.id,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
      dateOfBirth: data.dateOfBirth?.toDate(),
      expectedDeliveryDate: data.expectedDeliveryDate?.toDate(),
      deliveryDate: data.deliveryDate?.toDate(),
      nextAppointment: data.nextAppointment?.toDate()
    };
  });
};