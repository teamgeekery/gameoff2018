let player;
let cursors;
let jumpButton;

export class  SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image("chicken", "assets/img/chicken.png");
    this.load.audio("jump", "assets/audio/jump.wav");
  }

  create() {
    // Create the player.
    player = this.physics.add.sprite(100, 400, "chicken");
    player.setCollideWorldBounds(true);

    // Create cursors.
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (cursors.right.isDown) {
      player.setVelocityX(160);
    }
    else if (cursors.left.isDown) {
      player.setVelocityX(-160);
    }
    else {
      player.setVelocityX(0);
    }

    // Handle dem jumps.
    if (cursors.space.isDown && player.body.onFloor()) {
      this.sound.play("jump");
      player.setVelocityY(-200);
    }
  };
}
