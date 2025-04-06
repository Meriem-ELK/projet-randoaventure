// Importer la fonction init de la navigation
import { navigationInit } from "../components/navigation.js";

// Tableau des produits avec leurs détails
const produits = [
  {
    id: 1,
    nom: "Tente de camping",
    prix: 159.99,
    description:
      "Tente imperméable pour 2 personnes avec une installation facile.",
    image: "tente.jpg",
  },
  {
    id: 2,
    nom: "Sac à dos de randonnée ",
    prix: 89.99,
    description: "Sac à dos léger et résistant pour une randonnée confortable.",
    image: "sac-a-dos.jpg",
  },
  {
    id: 3,
    nom: "Sac à dos de randonnée 22L",
    prix: 69.99,
    description: "Sac à dos léger et résistant pour une randonnée confortable.",
    image: "sac-a-dos2.jpg",
  },
  {
    id: 4,
    nom: "Lampe",
    prix: 29.99,
    description: "Lampe frontale LED, idéale pour les randonnées nocturnes.",
    image: "lampe-frontale.jpg",
  },
  {
    id: 5,
    nom: "Chaise de camping pliante",
    prix: 20.0,
    description:
      "Pliée et dépliée en quelques secondes, cette chaise offre un bon maintien et une hauteur adaptée pour des moments de détente en plein air! ",
    image: "chaise-pliante.jpg",
  },
  {
    id: 6,
    nom: "Boussole plaque",
    prix: 15.0,
    description:
      "Cette boussole est conçue pour vous guider pendant vos randonnées, courses d’orientation et autres sports de plein air.",
    image: "boussole.jpg",
  },
];
// -------------Fonction
//--------------------------------------

/* ==========================================================  Generer le code html (Template) */
function genererHTML(produit) {
  // trim pour s'assurer qu'il n'y a pas d'espaces en trop dans le nom du produit
  const nomProduit = produit.nom.trim();

  // Crée le HTML pour chaque produit
  const produitHTML = `
 <div class="produit" id="produit-${produit.id}">
   <div class="divImg">
     <img src="assets/img/produits/${produit.image}" alt="${produit.nom}">
   </div>
   <h3>${nomProduit.toUpperCase()}</h3>
   <p class="prix">${produit.prix} $</p>
 </div>
`;

  // On retourne la variable contenant le code HTML
  return produitHTML;
}

/* ==========================================================  Affichage des produits */
function affichageProduits() {
  // On sélectionne la section des produits
  const produitsListe = document.getElementById("produitList");

  // Boucle pour parcourir chaque produit dans le tableau `produits`
  for (let i = 0; i < produits.length; i++) {
    const produit = produits[i];

    //On genere l'HTML pour chaque produit
    const produitHTML = genererHTML(produit);

    // On ajoute le produit à la liste des produits en utilisant insertAdjacentHTML
    produitsListe.insertAdjacentHTML("beforeend", produitHTML);
  }
}

/* ========================================================== Affichage des détails d'un produit */
function afficherproduitDetail(produitId) {
  //s'assurer q'un ID est bien un nombre
  produitId = Number(produitId);

  // On recherche le produit correspondant à l'ID dans le tableau `produits`
  const produitsElement = produits.find(function (p) {
    return p.id === produitId;
  });

  // on sélectionne la section des détails
  const detailSection = document.getElementById("detailProduit");

  // On affiche les détails du produit
  detailSection.innerHTML = `
      <h2>${produitsElement.nom.toUpperCase()}</h2>
      <div class="divImgDetail">
      <img src="assets/img/produits/${produitsElement.image}" alt="${
    produitsElement.nom
  }" />
      </div>
      <p class="prix">${produitsElement.prix} $</p>
      <p>${produitsElement.description}</p>
  `;
}
/* ========================================================== Trier les produits */
//Fonction pour Trier les produits
function triProduits(triType) {
  // Enlever la classe "click" de tous les boutons de tri
  const triBoutons = document.querySelectorAll(".btnTriage");
  triBoutons.forEach(function (btn) {
    btn.classList.remove("click");
  });

  const produitTri = [...produits]; // Creer une copie du tableau produits
  if (triType === "nom-asc") {
    produitTri.sort(function (a, b) {
      if (a.nom < b.nom) {
        return -1;
      } else if (a.nom > b.nom) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (triType === "nom-desc") {
    produitTri.sort(function (a, b) {
      if (a.nom > b.nom) {
        return -1;
      } else if (a.nom < b.nom) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (triType === "prix-asc") {
    produitTri.sort(function (a, b) {
      return a.prix - b.prix;
    });
  }

  // Vider la liste actuelle
  let produitListe = document.getElementById("produitList");
  produitListe.innerHTML = "";

  // Réinsérer les produits triés
  for (let i = 0; i < produitTri.length; i++) {
    let produit = produitTri[i];
    // Crée le HTML pour chaque produit
    const produitHTML2 = `
    <div class="produit" id="produit-${produit.id}">
      <div class="divImg">
        <img src="assets/img/produits/${produit.image}" alt="${produit.nom}">
      </div>
      <h3>${produit.nom.toUpperCase()}</h3>
      <p class="prix">${produit.prix} $</p>
    </div>
  `;

    // On ajoute le produit à la liste des produits en utilisant insertAdjacentHTML
    produitListe.insertAdjacentHTML("beforeend", produitHTML2);
  }

  // Appliquer l'animation à tous les produits après un tri
  const produitElements = document.querySelectorAll(".produit");
  produitElements.forEach(function (produit) {
    produit.classList.add("active"); // Ajouter la classe "active" pour déclencher l'animation
  });

  // Après un court délai (durée de l'animation), on peut enlever la classe active
  setTimeout(function () {
    produitElements.forEach(function (produit) {
      produit.classList.remove("active");
    });
  }, 500);


  initPoduits();
}

// On initialise des événements pour chaque bouton de tri
function initTri() {
  document.getElementById("triNomAsc").addEventListener("click", gererTriNomAsc);
  document.getElementById("triNomDesc").addEventListener("click", gererTriNomDesc);
  document.getElementById("triPrixAsc").addEventListener("click", gererTriPrixAsc);
}

function gererTriNomAsc() {
  triProduits("nom-asc");
  this.classList.add("click");
  document.getElementById("detailProduit").textContent = "";
}

function gererTriNomDesc() {
  triProduits("nom-desc");
  this.classList.add("click");
  document.getElementById("detailProduit").textContent = "";
}

function gererTriPrixAsc() {
  triProduits("prix-asc");
  this.classList.add("click");
  document.getElementById("detailProduit").textContent = "";
}

/* ========================================================== */
//On initialise l'affichage des produits et on ajoute les écouteurs d'événements.
function initPoduits() {
  const produitElements = document.querySelectorAll(".produit");
  // Boucle pour ajouter un écouteur d'événement à chaque produit
  for (let i = 0; i < produitElements.length; i++) {
    produitElements[i].addEventListener("click", function () {
      // Retirer la classe "click" de tous les produits
      produitElements.forEach(function (produit) {
        produit.classList.remove("click");
      });

      produitElements[i].classList.add("click");

      const produitId = parseInt(this.id.split("-")[1]);
      //console.log(produitId);
      afficherproduitDetail(produitId);
    });
  }
}
/* ========================================================== fonction d'initailisation */
function init() {
  navigationInit(); // Appeler la fonction de navigation
  affichageProduits();
  initPoduits();
  initTri();
}

/* ========================================================== Exécution */
init();
