export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('abertura', './assets/abertura/abertura.png')

    this.load.spritesheet('botãoA', './assets/mapa/BotãoAbertura.png', {
      frameWidth: 800,
      frameHeight: 450
    })
  }

  create () {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'abertura')

    this.add.text(50, this.game.config.height * 0.85, '[Pesadelos Lúcidos]')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('abertura')
        // this.scale.startFullscreen()
        this.game.scene.start('sala')
      })
  }

  update () { }
}
