/**
 * splash.js — Animation de démarrage Naïhab (identique à l'ancien index.html :
 * œil qui s'ouvre, logo "Naïhab" qui apparaît, barre de chargement)
 *
 * IMPORTANT — pour éviter le flash de la vraie page avant l'animation,
 * DEUX étapes sont nécessaires sur chaque page pouvant servir d'accueil :
 *
 * 1) Tout en haut de <head>, avant tout le reste (juste après <meta charset>) :
 *
 *    <script>
 *    if (new URLSearchParams(location.search).get('splash') === '1') {
 *        document.documentElement.style.visibility = 'hidden';
 *        setTimeout(function(){ document.documentElement.style.visibility = 'visible'; }, 6000);
 *    }
 *    </script>
 *
 * 2) Juste avant </body> (comme avant) :
 *
 *    <script src="splash.js"></script>
 *
 * L'étape 1 cache la page AVANT qu'elle ne s'affiche (pas de flash).
 * L'étape 2 affiche l'animation puis révèle la page une fois prête.
 * Le setTimeout de 6s dans l'étape 1 est une sécurité : si jamais splash.js
 * ne se charge pas, la page ne reste pas cachée pour toujours.
 */
(function () {
    function afficherSplashSiNecessaire() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('splash') !== '1') return;

        try {
        const style = document.createElement('style');
        style.textContent = `
            #dynamic-splash {
                position: fixed; inset: 0; background: #000; z-index: 100000;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                overflow: hidden; font-family: 'Segoe UI', sans-serif;
                transition: opacity 0.6s ease;
            }
            #dynamic-splash .eye-container { position: relative; width: 260px; height: 130px; margin-bottom: 40px; }
            #dynamic-splash .eye { position: relative; width: 260px; height: 130px; }
            #dynamic-splash .eyelid-top {
                position: absolute; top: 0; left: 0; width: 100%; height: 50%; background: #000; z-index: 10;
                border-radius: 50% 50% 0 0 / 100% 100% 0 0; transform-origin: bottom center;
                animation: dynOuvrirHaut 1.5s cubic-bezier(0.4,0,0.2,1) forwards 0.5s;
            }
            #dynamic-splash .eyelid-bottom {
                position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: #000; z-index: 10;
                border-radius: 0 0 50% 50% / 0 0 100% 100%; transform-origin: top center;
                animation: dynOuvrirBas 1.5s cubic-bezier(0.4,0,0.2,1) forwards 0.5s;
            }
            @keyframes dynOuvrirHaut { from{transform:scaleY(1)} to{transform:scaleY(0)} }
            @keyframes dynOuvrirBas  { from{transform:scaleY(1)} to{transform:scaleY(0)} }
            #dynamic-splash .eye-inner {
                position: absolute; top:0; left:0; width:100%; height:100%;
                background: radial-gradient(ellipse, #1a0b5a 0%, #0a0530 100%);
                border-radius: 50% / 40%; overflow: hidden; border: 2px solid rgba(255,204,0,0.3);
            }
            #dynamic-splash .iris {
                position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);
                width: 90px; height: 90px; border-radius: 50%;
                background: radial-gradient(circle, #ffcc00 0%, #ff9900 40%, #1a0b5a 70%);
                box-shadow: 0 0 30px rgba(255,204,0,0.6), 0 0 60px rgba(255,204,0,0.3);
                animation: dynPulserIris 2s ease-in-out infinite 2s;
            }
            @keyframes dynPulserIris {
                0%,100% { transform: translate(-50%,-50%) scale(1); box-shadow: 0 0 30px rgba(255,204,0,0.6); }
                50% { transform: translate(-50%,-50%) scale(1.05); box-shadow: 0 0 50px rgba(255,204,0,0.9); }
            }
            #dynamic-splash .pupille {
                position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);
                width: 35px; height: 35px; border-radius: 50%; background: #000;
                box-shadow: 0 0 10px rgba(0,0,0,0.8);
            }
            #dynamic-splash .reflet {
                position: absolute; top: 20%; right: 25%; width: 10px; height: 10px;
                border-radius: 50%; background: rgba(255,255,255,0.8);
            }
            #dynamic-splash .logo-container { text-align: center; opacity: 0; animation: dynApparaitreLogo 0.8s ease forwards 2.2s; }
            @keyframes dynApparaitreLogo { from{opacity:0; transform:translateY(20px);} to{opacity:1; transform:translateY(0);} }
            #dynamic-splash .logo-text {
                font-size: 56px; font-weight: 900;
                background: linear-gradient(135deg, #fff 0%, #ffcc00 60%);
                -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px;
            }
            #dynamic-splash .slogan { color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 10px; letter-spacing: 1px; }
            #dynamic-splash .loader-container {
                position: absolute; bottom: 80px; width: 180px; opacity: 0;
                animation: dynApparaitreLogo 0.5s ease forwards 2.5s;
            }
            #dynamic-splash .loader-bar { width: 100%; height: 3px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
            #dynamic-splash .loader-fill {
                height: 100%; width: 0%; background: linear-gradient(90deg, #ffcc00, #ff9900);
                border-radius: 10px; animation: dynCharger 1.8s ease forwards 2.7s;
                box-shadow: 0 0 10px rgba(255,204,0,0.5);
            }
            @keyframes dynCharger { from{width:0%} to{width:100%} }
            #dynamic-splash .loader-text {
                text-align: center; font-size: 11px; color: rgba(255,255,255,0.3);
                margin-top: 8px; letter-spacing: 2px; text-transform: uppercase;
            }
        `;
        document.head.appendChild(style);

        const splashDiv = document.createElement('div');
        splashDiv.id = 'dynamic-splash';
        splashDiv.innerHTML = `
            <div class="eye-container">
                <div class="eye">
                    <div class="eye-inner">
                        <div class="iris"><div class="pupille"><div class="reflet"></div></div></div>
                    </div>
                    <div class="eyelid-top"></div>
                    <div class="eyelid-bottom"></div>
                </div>
            </div>
            <div class="logo-container">
                <div class="logo-text">Naïhab</div>
                <p class="slogan">Ta zone, ton style, ta liberté</p>
            </div>
            <div class="loader-container">
                <div class="loader-bar"><div class="loader-fill"></div></div>
                <div class="loader-text">Chargement...</div>
            </div>
        `;
        document.body.appendChild(splashDiv);

        // On révèle la page maintenant : l'overlay noir la couvre entièrement,
        // donc rien de la vraie page n'apparaît avant l'animation (pas de flash).
        document.documentElement.style.visibility = 'visible';

        // Retirer proprement après l'animation complète (~5s, comme sur l'ancien index), et nettoyer l'URL
        setTimeout(() => {
            splashDiv.style.opacity = '0';
            setTimeout(() => splashDiv.remove(), 600);
            // On nettoie l'URL pour enlever le ?splash=1 — dans un try/catch car
            // cette opération est bloquée par Chrome en test local (file://),
            // ce qui ne doit pas empêcher le reste de l'animation de se terminer
            try {
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (e) { /* ignoré : normal en local file:// */ }
        }, 5000);
        } finally {
            // Quoi qu'il arrive (même en cas d'erreur imprévue ci-dessus),
            // on révèle la page — jamais bloquée en noir indéfiniment
            document.documentElement.style.visibility = 'visible';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', afficherSplashSiNecessaire);
    } else {
        afficherSplashSiNecessaire();
    }
})();
