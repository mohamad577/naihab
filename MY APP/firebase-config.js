// firebase-config.js
// Fichier de configuration Firebase pour Naïhab
// À inclure sur toutes les pages qui ont besoin de Firebase (comptes, messagerie, posts, etc.)

// Import des fonctions Firebase nécessaires (via CDN, syntaxe modules ES)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Config de ton projet Firebase (naihab-28)
const firebaseConfig = {
  apiKey: "AIzaSyACC9LpAAzmFDIA1csbMgQfX1H3EPrMUJQ",
  authDomain: "naihab-28.firebaseapp.com",
  projectId: "naihab-28",
  storageBucket: "naihab-28.firebasestorage.app",
  messagingSenderId: "10032062522945",
  appId: "1:10032062522945:web:9ee883bce0b245a534d8c0",
  measurementId: "G-TP8SKMDGQC"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Services qu'on va utiliser dans Naïhab
const auth = getAuth(app);       // Pour l'authentification (email/mdp + téléphone plus tard)
const db = getFirestore(app);    // Pour stocker les données (posts, comptes, etc.) plus tard

// On exporte pour pouvoir les utiliser dans les autres fichiers JS
export { app, auth, db };