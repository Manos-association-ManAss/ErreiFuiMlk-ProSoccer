export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.image('ifsc-sj-2014', '../assets/ifsc-sj-2014.png')
    this.load.spritesheet('derek', '../assets/Derek.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.imagem = this.add.image(400, 225, 'ifsc-sj-2014')
    this.personagem = this.physics.add.sprite(400, 225, 'derek')
      .setInteractive()
      .on('pointerdown', () => {
        this.personagem.anims.play('derek-direita')
        this.personagem.setVelocityX(100)
      })
      .on('pointerup', () => {
        this.personagem.setVelocityX(0)
      })

    this.anims.create({
      key: 'derek-direita',
      frames: this.anims.generateFrameNumbers('derek', {
        start: 8,
        end: 11
      }),
      frameRate: 6,
      repeat: -1
    })
  }

  update () { }
}
