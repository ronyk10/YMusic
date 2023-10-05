
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var platforms; // Groupe pour les plateformes
var boxes; // Groupe pour les boîtes
var texts = []; // Tableau pour les textes au-dessus des boîtes

var lives = 5; // Nombre de vies initial du joueur
var livesText; // Texte pour afficher le nombre de vies
var heartIcons = []; // Tableau pour les icônes de cœur



var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('platform', 'assets/platform.png');
    this.load.image('boxes', 'assets/Jukebox.png');
    this.load.image('heart', 'assets/vinyl 2.png');
    this.load.image('fond', 'assets/fond.png');
   
}

function create ()
{
    this.add.image(400,400, 'fond');
    // Crée le joueur
    player = this.physics.add.sprite(100, 450, 'dude');

    // Configuration du joueur
    player.setCollideWorldBounds(true);

    // Crée les animations du joueur
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    

    // Configuration des curseurs pour le déplacement
    cursors = this.input.keyboard.createCursorKeys();

    // Crée un groupe pour les plateformes
    platforms = this.physics.add.staticGroup();

    // Crée les plateformes à différents niveaux
    platforms.create(400, 568, 'platform').setScale(2).refreshBody(); // Étage le plus bas
    platforms.create(400, 575, 'platform').setScale(0.5).refreshBody();
    platforms.create(700, 525, 'platform').setScale(0.5).refreshBody();
    platforms.create(100, 475, 'platform').setScale(0.5).refreshBody();
    platforms.create(600, 425, 'platform').setScale(0.5).refreshBody();
    platforms.create(200, 375, 'platform').setScale(0.5).refreshBody();
    platforms.create(500, 325, 'platform').setScale(0.5).refreshBody();
    platforms.create(300, 275, 'platform').setScale(0.5).refreshBody();
    platforms.create(400, 225, 'platform').setScale(0.5).refreshBody();

    // Crée un groupe pour les boîtes (boxes)
    boxes = this.physics.add.group({
        key: 'boxes',
        repeat: 7,
        setScale : {x : 0.1, y: 0.1},
        setXY: { x: 50, y: 0, stepX: 98 }
    });


    boxes.children.iterate(function (child, index) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
        child.setInteractive(); // Permet la détection d'interaction
        
        // Positionne le texte au-dessus de chaque boîte
        var boxText = this.add.text(child.x - 20, child.y - 40, 'Boîte ' + (index + 1), { fontSize: '12px', fill: '#fff' });
        texts.push(boxText);
    }, this);

    // Crée le texte pour afficher le nombre de vies
    livesText = this.add.text(700, 16, 'Vies: ' + lives, { fontSize: '12px', fill: '#fff' });

    //   icônes de vinile pour  vies
    for (var i = 0; i < lives; i++) {
        var heartIcon = this.add.image(30 + i * 40, 30, 'heart').setDisplaySize(32, 32);
        heartIcons.push(heartIcon);
    }

    // Ajoutez une collision entre le joueur et les plateformes
    this.physics.add.collider(player, platforms);
    // Ajoutez une collision entre les boîtes et les plateformes
    this.physics.add.collider(boxes, platforms);

}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    // Ajoutez la fonctionnalité de saut
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-450); // Ajustez la valeur de déplacement vertical pour le saut
    }

    // Mise à jour du texte du nombre de vies

    livesText.setText('Vies: ' + lives);
   

}