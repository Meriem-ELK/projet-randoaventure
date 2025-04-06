// Importer la fonction init de la navigation
import { navigationInit } from "../components/navigation.js";

// Variables Globales
//====================================================================

let indexSectionActuelle = 1; // Index de la section actuellement affichée

const formulaireHTML = document.querySelector("form");
const champsHTML = formulaireHTML.querySelectorAll("[name]");
const sectionsHTML = formulaireHTML.querySelectorAll("[data-page]");
const dateHTML = formulaireHTML.querySelector("[name='date_livraison']");
const boutonSuivantHTML = document.querySelector("[data-direction='1']");
const boutonPrecedentHTML = document.querySelector("[data-direction='-1']");
const boutonEnvoi = formulaireHTML.querySelector("input[type='submit']");
const barreProgression = document.querySelector(".progress-bar__fill");

// Livraison en magasin
const livraisonMagasinCheckbox = document.querySelector(
  "[name='livraison_magasin']"
);
const champResumeLivraison = document.querySelector(
  "[data-champ='livraison_magasin']"
);
const selectMagasin = document.querySelector("#magasin");

// Radios de service de livraison
const serviceLivraisonRadios = document.querySelectorAll(
  "[name='service_livraison']"
);
const radioSelectionne = document.querySelector(
  "[name='service_livraison']:checked"
);
const radiosDansBox = document.querySelectorAll(
  ".box_radio input[type='radio']"
);

//====================================================================
// Initialisation
//====================================================================

function init() {
  navigationInit(); // Appeler la fonction de navigation
  
  formulaireHTML.addEventListener("submit", envoiFormulaire); // Soumission du formulaire

  // Navigation entre les sections
  boutonSuivantHTML.addEventListener("click", clicNavigation);
  boutonPrecedentHTML.addEventListener("click", clicNavigation);

  // Écouteurs pour les champs
  champsHTML.forEach(function (champHTML) {
    champHTML.addEventListener("change", changementChamp);
  });

  // Livraison en magasin
  livraisonMagasinCheckbox.addEventListener(
    "change",
    changementLivraisonMagasin
  );
  selectMagasin.addEventListener("change", changerSelectMagasin);

  // Service de livraison
  serviceLivraisonRadios.forEach(function (radio) {
    radio.addEventListener("change", changerServiceLivraison);
  });

  if (radioSelectionne) {
    modifierResume(radioSelectionne, true);
  }

  // Mettre à jour le résumé
  dateHTML.min = recupererDateAujourdhui(); // Date minimale pour la livraison
  afficherSection(indexSectionActuelle);
  validerFormulaire();
}

//====================================================================
// Événements
//====================================================================
/**
 * Gère l'envoi du formulaire après validation.
 * @param {Event} evenement
 */
function envoiFormulaire(evenement) {
  evenement.preventDefault();
  if (validerFormulaire()) {
    alert("Le formulaire a été envoyé !");
    window.location.href = "formulaire.html"; // Redirection
  }
}

/**
 * Gère l'activation/désactivation de la livraison en magasin.
 * @param {Event} evenement
 */
function changementLivraisonMagasin(evenement) {
  const livraisonCochee = evenement.currentTarget.checked;
  selectMagasin.disabled = !livraisonCochee;

  radiosDansBox.forEach(function (radio, index) {
    if (livraisonCochee) {
      // Désactiver et décocher les boutons radio
      radio.disabled = true;
      radio.checked = false;
      radio.parentElement.classList.add("radio-desactive");
    } else {
      // Réactiver les boutons radio
      radio.disabled = false;
      radio.parentElement.classList.remove("radio-desactive");

      // Cocher le premier bouton radio
      if (index === 0) {
        radio.checked = true;
        modifierResume(radio, true); // Mettre à jour le résumé
      }
    }
  });

  // Mise à jour du résumé "Livraison en magasin"
  champResumeLivraison.textContent = livraisonCochee ? selectMagasin.value : "";

  // Effacer le résumé du service de livraison
  const champResumeService = document.querySelector(
    "[data-champ='service_livraison']"
  );
  if (livraisonCochee) {
    champResumeService.textContent = "";
  }
}

/**
 * Gère la sélection du service de livraison.
 * @param {Event} evenement
 */
function changerServiceLivraison(evenement) {
  const serviceLivraison = evenement.currentTarget;
  modifierResume(serviceLivraison, serviceLivraison.checked); // Mettre à jour le résumé
}

/**
 * Gère la sélection d'un magasin.
 * @param {Event} evenement
 */
function changerSelectMagasin(evenement) {
  const valeurSelect = evenement.currentTarget.value;
  modifierResume({ name: "livraison_magasin", value: valeurSelect }, true);
}

/**
 * Valide un champ et met à jour le résumé.
 * @param {Event} evenement
 */
function changementChamp(evenement) {
  const champ = evenement.currentTarget;
  validerChamp(champ);
  validerFormulaire();
  validerSection(indexSectionActuelle);
  modifierResume(champ, champ.checkValidity());
}

/**
 * Gère la navigation entre les sections.
 * @param {Event} evenement
 */
function clicNavigation(evenement) {
  const direction = parseInt(evenement.currentTarget.dataset.direction, 10);
  const nouvelleSection = indexSectionActuelle + direction;

  if (
    nouvelleSection >= 1 &&
    nouvelleSection <= sectionsHTML.length &&
    (direction === -1 || validerSection(indexSectionActuelle))
  ) {
    indexSectionActuelle = nouvelleSection;
    afficherSection(indexSectionActuelle);
  }
}

//====================================================================
// NAVIGATION
//====================================================================

function cacherSections() {
  sectionsHTML.forEach(function (section) {
    section.classList.add("invisible");
  });
}

/**
 * Affiche la section actuelle et met à jour la navigation.
 * @param {number} indexSection - L'index de la section à afficher.
 */
function afficherSection(indexSection) {
  cacherSections();
  const sectionActive = document.querySelector(`[data-page="${indexSection}"]`);
  sectionActive.classList.remove("invisible");
  afficherNavigation();
  afficherProgression();
  validerSection(indexSection);
}

function afficherNavigation() {
  boutonPrecedentHTML.classList.toggle("inactif", indexSectionActuelle === 1);

  const estSectionValide = validerSection(indexSectionActuelle);
  boutonSuivantHTML.classList.toggle("inactif", !estSectionValide);

  boutonEnvoi.classList.toggle(
    "invisible",
    indexSectionActuelle !== sectionsHTML.length
  );
  boutonSuivantHTML.classList.toggle(
    "invisible",
    indexSectionActuelle === sectionsHTML.length
  );
}

function afficherProgression() {
  const progression =
    ((indexSectionActuelle - 1) / (sectionsHTML.length - 1)) * 100;
  barreProgression.style.width = progression + "%";
}

//====================================================================
// VALIDATION
//====================================================================

/**
 * Valide un champ donné.
 * @param {HTMLElement} champHTML - Le champ à valider.
 * @returns {boolean} - Retourne true si le champ est valide, sinon false.
 */
function validerChamp(champHTML) {
  champHTML.setCustomValidity(""); // Réinitialisation des messages d'erreur

  const reglesValidation = {
    courriel: {
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Le format de l'email est invalide.",
    },

    // Règle générique pour tous les champs avec data-validation="texte"
    texte: {
      regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/i,
      message: "Les chiffres ne sont pas autorisés",
    },
  };

  // Récupère le type de validation depuis l'attribut data
  const typeValidation = champHTML.dataset.validation || champHTML.name;

  const regle = reglesValidation[typeValidation];

  if (regle && !regle.regex.test(champHTML.value)) {
    const message = champHTML.dataset.errorMessage || regle.message;
    champHTML.setCustomValidity(message);
  }

  const estValide = champHTML.checkValidity();
  champHTML.classList.toggle("erreur", !estValide);

  return estValide;
}

/**
 * Valide une section.
 * @param {number} indexSection - L'index de la section.
 * @returns {boolean} - Retourne true si la section est valide.
 */
function validerSection(indexSection) {
  const sectionHTML = formulaireHTML.querySelector(
    `[data-page='${indexSection}']`
  );
  const champsDansSection = sectionHTML.querySelectorAll("[name]");

  let estValide = true;
  champsDansSection.forEach(function (champ) {
    if (!champ.checkValidity()) {
      estValide = false;
    }
  });

  boutonSuivantHTML.classList.toggle("inactif", !estValide);
  return estValide;
}

/**
 * Vérifie si le formulaire est valide.
 * @returns {boolean} - Retourne true si le formulaire est valide.
 */
function validerFormulaire() {
  return formulaireHTML.checkValidity();
}

//====================================================================
// AFFICHAGE DU RÉSUMÉ
//====================================================================

function modifierResume(champHTML, estValide) {
  const champResume = document.querySelector(
    `[data-champ='${champHTML.name}']`
  );

  if (champResume) {
    champResume.textContent = estValide ? champHTML.value : "";
  }
}

//====================================================================
// Fonction pour récupérer la date du jour
//====================================================================

function recupererDateAujourdhui() {
  const date = new Date();
  let jour = date.getDate().toString().padStart(2, "0");
  let mois = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${date.getFullYear()}-${mois}-${jour}`;
}

// Exécution
init();
