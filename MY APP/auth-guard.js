// auth-guard.js
// À inclure avec <script type="module" src="auth-guard.js"></script>
// en tout premier dans le <head> de chaque page qui nécessite d'être connecté.
//
// Contrairement à l'ancienne vérification (juste localStorage, facilement trafiquable),
// ce script vérifie la vraie session Firebase Authentication.

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from './firebase-config.js';

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Personne n'est vraiment connecté selon Firebase : on nettoie les
        // traces locales et on renvoie vers la connexion.
        localStorage.removeItem('naihab_connecte');
        localStorage.removeItem('user_name');
        localStorage.removeItem('naihab_uid');
        window.location.href = 'connexion.html';
    }
    // Si un utilisateur est bien connecté, on ne fait rien de plus ici :
    // la page continue de se charger normalement.
});