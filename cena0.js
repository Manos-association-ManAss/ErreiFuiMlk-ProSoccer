export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.image('ifsc-sj-2014', './ifsc-sj-2014.png')
  }

  create () {
    this.imagem = this.add.image(400, 225, 'ifsc-sj-2014')
    this.timer = 2
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true
    })
  }

  update() {} 

  countdown () {
    this.timer -= 1
    if (this.timer <= 0) {
      this.imagem.destroy()
      this.timedEvent.destroy()
      this.game.scene.start('sala')
    }
  }
}