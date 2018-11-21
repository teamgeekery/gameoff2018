import "phaser";

import { LevelOne } from "./scenes/level-one";
import { SimpleScene } from "./scenes/simple-scene";

const gameConfig = {
  type: Phaser.AUTO,
  width: 720,
  height: 400,
  backgroundColor: "#40bfff",
  scene: [ LevelOne, SimpleScene ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};

new Phaser.Game(gameConfig);
