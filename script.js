let bouton = document.getElementsByTagName("button");
let resultat = document.getElementById("resultat");
let effacerTout = document.getElementById("effacerTout");
let effacerDernier = document.getElementById("effacerDernier");
let resultatDuCalcul = "";
const affichage = [];

// cette boucle for sert à stocker et afficher les entrées de l'utilisateur
for (let i = 0; i < bouton.length; i++) {
  bouton[i].onclick = function () {
    //récupère le texte contenu dans la balise <button></buton> au clic de
    // l'utilisateur et le stock dans affichage
    affichage.push(bouton[i].innerText);
    const affichageTemporaire = affichage.join("");
    // remplace le texte contenu dans la balise avec "id=ecran1" par
    // la string contenu dans affichageTemporaire
    document.getElementById("ecran1").textContent = affichageTemporaire;
    console.log(affichage);
  };
}

// réalise le calcul sous certaines conditions
resultat.onclick = function () {
  let erreurDeSaisie = false;
  // Cette boucle vérifire que pour chaque éléments qui se suivent
  //  dans la chaine de caractères ([i] ET [i+1]) il n'y a pas succession
  // de deux opérateurs consécutifs et qu'il n'y a pas de division par 0
  // ce qui retournerait la valeur infinity. Si une des conditions
  // retourne True alors la variable erreurDeSaisie prend la valeur True
  for (let i = 0; i < affichage.length; i++) {
    if (
      (isNaN(affichage[i]) && isNaN(affichage[i + 1])) ||
      (affichage[i] === "/" && affichage[i + 1] === "0")
    ) {
      erreurDeSaisie = true;
    }
  }

  // Ce bloc réalise le calcul à condition que (dans l'ordre):
  // - le premier caractère de la chaîne n'est pas un opérateur excepté "-" (pour
  //   autoriser l'usage des nombre négatifs)
  // - le dernier caractère de la chaine n'est pas un opérateur
  // - erreurDeSaisie n'a pas pris la valmeur True (voir commentaire précédent)
  if (
    (affichage[0] != "-" && isNaN(affichage[0])) ||
    isNaN(affichage[affichage.length - 1]) ||
    erreurDeSaisie === true
  ) {
    let message = "Erreur de syntaxe";
    affichage.length = 0;
    document.getElementById("ecran2").textContent = message;
    document.getElementById("ecran1").textContent = message;
    console.log(message);
  } else {
    resultatDuCalcul = eval(affichage.join(""));
    // les deux lignes suivantes permettent de reprendre le calcul à partir
    // du calcul précédent, autorisant l'utilisation et l'affichage de calculs
    // intermédiaires. Quand le calcul est autorisé au clic, le tableau
    // affichage est effacé et la valeur de resultatDuCalcul est
    // enregistré dedans. Cette valeur est à l'indice [0] lorsque l'utilisateur
    // poursuit ses calculs
    affichage.length = 0;
    affichage.push(resultatDuCalcul);
    document.getElementById("ecran2").textContent = resultatDuCalcul;
    console.log(resultatDuCalcul);
  }
};

// supprime le contenu du tableau affichage
effacerTout.onclick = function effacerCalcul() {
  affichage.length = 0;
  document.getElementById("ecran1").textContent = affichage;
  document.getElementById("ecran2").textContent = affichage;
  console.log(affichage);
};

// supprime le dernier élément du tableau affichage
effacerDernier.onclick = function () {
  affichage.pop();
  const affichageTemporaire = affichage.join("");
  document.getElementById("ecran1").textContent = affichageTemporaire;
  console.log(affichage);
};
