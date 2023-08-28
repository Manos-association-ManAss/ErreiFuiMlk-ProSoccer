export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    /* imagem de fundo */
    this.load.image('ifsc-sj-2014', '../assets/ifsc-sj-2014.png')

    /* personagem */
    this.load.spritesheet('derek', '../assets/Derek.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    /* botões */
    this.load.spritesheet('direita', '../assets/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('esquerda', '../assets/esquerda.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.imagem = this.add.image(400, 225, 'ifsc-sj-2014')

    /* personagem */
    this.personagem = this.physics.add.sprite(400, 225, 'derek')

    /* animações */
    this.anims.create({
      key: 'derek-parado',
      frames: this.anims.generateFrameNumbers('derek', {
        start: 0,
        end: 0
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'derek-direita',
      frames: this.anims.generateFrameNumbers('derek', {
        start: 8,
        end: 11
      }),
      frameRate: 8,
      repeat: -1
    })

    /* botões */
    this.direita = this.add.sprite(180, 350, 'direita', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('derek-direita', true)
        this.personagem.setVelocityX(200)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('derek-parado')
        this.personagem.setVelocityX(0)
      })
    this.esquerda = this.add.sprite(50, 400, 'esquerda, 0')
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('derek-esquerda', true)
        this.personagem.setVelocityX(200)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('derek-parado')
        this.personagem.setVelocityX(0)
  })

  update () { }
}
