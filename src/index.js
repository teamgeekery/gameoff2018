import "phaser";

import { SimpleScene } from "./scenes/simple-scene";
import { SimplerScene } from "./scenes/simpler-scene";

const gameConfig = {
  type: Phaser.AUTO,
  width: 720,
  height: 400,
  scene: [ SimpleScene, SimplerScene ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  }
};

new Phaser.Game(gameConfig);
