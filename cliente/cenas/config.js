/* Configuração do objeto Game */

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  pixelArt: true,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 450
  }
}
