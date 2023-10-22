const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let boxImage; 

const gridSize = 55;
const gridWidth = Math.floor(canvas.width / gridSize);
const gridHeight = Math.floor(canvas.height / gridSize);

const player = {
    x: 2,
    y: 2,
    width: gridSize - 2,
    height: gridSize - 2
};

const boxNames = ["RAP-FR", "RAP-US", "POP", "DRILL", "ELECTRO", "DOUCEUR", "ROCK"];

const boxes = generateRandomBoxPositions(7);

function loadBoxImage() {
    boxImage = new Image();
    boxImage.src = '/images/jukebox.png';
    boxImage.onload = startGame;
}

function generateRandomBoxPositions(count) {
    const positions = [];
    for (let i = 0; i < count; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * gridWidth);
            randomY = Math.floor(Math.random() * gridHeight);
        } while (
            positions.some(box => (box.x === randomX && box.y === randomY) ||
                randomX === player.x && randomY === player.y ||
                (randomX === 0 || randomX === gridWidth - 1 ||
                randomY === 0 || randomY === gridHeight - 1)
            )    
        );

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
            window.location.href = `/${box.name.toLowerCase()}`;
            return;
        }
    }
}

window.addEventListener('keydown', function (event) {
    let prevX = player.x;
    let prevY = player.y;

    // Utilisez les touches définies dans le fichier "control.js"
    switch (event.key) {
        case controls["Forwards"][1]:
            if (player.y > 0) player.y--;
            break;
        case controls["Backwards"][1]:
            if (player.y < gridHeight - 1) player.y++;
            break;
        case controls["Left"][1]:
            if (player.x > 0) player.x--;
            break;
        case controls["Right"][1]:
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
