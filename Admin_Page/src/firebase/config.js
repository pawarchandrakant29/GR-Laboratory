import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiCTSzP051Td02LRPDQ_wklwB2Pdf_phI",
  authDomain: "final-pr-1a4a6.firebaseapp.com",
  projectId: "final-pr-1a4a6",
  storageBucket: "final-pr-1a4a6.appspot.com",
  messagingSenderId: "128314533395",
  appId: "1:128314533395:web:26fea8554a2f71d3e481e6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);


export { db };
