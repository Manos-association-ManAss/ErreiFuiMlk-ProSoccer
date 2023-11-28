export default class abertura extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () {
    this.load.spritesheet('fundo-salas', '../assets/salas/FundoSalas.png', {
      frameWidth: 450,
      frameHeight: 450
    })

    this.load.spritesheet('sala1', '../assets/salas/Sala01.png', {
      frameWidth: 247,
      frameHeight: 151
    })
    this.load.spritesheet('sala2', '../assets/salas/Sala02.png', {
      frameWidth: 247,
      frameHeight: 151
    })
    this.load.spritesheet('sala3', '../assets/salas/Sala03.png', {
      frameWidth: 247,
      frameHeight: 151
    })
    this.load.spritesheet('sala4', '../assets/salas/Sala04.png', {
      frameWidth: 247,
      frameHeight: 151
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
    this.add.sprite(400, 225, 'fundo-salas', 0)
      .setScrollFactor(0)
      .anims.play('fundo-salas', true)
    this.salas = [
      {
        numero: '1',
        x: 150,
        y: 120,
        image: 'sala1',
        botao: undefined
      },
      {
        numero: '2',
        x: 650,
        y: 120,
        image: 'sala2',
        botao: undefined
      },
      {
        numero: '3',
        x: 150,
        y: 320,
        image: 'sala3',
        botao: undefined
      },
      {
        numero: '4',
        x: 650,
        y: 320,
        image: 'sala4',
        botao: undefined
      }
    ]
    this.salas.forEach((item) => {
      item.botao = this.add
        .image(item.x, item.y, item.image, {
          fontFamily: 'monospace',
          font: '32px Courier',
          fill: '#cccccc'
        })
        .setInteractive()
        .on('pointerdown', () => {
          this.salas.forEach((item) => {
            item.botao.destroy()
          })
          this.game.sala = item.numero
          this.game.socket.emit('entrar-na-sala', this.game.sala)
        })
    })

    this.game.socket.on('jogadores', (jogadores) => {
      console.log(jogadores)
      if (jogadores.segundo) {
        this.game.jogadores = jogadores
        this.game.scene.stop('sala')
        this.game.scene.start('mapa1')
      } else if (jogadores.primeiro) {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
          .then((stream) => {
            this.game.midias = stream
          })
          .catch((error) => console.error(error))
      }
    })
  }

  update
}
