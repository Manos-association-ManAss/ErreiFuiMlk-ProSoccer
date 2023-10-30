export default class abertura extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () {
    this.load.spritesheet('fundo-salas', '../assets/salas/FundoSalas.png', {
      frameWidth: 450,
      frameHeight: 450
    })

    this.load.spritesheet('botões', '../assets/salas/BotãoSala.png', {
      frameWidth: 800,
      frameHeight: 450
    })
  }

  create () {
    this.add.rectangle(400, 225, 800, 450, 0xffbf78)

    this.anims.create({
      key: 'fundo-salas',
      frames: this.anims.generateFrameNumbers('fundo-salas', {
        start: 0,
        end: 15
      }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'botões',
      frames: this.anims.generateFrameNumbers('fundo-salas', {
        start: 0,
        end: 15
      })
    })

    this.add.sprite(400, 225, 'fundo-salas', 0)
      .setScrollFactor(0)
      .anims.play('fundo-salas', true)

    this.botao1 = null
    this.botao2 = null
    this.botao3 = null
    this.botao4 = null

    this.botoes = [this.botao1, this.botao2, this.botao3, this.botao4]

    for (let i = 0; i < this.botoes; i++) {
      this.botoes[i] = this.add.sprite(400, 225, 'botões', i * 2)
        .setScrollFactor(0)
        .on('pointerdown', () => {
          console.log('aa')
          this.botoes[i].setFrame(i * 2 + 1)
        })
    }
  }

  update () { }
}
