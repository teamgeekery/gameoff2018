let player;
let cursors;
let jumpButton;

export class  SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image("cokecan", "assets/cokecan.png");
  }

  create() {
    // Create the player.
    player = this.physics.add.sprite(100, 200, "cokecan");
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
    if (cursors.up.isDown && player.body.onFloor()) {
      player.setVelocityY(-400);
    }
  };
}
