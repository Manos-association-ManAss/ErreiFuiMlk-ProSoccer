/* global Phaser */
export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.image('abertura', './assets/abertura/abertura.png')

    this.load.spritesheet('botãoA', './assets/abertura/BotãoAbertura.png', {
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
        this.game.scene.start('sala')
      })
    this.botão = this.add.sprite(400, 225, 'botãoA', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('abertura')
        this.game.scene.start('sala')
      })
  }

  update () { }
}
