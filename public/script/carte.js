const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let boxImage; // Une seule image pour toutes les boîtes

const gridSize = 55;
const gridWidth = Math.floor(canvas.width / gridSize); // Correction
const gridHeight = Math.floor(canvas.height / gridSize); // Correction

const player = {
    x: 2,
    y: 2,
    width: gridSize - 2,
    height: gridSize - 2
};

const boxNames = ["RAP-FR", "RAP-US", "POP", "DRILL", "ELECTRO", "DOUCEUR", "ROCK"];

const boxes = generateRandomBoxPositions(7);

// Chargez l'image pour toutes les boîtes une seule fois
function loadBoxImage() {
    boxImage = new Image();
    boxImage.src = '/images/jukebox.png';
    boxImage.onload = startGame; // Correction
}

function generateRandomBoxPositions(count) {
    const positions = [];
    for (let i = 0; i < count; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * gridWidth); // Correction
            randomY = Math.floor(Math.random() * gridHeight); // Correction
        } while (
            positions.some(box => (box.x === randomX && box.y === randomY) || // Vérification de superposition
                randomX === player.x && randomY === player.y) || // Vérification que la boîte ne se superpose pas au joueur
            (randomX === 0 || randomX === gridWidth - 1 || // Vérification des limites du cadre
                randomY === 0 || randomY === gridHeight - 1)
        );

        // Ajoutez le nom à chaque boîte
        positions.push({
            x: randomX,
            y: randomY,
            name: boxNames[i]
        });
    }
    return positions;
}

function drawPlayer() {
    let playerImage = new Image();
    playerImage.src = '/images/character.png';

    // Dessiner l'image du joueur à la position x, y
    playerImage.onload = function () {
        ctx.drawImage(playerImage, player.x * gridSize, player.y * gridSize, player.width, player.height);
    };
}

function drawBoxes() {
    ctx.font = '15px Audiowide';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';

    for (const box of boxes) {
        const boxX = box.x * gridSize;
        const boxY = box.y * gridSize;

        ctx.drawImage(boxImage, boxX, boxY, gridSize, gridSize);
        ctx.fillText(box.name, boxX + gridSize / 2, boxY + gridSize + 15);
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoxes();
    drawPlayer();
}

function checkAndOpenPopup() {
    for (const box of boxes) {
        if (player.x === box.x && player.y === box.y) {
            window.location.href = `/${box.name.toLowerCase()}`; // Utilisez le nom de la boîte pour construire l'URL
            return;
        }
    }
}

window.addEventListener('keydown', function (event) {
    let prevX = player.x;
    let prevY = player.y;

    switch (event.key) {
        case 'ArrowUp':
            if (player.y > 0) player.y--;
            break;
        case 'ArrowDown':
            if (player.y < gridHeight - 1) player.y++;
            break;
        case 'ArrowLeft':
            if (player.x > 0) player.x--;
            break;
        case 'ArrowRight':
            if (player.x < gridWidth - 1) player.x++;
            break;
    }

    if (prevX !== player.x || prevY !== player.y) {
        checkAndOpenPopup();
    }

    update();
    event.preventDefault();
});

function startGame() {
    update();
}

loadBoxImage();

let controls = {
    "Forwards": [38, "ArrowUp"],
    "Backwards": [40, "ArrowDown"],
    "Left": [37, "ArrowLeft"],
    "Right": [39, "ArrowRight"]
};

document.getElementById("Forwards").children[1].onclick = () => { changeControls("Forwards") };
document.getElementById("Backwards").children[1].onclick = () => { changeControls("Backwards") };
document.getElementById("Left").children[1].onclick = () => { changeControls("Left") };
document.getElementById("Right").children[1].onclick = () => { changeControls("Right") };

function changeControls(str) {
    let touch = document.getElementById(str);
    touch.children[1].innerHTML = "Press new control";
    document.removeEventListener('keydown', handleKeyDown, true);

    function handleKeyDown(event) {
        document.addEventListener('keydown', handleKeyDown, true);
        console.log(event.key);
        controls[str][0] = event.keyCode;
        controls[str][1] = event.key;
        touch.children[0].innerHTML = "Walk " + str + " : " + controls[str][1];
        touch.children[1].innerHTML = "Change";
        document.removeEventListener("keydown", handleKeyDown, true);
        
    }

    document.addEventListener("keydown", handleKeyDown, true);
}


let avatarImage = document.querySelector('.avatar'); //Récupération du personnage
let currentImage = '/images/character.png'; // Personnage de base
let alternateImage1 = '/images/character2d.png'; // Personnage 2
let alternateImage2 = '/images/monkey-character.png'; // Personnage 3
let alternateImage3 = '/images/character.png'; // Personnage 4

let currentAlternateIndex = 0;
const alternateImages = [alternateImage1, alternateImage2, alternateImage3];

function changeAvatar() {
    currentAlternateIndex = (currentAlternateIndex + 1) % alternateImages.length;
    const newImage = alternateImages[currentAlternateIndex];
    avatarImage.src = newImage;
}

