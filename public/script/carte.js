const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let boxImage; // Une seule image pour toutes les boîtes

const gridSize = 55;
const gridWidth = canvas.width / (gridSize / 4);
const gridHeight = canvas.height / (gridSize / 4);

const player = {
    x: 2,
    y: 2,
    width: gridSize - 2,
    height: gridSize - 2
};

const boxNames = ["RAP FR", "RAP US", "POP", "DRILL", "ELECTRO", "DOUCEUR", "ROCK"];

const boxes = generateRandomBoxPositions(7);

// Chargez l'image pour toutes les boîtes une seule fois
function loadBoxImage() {
    boxImage = new Image();
    boxImage.src = '/images/jukebox.png';
    boxImage.onload = function () {
        startGame();
    };
}

function generateRandomBoxPositions(count) {
    const positions = [];
    for (let i = 0; i < count; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * (gridWidth - 2)) + 1;
            randomY = Math.floor(Math.random() * (gridHeight - 2)) + 1;
        } while (positions.some(box => box.x === randomX && box.y === randomY));

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
        ctx.drawImage(playerImage, player.x * (gridSize / 5), player.y * (gridSize / 5), player.width, player.height);
    }
}


// boxX = Math.random() * (700 - 100) + 100;
// boxY = box.y * (400 / 100) + 100;

// link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto:wght@300&display=swap');

function drawBoxes() {
    ctx.font = '15px Audiowide';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';

    for (const box of boxes) {
        console.log(player.x, box.x)
        const boxX = box.x * (gridSize / 5);
        const boxY = box.y * (gridSize / 5);

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
            switch (box.name) {
                case 'RAP FR':
                    window.location.href = '/rap-fr';
                    break;
                case 'RAP US':
                    window.location.href = '/rap-us';
                    break;
                case 'DRILL':
                    window.location.href = '/drill';
                    break;
                case 'ELECTRO':
                    window.location.href = '/electro';
                    break;
                case 'DOUCEUR':
                    window.location.href = '/douceur';
                    break;
                case 'POP':
                    window.location.href = '/pop';
                    break;
                case 'ROCK':
                    window.location.href = '/rock';
                    break;
            }
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
        console.log(`Position du joueur - X: ${player.x}, Y: ${player.y}`);
        checkAndOpenPopup();
    }

    update();
    event.preventDefault();
});


function startGame() {
    update();
}
loadBoxImage();
