// Variables pour la navigation
const navliens = [
    {
      text: "Accueil",
      page: "index.html",
    },
    {
      text: "A propos",
      page: "apropos.html",
    },
    {
      text: "Formulaire",
      page: "formulaire.html",
    },
];


/* ========================================================== fonction d'initailisation */
function navigationInit() {
  navigation();
}


/* ========================================================== fonction navigation */
function navigation() {
  const nav = document.querySelector("nav");

  // On récupère le nom de la page actuelle
  const activePage = window.location.pathname.split("/").pop();

  // Boucle pour parcourir chaque lien dans le tableau navliens
  for (let i = 0; i < navliens.length; i++) {
   
    let activeClass = "";

    // On vérifie si le lien correspond à la page courante
    if (navliens[i].page === activePage) {
      activeClass = ' class="active"';
    }
    nav.insertAdjacentHTML("beforeend", `
      <a href="${navliens[i].page}"${activeClass}>${navliens[i].text}</a>
    `);
  }
}


// ====== Exécution ======
// Exporte la fonction init pour utilisation dans d'autres modules
export { navigationInit };