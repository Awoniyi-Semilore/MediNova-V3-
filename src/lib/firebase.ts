// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_kxeWXHdwi3MvhGSQ7AxE-S_BqiZHHfw",
  authDomain: "medinova-simulations.firebaseapp.com",
  projectId: "medinova-simulations",
  storageBucket: "medinova-simulations.firebasestorage.app",
  messagingSenderId: "473481141664",
  appId: "1:473481141664:web:fdbcb2642a030e537218c5",
  measurementId: "G-RZ47E5MTK2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;