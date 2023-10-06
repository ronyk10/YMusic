function drawBoxes() {
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    for (const box of boxes) {
        const boxX = box.x * (gridSize / 4);
        const boxY = box.y * (gridSize / 4);

        // Dessinez l'image de la boîte
        ctx.drawImage(boxImage, boxX, boxY, gridSize, gridSize);

        // Dessinez le nom de la boîte en dessous
        ctx.fillText(box.name, boxX + gridSize / 2, boxY + gridSize + 12);
    }
}