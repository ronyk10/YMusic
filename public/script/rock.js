var audioElement = new Audio();
var rockSounds = ["Billie Jean.mp3", "Jailhouse Rock.mp3","Rock Around The Clock.mp3","Roll Over Beethoven.mp3","Smells Like Teen Spirit.mp3","T.N.T..mp3"];
var currentSongTitle = rockSounds[Math.floor(Math.random() * rockSounds.length)].replace(".mp3", "");
var currentLife = 5;
var penduArray = [];
var testedLetters = []; // Ajoutez un tableau pour stocker les lettres testées

function playRandomSoundRap() {
    var soundFile = "/audio/rock/" + currentSongTitle + ".mp3";
    console.log(soundFile);
    audioElement.src = soundFile;
    audioElement.play();

    penduArray = currentSongTitle.split("").map(char => (char === " " ? " " : "_"));
    updateCurrentSongTitleElement();
    updateLifeElement();
}

// function resetGame() {
//     // Réinitialisez toutes les variables du jeu
//     currentSongTitle = rockSounds[Math.floor(Math.random() * rockSounds.length)].replace(".mp3", "");
//     currentLife = 5;
//     penduArray = [];
//     testedLetters = [];

//     // Réinitialisez les éléments HTML
//     updateCurrentSongTitleElement();
//     updateLifeElement();
//     updateTestedLettersElement();

//     // Fermez la popup si elle est ouverte
//     closePopupFunc();

//     // Lancez une nouvelle partie
//     playRandomSoundRap();
// }
console.log(currentSongTitle)

function compareInput() {
    var userInput = document.getElementById("userInput").value.toLowerCase();
    var matchFound = false;

    // Vérifiez si la lettre a déjà été testée
    if (testedLetters.includes(userInput)) {
        console.log("Lettre déjà testée : " + userInput);
        document.getElementById("userInput").value = "";
        return; // Sortez de la fonction si la lettre a déjà été testée
    }else if(checkword(userInput)){
        audioElement.pause();
       openPopupWin();

       return;
    }
    console.log(currentSongTitle , userInput)
    testedLetters.push(userInput); // Ajoutez la lettre testée au tableau

    for (let i = 0; i < currentSongTitle.length; i++) {
        if (userInput === currentSongTitle[i].toLowerCase()) {
            console.log("L'entrée de l'utilisateur correspond à la lettre " + userInput);
            penduArray[i] = currentSongTitle[i];
            matchFound = true;
        }
    }

    // Enlèvement de vie
    if (!matchFound) {
        currentLife--; 
        updateLifeElement();
        console.log("L'entrée de l'utilisateur ne correspond à aucune lettre du titre de la chanson");
    }

    updateCurrentSongTitleElement();
    document.getElementById("userInput").value = "";

    // Vérification de la fin du jeu
    if (penduArray.indexOf("_") === 0) {
        console.log("Félicitations, vous avez deviné le titre de la chanson !");
        audioElement.pause();
        openPopupWin();
        return;
    
    }

    // Vérifiez si le joueur a perdu (plus de vies)
    if (currentLife <= 0) {
        console.log("Vous avez perdu, le titre de la chanson était : " + currentSongTitle);
        audioElement.pause();
        openPopupLoser();
        return;

    }

    // Mettez à jour l'élément "testedLetters" avec les lettres testées
    updateTestedLettersElement();
}

function checkword(userInput){
    if(userInput == currentSongTitle.toLowerCase()){
        return true;
        alert("gagné")
    }
}

function updateCurrentSongTitleElement() {
    var currentSongTitleElement = document.getElementById("currentSongTitle");
    currentSongTitleElement.textContent = "" + penduArray.join("");
}

function updateLifeElement() {
    var lifeElement = document.getElementById("currentLife");
        lifeElement.textContent = currentLife;
    

        for (let i = 1; i <= 5; i++) {
            var vinyleImage = document.getElementById("vinyle" + i);
            if (i <= currentLife) {
                vinyleImage.style.display = "inline-block";
            } else {
                // Masquer ou supprimer l'image du vinyle si la vie est perdue
                vinyleImage.style.display = "none"; 
            }
        }
}

//-----------------------------FUNCTION FOR THE POPUP-----------------------------

//déclaration de variables
let popupWin = document.getElementById("popup-winner");
let popupLoser = document.getElementById("popup-loser");

// Function to open the popup winner
function openPopupWin(){
    popupWin.style.display = "block";
    let popupSound = document.getElementById("winner");
    popupSound.play();
}

// Function to open the popup loser
function openPopupLoser(){
    popupLoser.style.display = "block";
    let popupSound = document.getElementById("loser");
    popupSound.play();
}

// Function to close the popups
function closePopupFunc() {
    popupWin.style.display = 'none';
    popupLoser.style.display = 'none';
    document.body.style.overflow = '';
}

let closePopup = document.getElementById('cross-close-popup');
closePopup.addEventListener('click', closePopupFunc);


function updateTestedLettersElement() {
    var testedLettersElement = document.getElementById("testedLetters");
    testedLettersElement.textContent = testedLetters; 
}


var playRandomRap = document.getElementById("playRandomRap");
playRandomRap.addEventListener("click", playRandomSoundRap);

var compareButton = document.getElementById("userInputcheck");
compareButton.addEventListener("click", compareInput);