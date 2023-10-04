   const words = ["javascript", "pendu", "programmation", "informatique", "developpeur"];
   let word = words[Math.floor(Math.random() * words.length)];
   const guessedLetters = [];

   let remainingLives = 5;

   // Sélectionner des éléments HTML
   const wordDisplay = document.getElementById("word-display");
   const remainingLivesDisplay = document.getElementById("remaining-lives");
   const guessedLettersDisplay = document.getElementById("guessed-letters");
   const guessInput = document.getElementById("guess-input");
   const guessButton = document.getElementById("guess-button");

   // Fonction pour initialiser le jeu
   function initializeGame() {
       // Réinitialiser les lettres devinées
       guessedLetters.length = 0;

       // Réinitialiser les vies
       remainingLives = 5;

       // Sélectionner un mot aléatoire de la liste
       word = words[Math.floor(Math.random() * words.length)];

       // Afficher les tirets pour chaque lettre du mot
       let displayedWord = "";
       for (let letter of word) {
           if (guessedLetters.includes(letter) || letter === " ") {
               displayedWord += letter;
           } else {
               displayedWord += "-";
           }
       }
       wordDisplay.textContent = displayedWord;

       // Afficher le nombre initial de vies restantes
       remainingLivesDisplay.textContent = remainingLives;

       // Effacer la liste des lettres devinées précédemment
       guessedLettersDisplay.textContent = "";
   }

   // Fonction pour vérifier si le joueur a gagné
   function checkWin() {
       if (!wordDisplay.textContent.includes("-")) {
           alert("Bravo ! Vous avez gagné !");
           initializeGame();
       }
   }

   // Fonction pour vérifier si le joueur a perdu
   function checkLose() {
       if (remainingLives === 0) {
           alert("Désolé, vous avez perdu. Le mot était : " + word);
           initializeGame();
       }
   }

   // Écouter le clic sur le bouton "Deviner"
   guessButton.addEventListener("click", function() {
       const guess = guessInput.value.toLowerCase();
       if (guess && !guessedLetters.includes(guess)) {
           guessedLetters.push(guess);
           guessedLettersDisplay.textContent += guess + " ";
           
           if (word.includes(guess)) {
               // Mettre à jour l'affichage du mot avec la lettre correcte
               let displayedWord = "";
               for (let letter of word) {
                   if (guessedLetters.includes(letter) || letter === " ") {
                       displayedWord += letter;
                   } else {
                       displayedWord += "-";
                   }
               }
               wordDisplay.textContent = displayedWord;

               checkWin();
           } else {
               remainingLives--;
               remainingLivesDisplay.textContent = remainingLives;
               checkLose();
           }
       }
       guessInput.value = "";
   });

   // Initialiser le jeu au chargement de la page
   initializeGame();