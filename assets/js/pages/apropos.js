// Importation
import { carrouselInit } from "../components/carrousel.js";
import ScrollAnimator from "../classes/ScrollAnimator.js";
import { navigationInit } from "../components/navigation.js";
import  modeNuit  from "../components/modeNuit.js";
import  boiteModale  from "../components/boiteModale.js";

//
const conteneurBoiteModale = document.querySelector("[data-boite-modale]");
const paragraphesHTML = document.querySelectorAll(".section_col_2");


/* =========================================== fonction d'initailisation */
/**
 * Fonction d'initialisation de la page
 * Appelle tous les modules nécessaires au fonctionnement de la page
*/
function init() {
    const objet1 = new ScrollAnimator(null, paragraphesHTML);
    navigationInit();
    boiteModale();
    modeNuit();
    carrouselInit();

   //Se déclenche une seule fois
   setTimeout(demarrerPopup, 5000);
}


/**
    * Fonction pour démarrer la popup de la boîte modale
*/
function demarrerPopup() {
    boiteModale(conteneurBoiteModale, "Abonnez-vous à notre infolettre", "promo");
}
  

/* ========================================================== Exécution */
// Exécution de l'initialisation
init();