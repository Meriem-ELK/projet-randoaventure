// Variables globales
let elementHTML;
let conteneurHTML;
let boutonFermer;
let boutonAbonner;
let lienContinuer;


// Fonctions

/**
 * Initialiser la boîte modale et l'affiche après 5 secondes
 * @param {HTMLElement} conteneur
 * @param {string} [titre="Obtenez 10% de rabais"]
 * @param {string} [type="promo"]
 */
function init(conteneur, titre = "Obtenez 10% de rabais", type = "promo") {
    conteneurHTML = conteneur;

    // Vérification 
    if (!conteneurHTML) {
        return; // Arrête l'exécution si l'élément n'existe pas
    }


    if (!localStorage.getItem("infolettre")) {
        injecterHTML(titre, type);

        setTimeout(afficherModale, 5000);
    }
}


/**
 * Fermer au clic une boite modale
 * @param {Event} evenement
 */
function onClicFermer(evenement) {
    cacherModale();

    localStorage.setItem("infolettre", true);
}

/**
 * Injecter le HTML sur la page
 * @param {String} message
 * @param {String} type
 */
function injecterHTML(titre, type) {
    let gabarit = `
    <div class="boite-modale invisible" data-type="${type}">
        <div class="modale-contenu">
            <button class="fermer-btn">×</button>
            <div class="modale-gauche">
                <img src="assets/img/promo-image.jpg" alt="Promotion" class="promo-image">
                <div class="info-contact">
                    <h3>Besoin de conseils?</h3>
                    <p class="phone">Appelez-nous: (555) 555-5555</p>
                    <p>Nos conseillers spécialisés seront ravis de vous guider et de vous aider à choisir l'équipement de randonnée adapté à vos besoins.</p>
                </div>
            </div>
            <div class="modale-droite">
                <h2>${titre}</h2>
                <p class="description">Abonnez-vous à notre infolettre afin de profiter d'un rabais de 10% sur votre première commande et de recevoir en exclusivité nos meilleures offres.</p>
                <form class="form-abonnement">  
                    <input type="email" class="email-input" placeholder="Votre adresse courriel">                
                    <div class="message-erreur"></div>
                    <input type="text" class="abonner-btn" value="M'abonner">
                </form>
                <div class="divider"></div>
                <a href="#" class="continuer-link">Non merci, je préfère continuer mon shopping.</a>
            </div>
        </div>
    </div>`;

    conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
    elementHTML = conteneurHTML.querySelector('.boite-modale');
    
    // Ajout des écouteurs d'événements
    boutonFermer = elementHTML.querySelector('.fermer-btn');
    lienContinuer = elementHTML.querySelector('.continuer-link');
    
    boutonFermer.addEventListener("click", onClicFermer);
    lienContinuer.addEventListener("click", onClicFermer);
}


/**
 * Afficher la boite modale
 */
function afficherModale() {
    if (elementHTML) {
        elementHTML.classList.remove("invisible");
        elementHTML.classList.add("visible");
      }
}

/**
 * Cacher la boite modale
 */
function cacherModale() {
    if (elementHTML) {
        elementHTML.classList.remove("visible");
        elementHTML.classList.add("invisible");
      }
}

// Exécution
export default init;