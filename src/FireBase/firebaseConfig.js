  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getAnalytics } from "firebase/analytics";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDXmtdJ9mEpEJuar30z_5ilWQXFnqV9smU",
    authDomain: "mall0ide-proyecto.firebaseapp.com",
    projectId: "mall0ide-proyecto",
    storageBucket: "mall0ide-proyecto.firebasestorage.app",
    messagingSenderId: "945966545460",
    appId: "1:945966545460:web:f7e5181f964766df0aa861",
    measurementId: "G-PPHSVN9D6L"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Get Firestore instance
  const db = getFirestore(app);

  // Get Analytics instance
  const analytics = getAnalytics(app);

  // Export db and analytics to use in other parts of the app
  export { db, analytics };