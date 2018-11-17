let player;
let cursors;
let ground;

let jumpSkill = 0;

export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image("sky", "assets/img/sky.png");
    this.load.image("ground", "assets/img/ground.png");
    this.load.image("chicken", "assets/img/chicken.png");
    this.load.audio("jump", "assets/audio/jump.wav");
  }

  create() {
    // Add the sky.
    this.add.image(0, 0, "sky").setOrigin(0, 0);

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

    // Handle dem jumps.
    if (cursors.space.isDown && player.body.onFloor()) {
      // Play our sweet jump sound.
      this.sound.play("jump");

      // Throw the chicken into the air!
      player.setVelocityY(-200 - jumpSkill);

      // Increase the players jump skill.
      jumpSkill++;
    }
  };
}
