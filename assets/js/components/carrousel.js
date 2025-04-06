// Variables

// Sélection HTML
let indexImageCarrousel = 0;

const carrouselConteneurHTML = document.querySelector(".carrousel");
const imagesCarrouselHTML = carrouselConteneurHTML.querySelectorAll(".carrousel__image-conteneur");
const boutonsNavCarrouselHTML = carrouselConteneurHTML.querySelectorAll("[data-direction]");

/**
 * Initialise le carrousel
 */
function carrouselInit() {
    ajouterEcouteursBoutons();
    afficherImageCarrousel(indexImageCarrousel);
    defilementAutomatique();
}

/**
 * Ajouter les écouteurs d'événements aux boutons de navigation
 */
function ajouterEcouteursBoutons() {
    for (var i = 0; i < boutonsNavCarrouselHTML.length; i++) {
        var bouton = boutonsNavCarrouselHTML[i];
        bouton.addEventListener("click", clicNavigationCarrousel);
        
    }
}


/**
 * Gérer le clic sur les boutons de navigation pour changer d'image.
 * @param {Event} evenement
 */

function clicNavigationCarrousel(evenement) {

    const declencheur = evenement.currentTarget;
    const direction = Number(declencheur.dataset.direction);

    //Modifier l'index du carrousel,
    indexImageCarrousel += direction;

    //Si index plus petit que 0, on affiche la dernière image
    if (indexImageCarrousel < 0) {
        indexImageCarrousel = imagesCarrouselHTML.length - 1;
    }

    //Si index plus grand que le nombre d'image, on affiche la première image
    if (indexImageCarrousel >= imagesCarrouselHTML.length) {
        indexImageCarrousel = 0;
    }

    afficherImageCarrousel(indexImageCarrousel);
    
}


/**
 * Lancer le défilement automatique des images du carrousel.
 */
function defilementAutomatique() {
    setInterval(function() {
        indexImageCarrousel = (indexImageCarrousel + 1) % imagesCarrouselHTML.length;
        afficherImageCarrousel(indexImageCarrousel);
    }, 5000);
}


/**
 * Afficher l'image du carrousel correspondant à l'index donné.
 * @param {number} indexImageCarrousel
 */

function afficherImageCarrousel(indexImageCarrousel) {
    for (let i = 0; i < imagesCarrouselHTML.length; i++) {
        const imageHTML = imagesCarrouselHTML[i];
        if (i === indexImageCarrousel) {
            imageHTML.classList.add("carrousel__image-active");
            imageHTML.classList.remove("carrousel__image-inactive");
        } else {
            imageHTML.classList.remove("carrousel__image-active");
            imageHTML.classList.add("carrousel__image-inactive");
        }
    }
}


// ====== Exécution ======
export { carrouselInit };