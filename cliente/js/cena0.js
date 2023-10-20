export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    /* imagem de fundo */
    this.load.image('ifsc-sj-2014', '../assets/ifsc-sj-2014.png')

    /* personagem */
    this.load.spritesheet('YE', '../assets/YE.png', {
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
    this.load.spritesheet('cima', '../assets/cima.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.imagem = this.add.image(400, 225, 'ifsc-sj-2014')

    /* personagem */
    this.personagem = this.physics.add.sprite(400, 225, 'YE')

    /* animações */
    this.anims.create({
      key: 'YE-paradoD',
      frames: this.anims.generateFrameNumbers('YE', {
        start: 34,
        end: 34
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'YE-paradoE',
      frames: this.anims.generateFrameNumbers('YE', {
        start: 35,
        end: 35
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'YE-direita',
      frames: this.anims.generateFrameNumbers('YE', {
        start: 0,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'YE-esquerda',
      frames: this.anims.generateFrameNumbers('YE', {
        start: 23,
        end: 33
      }),
      frameRate: 15,
      repeat: -1
    })

    /* botões */

    /* botão pra dirieta */
    this.direita = this.add.sprite(190, 370, 'direita', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('YE-direita', true)
        this.personagem.setVelocityX(200)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('YE-paradoD')
        this.personagem.setVelocityX(0)
      })

    /* botão pra esquerda */
    this.esquerda = this.add.sprite(50, 350, 'esquerda', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('YE-esquerda', true)
        this.personagem.setVelocityX(-200)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('YE-paradoE')
        this.personagem.setVelocityX(0)
      })

    /* botão pra cima */
    this.cima = this.add.sprite(150, 490, 'cima', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        this.personagem.anims.play('YE-esquerda', true)
        this.personagem.setVelocityX(-190)
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('YE-paradoE')
        this.personagem.setVelocityX(0)
      })
  }

  update () { }
}
