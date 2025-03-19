import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVOCQrQ4wYwnih5LcjGJRw5n-M_-CJZsw",
    authDomain: "athena-f0cd7.firebaseapp.com",
    projectId: "athena-f0cd7",
    storageBucket: "athena-f0cd7.firebasestorage.app",
    messagingSenderId: "824729018772",
    appId: "1:824729018772:web:83d7bfaf84d162ff986f81",
    measurementId: "G-RP49BT1ER4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // ✅ Corrected here

const adminEmail = 'markanthonylariosa3@gmail.com'; // ✅ Admin email

export { auth, googleProvider, db, adminEmail };