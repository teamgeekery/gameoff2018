let player;
let cursors;

let jumpSkill = 0;

export class LevelOne extends Phaser.Scene {

  constructor() {
    super('LevelOne');
  }

  preload() {
    this.load.spritesheet("chicken", "assets/img/birds1.png", {frameWidth: 42, frameHeight: 36 } );
    this.load.audio("jump", "assets/audio/jump.wav");
    this.load.image("tiles", "assets/tilesets/Platform-Tiles32.png");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/level1.json");
  }

  create() {
    const map = this.make.tilemap({key: "map"});
    const tileset = map.addTilesetImage("Platform-Tiles32", "tiles");
    const worldLayer = map.createStaticLayer("world", tileset, 0, 0);

    // Add collision to anything we set in Tiled.
    worldLayer.setCollisionByProperty({ collides: true });

    // Create the player.
    player = this.physics.add.sprite(100, 348, "chicken");
    player.setCollideWorldBounds(true);

    // Listen to world bound events.
    player.body.onWorldBounds = true;

    // Set the collider.
    this.physics.add.collider(player, worldLayer);

    // Set world boundaries.
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    // Create cursors.
    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);

    // Switch to the next scene when we hit the world bound.
    this.physics.world.setBoundsCollision(true, true, true, true);

    this.physics.world.on("worldbounds", function (body) {
      this.scene.start('SimpleScene');
    }, this);

    // Player animations.
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('chicken', {start: 3, end: 5}),
      frameRate:10,
      repeat: -1,
      showOnStart: true
    });
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

    // Handle player idleness
    if (!player.body.onFloor()) {

      // Check if player idle needs to be unpause or started
      if (player.anims.paused) {
        player.anims.resume();
      }
      else {
        player.anims.play('idle');
      }
    }
  };
}
