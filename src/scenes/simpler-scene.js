let player;
let cursors;
let ground;

export class SimplerScene extends Phaser.Scene {

  constructor() {
    super('SimplerScene');
  }
  preload() {
    this.load.image("ground", "assets/img/ground.png");
    this.load.image("chicken", "assets/img/chicken.png");
    this.load.audio("jump", "assets/audio/jump.wav");
  }

  create() {
    // Set up the ground.
    ground = this.physics.add.staticGroup();
    ground.create(360, 384, "ground");

    // Create the player.
    player = this.physics.add.sprite(100, 370, "chicken");
    player.setCollideWorldBounds(true);

    // Set the collider.
    this.physics.add.collider(player, ground);

    // Create cursors.
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (cursors.right.isDown) {
      player.setVelocityX(150);
      player.flipX = false;
    }
    else if (cursors.left.isDown) {
      player.setVelocityX(-150);
      player.flipX = true;
    }
    else {
      player.setVelocityX(0);
    }
  };
}
