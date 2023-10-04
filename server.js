// const fs = require("fs");
// const path = require("path");
// const { Howl, Howler } = require("howler");

// // Classe pour représenter une musique
// class Musique {
//   constructor(titre, artiste, genre, cheminFichier) {
//     this.titre = titre;
//     this.artiste = artiste;
//     this.genre = genre;
//     this.cheminFichier = cheminFichier;
//   }
// }

// // Classe pour la bibliothèque musicale
// class BibliothequeMusicale {
//   constructor() {
//     this.musiques = [];
//   }

//   ajouterMusique(titre, artiste, genre, cheminFichier) {
//     const musique = new Musique(titre, artiste, genre, cheminFichier);
//     this.musiques.push(musique);
//   }

//   trierParGenre(genre) {
//     return this.musiques.filter((musique) => musique.genre === genre);
//   }
// }

// // Créez une instance de la bibliothèque musicale
// const maBibliothequeMusicale = new BibliothequeMusicale();

// // Répertoire contenant vos fichiers audio "rap"
// const repertoireRap = "./rap";

// // Lire les fichiers du répertoire "rap"
// fs.readdir(repertoireRap, (err, fichiers) => {
//   if (err) {
//     console.error("Erreur lors de la lecture du répertoire rap :", err);
//     return;
//   }

//   // Parcourir les fichiers
//   fichiers.forEach((fichier) => {
//     const cheminFichier = path.join(repertoireRap, fichier);

//     // Extraire le genre, l'artiste et le titre à partir du nom du fichier
//     const nomFichier = path.basename(fichier, ".mp3");
//     const [genre, nomMusique] = nomFichier.split("_");
//     const [artiste, titre] = nomMusique.split("-");

//     // Ajouter la musique à la bibliothèque
//     maBibliothequeMusicale.ajouterMusique(titre, artiste, genre, cheminFichier);
//   });

//   // Afficher la bibliothèque après avoir ajouté toutes les musiques
//   console.log("Bibliothèque musicale :", maBibliothequeMusicale.musiques);
// });

// // Fonction pour jouer une musique à partir d'un chemin de fichier donné
// function jouerMusique(cheminFichier) {
//   const son = new Howl({
//     src: ["./rap"],
//     html5: true, // Utilisation de la lecture HTML5
//   });

//   son.play();
// }

// // Fonction pour afficher une musique aléatoire d'un genre donné
// function afficherMusiqueAleatoire(genre, listeElement) {
//     const musiquesGenre = maBibliothequeMusicale.trierParGenre(genre);
  
//     if (musiquesGenre.length === 0) {
//       console.log(`Aucune musique de genre ${genre} dans la bibliothèque.`);
//     } else {
//       const musiqueAleatoire =
//         musiquesGenre[Math.floor(Math.random() * musiquesGenre.length)];
//       console.log(`${genre} : ${musiqueAleatoire.titre} - ${musiqueAleatoire.artiste}`);
  
//       // Lecture de la musique
//       jouerMusique(musiqueAleatoire.cheminFichier);
  
//       // Affichage dans l'interface utilisateur
//       const listItem = document.createElement("li");
//       listItem.textContent = `${musiqueAleatoire.titre} - ${musiqueAleatoire.artiste}`;
//       listeElement.innerHTML = "";
//       listeElement.appendChild(listItem);
//     }
//   }
  
//   function jouerMusique(cheminFichier) {
//     const son = new Howl({
//       src: ["./rap"],
//       html5: true, // Utilisation de la lecture HTML5 (facultatif)
//     });
  
//     son.play(); // Lecture du fichier audio
//   }
  
///

 // Obtenez une référence vers l'élément audio
 var audioElement = new Audio();

 // Tableau des noms de fichiers audio dans le dossier "rap"
 var rapSounds = ["rap_gazo-Die.mp3", "rap_plk-Nouvelles.mp3","Marseille-City.mp3","Ca-fait-du-bien.mp3"];
 var americanSounds = ["50Cent_In-Da-Club.mp3", "50Cent_Just-a-Lil-Bit.mp3"];

 // Fonction pour jouer un son de manière aléatoire
 function playRandomSoundRap() {
     var randomIndex = Math.floor(Math.random() * rapSounds.length);
     var soundFile = "rap/" + rapSounds[randomIndex];
     audioElement.src = soundFile;
     audioElement.play();
     console.log("Son joué : " + rapSounds[randomIndex]);
     }

     
//// ESSAI

    //  function playRandomSoundAmerica() {
    //     var randomIndex = Math.floor(Math.random() * americanSounds.length);
    //     var soundFile = "American/" + americanSounds[randomIndex];
    //     audioElement.src = soundFile;
    //     audioElement.play();
    //     console.log("Son joué : " + americanSounds[randomIndex]);
    //     }

 // Associez la fonction playRandomSound au clic sur le bouton
 var playRandomRap = document.getElementById("playRandomRap");
 playRandomRap.addEventListener("click", playRandomSoundRap);

 var compareButton = document.getElementById("compareButton");
 compareButton.addEventListener("click", compareInput);

 ////ESSAI


//  var playRandomAmerica = document.getElementById("playRandomAmerica");
//  playRandomRap.addEventListener("click", playRandomSoundAmerica);

//  var compareButton = document.getElementById("compareButton");
//  compareButton.addEventListener("click", compareInput);

 // Fonction pour comparer l'entrée de l'utilisateur avec le nom du son actuellement joué
 function compareInput() {
    var userInput = document.getElementById("userInput").value;
    
    // Obtenez le nom du fichier audio actuellement en cours de lecture
    var currentAudioSrc = audioElement.src;
    var currentSound = currentAudioSrc.substring(currentAudioSrc.lastIndexOf('/') + 1);
    
    if (userInput === currentSound.slice(0, -4)) {
        audioElement.pause();
        alert("Le tittre est trouvé");
        
    } else {
        alert("Le titre n'ai pas trouvé");
    }
}