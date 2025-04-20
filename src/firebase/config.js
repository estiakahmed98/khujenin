// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config (replace with your own Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAzJJ_gjWmeQQYeOcU0woGVwRtWkovYHrk",
    authDomain: "khujenin-75619.firebaseapp.com",
    projectId: "khujenin-75619",
    storageBucket: "khujenin-75619.firebasestorage.app",
    messagingSenderId: "883392795672",
    appId: "1:883392795672:web:538fb85f1f9da53497df6d",
    measurementId: "G-15YF3HEQT8",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);

// Export services for use
export { db, storage };
