// Variables

// Sélection HTML
const parentHTML = document.querySelector("[data-mode]");
const boutonsHTML = document.querySelectorAll("[data-mode-option]");

export default function init() {

    //Récupérer ce que l'utilisateur a choisi
    const modeEnregistre = localStorage.getItem("theme") || "jour";

    // Appliquer le thème enregistré
    changerMode(modeEnregistre);

    // Un seul écouteur d'événement pour gérer tous les clics sur les boutons
    parentHTML.addEventListener("click", auClicBouton);
}


/**
 * Gère le clic sur les boutons de changement de mode
 * @param {Event} evenement
 * @returns {void}
 */
function auClicBouton(evenement) {
    //Si on utilise la propagation des événements on utilise target
    const elementClic = evenement.target;

    //On vérifie sur quoi on a cliqué
    const bouton = elementClic.closest("[data-mode-option]");

    //Si le bouton n'est pas null, donc on a cliqué sur le bouton ou son enfant
    if (bouton) {
        //Récupérer le mode à partir de l'attribut data
        const mode = bouton.dataset.modeOption;

        // on enregistre le nouveau mode
        enregistrerMode(mode);
    }
}


/**
 * Changer la visibilité des boutons selon le mode actif
 * @param {string} nouveauMode 
 * @returns {void}
 */
function changerApparenceBoutons(nouveauMode) {
    boutonsHTML.forEach(function(boutonHTML) {
        const mode = boutonHTML.dataset.modeOption;
        boutonHTML.classList.toggle("invisible", mode == nouveauMode);
    });
}


/**
 * Change le thème de la page
 * @param {string} mode
 * @returns {void}
 */
function changerMode(mode) {
    document.body.dataset.theme = mode;
    changerApparenceBoutons(mode);
}


/**
 * Enregistre le mode sélectionné dans le localStorage et applique le changement
 * @param {string} nouveauMode
 * @returns {void}
 */
function enregistrerMode(nouveauMode) {
    changerMode(nouveauMode);
    localStorage.setItem("theme", nouveauMode);
}