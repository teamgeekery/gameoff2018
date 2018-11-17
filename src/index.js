import "phaser";

import { SimpleScene } from "./scenes/simple-scene";

const gameConfig = {
  type: Phaser.AUTO,
  width: 720,
  height: 400,
  scene: SimpleScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  }
};

new Phaser.Game(gameConfig);
