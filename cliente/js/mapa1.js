export default class mapa1 extends Phaser.Scene {
  tilemap
  constructor () {
    super('mapa1')
  }

  preload () {
    /* mapa */
    this.load.tilemapTiledJSON('mapa', './assets/mapa/mapa.json')
    this.load.image('MapaTiles', './assets/mapa/MapaTiles.png')

    /* personagem */
    this.load.spritesheet('YE', './assets/YE.png', {
      frameWidth: 47,
      frameHeight: 58
    })
    this.load.spritesheet('tyler', './assets/tyler.png', {
      frameWidth: 47,
      frameHeight: 58
    })
    this.load.spritesheet('YE-pulo', './assets/YE-pulo.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('tyler-pulo', './assets/tyler-pulo.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('vida', './assets/vida.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('balaoT', './assets/balaoT.png', {
      frameWidth: 800,
      frameHeight: 450
    })
    this.load.spritesheet('balaoY', './assets/balaoY.png', {
      frameWidth: 800,
      frameHeight: 450
    })

    /* genérico */
    this.load.spritesheet('direita', './assets/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('esquerda', './assets/esquerda.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('cima', './assets/cima.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('money', './assets/money.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('808', './assets/albuns/808.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('graduation', './assets/albuns/graduation.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('kids', './assets/albuns/kids.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('mbdtf', './assets/albuns/mbdtf.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('pablo', './assets/albuns/pablo.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('watch', './assets/albuns/watch.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('yee', './assets/albuns/yee.png', {
      frameWidth: 28,
      frameHeight: 28
    })
    this.load.spritesheet('moeda', './assets/albuns/yeezus.png', {
      frameWidth: 48,
      frameHeight: 48
    })

    this.load.audio('trilha', './assets/sons/allofthelights.mp3')
    this.load.audio('moedaSom', './assets/sons/moedaSom.mp3')
    this.load.audio('gameOverSom', './assets/sons/gameOverSom.mp3')
  }

  create () {
    this.trilha = this.sound.add('trilha')
    this.trilha.loop = true
    this.trilha.volume = 0.2
    this.trilha.play()
    this.input.addPointer(3)
    this.moedaSom = this.sound.add('moedaSom')

    /* mapa */
    this.tilemapMapa = this.make.tilemap({
      key: 'mapa'
    })

    this.tilesetTile1 = this.tilemapMapa.addTilesetImage('MapaTiles')

    this.layerfundo = this.tilemapMapa.createLayer('fundo', [this.tilesetTile1])
    this.layeratras2 = this.tilemapMapa.createLayer('atras2', [this.tilesetTile1])
    this.layeratras = this.tilemapMapa.createLayer('atras', [this.tilesetTile1])
    this.layerblocos = this.tilemapMapa.createLayer('blocos', [this.tilesetTile1])
    this.layerdano = this.tilemapMapa.createLayer('dano', [this.tilesetTile1])
    this.layerfrente = this.tilemapMapa.createLayer('frente', [this.tilesetTile1])

    /* multiplayer + vida de cada jogador */
    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'YE'
      this.remoto = 'tyler'
      this.personagem = this.physics.add.sprite(2100, 444, this.local, 18) // 2100,444
      this.personagemRemoto = this.add.sprite(2100, 444, this.remoto, 18)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'tyler'
      this.remoto = 'YE'
      this.personagemRemoto = this.add.sprite(2100, 444, this.remoto, 18)
      this.personagem = this.physics.add.sprite(2100, 444, this.local, 18)

      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          this.game.localConnection = new RTCPeerConnection(this.game.ice_servers)

          this.game.localConnection.onicecandidate = function ({ candidate }) {
            candidate && globalThis.game.socket.emit('candidate', globalThis.game.sala, candidate)
          }

          this.game.localConnection.ontrack = function ({ streams: [stream] }) {
            globalThis.game.audio.srcObject = stream
          }

          stream.getTracks()
            .forEach((track) => this.game.localConnection.addTrack(track, stream))

          this.game.localConnection.createOffer()
            .then((offer) => this.game.localConnection.setLocalDescription(offer))
            .then(() => this.game.socket.emit('offer', this.game.sala, this.game.localConnection.localDescription))

          this.game.midias = stream
        })
        .catch((error) => console.error(error))
    }

    this.game.socket.on('offer', (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers)

      this.game.remoteConnection.onicecandidate = function ({ candidate }) {
        candidate && globalThis.game.socket.emit('candidate', globalThis.game.sala, candidate)
      }

      this.game.remoteConnection.ontrack = function ({ streams: [midia] }) {
        globalThis.game.audio.srcObject = midia
      }

      this.game.midias.getTracks()
        .forEach((track) => this.game.remoteConnection.addTrack(track, this.game.midias))

      this.game.remoteConnection.setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) => this.game.remoteConnection.setLocalDescription(answer))
        .then(() => this.game.socket.emit('answer', this.game.sala, this.game.remoteConnection.localDescription))
    })

    this.game.socket.on('answer', (description) =>
      this.game.localConnection.setRemoteDescription(description)
    )

    this.game.socket.on('candidate', (candidate) => {
      const conn = this.game.localConnection || this.game.remoteConnection
      conn.addIceCandidate(new RTCIceCandidate(candidate))
    })

    this.cameras.main.startFollow(this.personagem)

    /* animações */
    this.anims.create({
      key: 'personagem-paradoE',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 25,
        end: 25
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'personagem-paradoD',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 24,
        end: 24
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'personagem-direita',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 11
      }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-esquerda',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 12,
        end: 23
      }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-pulo',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 27,
        end: 29
      }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-pulou',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 30,
        end: 31
      }),
      frameRate: 12,
      repeat: 1
    })

    this.anims.create({
      key: 'personagem-poderD',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 39,
        end: 46
      }),
      frameRate: 36,
      repeat: 0
    })

    this.anims.create({
      key: 'personagem-poderE',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 47,
        end: 54
      }),
      frameRate: 36,
      repeat: 0
    })

    this.anims.create({})

    /* MOEDAS */

    this.moeda = [
      {
        x: 2485, // moeda 1
        y: 515
      },
      {
        x: 2610, // moeda 2
        y: 451
      },
      {
        x: 2755, // moeda 3
        y: 451
      },
      {
        x: 2485, // moeda 4
        y: 611
      },
      {
        x: 2880, // moeda 5
        y: 611
      },
      {
        x: 3190, // moeda 6
        y: 515
      },
      {
        x: 4101, // moeda 7
        y: 900
      },
      {
        x: 3731.5, // moeda 8
        y: 1219
      },
      {
        x: 4077.5, // moeda 9
        y: 1219
      },
      {
        x: 3579.5, // moeda 10
        y: 444
      },
      {
        x: 3246.5, // moeda 11
        y: 1096.77
      },
      {
        x: 2816, // moeda 12
        y: 1219
      },
      {
        x: 2586, // moeda 13
        y: 1219
      },
      {
        x: 2300, // moeda 14
        y: 1096
      },
      {
        x: 1815.5, // moeda 15
        y: 1219
      },
      {
        x: 1838.5, // moeda 16
        y: 1091
      },
      {
        x: 2008.5, // moeda 17
        y: 963
      },
      {
        x: 2118.5, // moeda 18
        y: 739
      },
      {
        x: 2858.5, // moeda 19
        y: 739
      },
      {
        x: 4531.5, // moeda 20
        y: 1155
      },
      {
        x: 4279.5, // moeda 21
        y: 931
      },
      {
        x: 4279.5, // moeda 22
        y: 675
      },
      {
        x: 4749.5, // moeda 23
        y: 1283
      },
      {
        x: 5154.5, // moeda 24
        y: 1123
      },
      {
        x: 6016.5, // moeda 25
        y: 1123
      },
      {
        x: 6103.5, // moeda 26
        y: 1187
      },
      {
        x: 6335.5, // moeda 27
        y: 963
      },
      {
        x: 6760.5, // moeda 28
        y: 963
      },
      {
        x: 6580.5, // moeda 29
        y: 835
      },
      {
        x: 6835.5, // moeda 30
        y: 739
      },
      {
        x: 7020.5, // moeda 31
        y: 611
      },
      {
        x: 7222.5, // moeda 32
        y: 483
      },
      {
        x: 7512.5, // moeda 33
        y: 355
      },
      {
        x: 7752.5, // moeda 34
        y: 835
      },
      {
        x: 7138.5, // moeda 35
        y: 2627
      },
      {
        x: 6549.5, // moeda 36
        y: 2563
      },
      {
        x: 6214.5, // moeda 37
        y: 2339
      },
      {
        x: 6044.5, // moeda 38
        y: 2243
      },
      {
        x: 5724.5, // moeda 39
        y: 2179
      },
      {
        x: 5992.5, // moeda 40
        y: 2467
      },
      {
        x: 5563.5, // moeda 41
        y: 2595
      },
      {
        x: 5283.5, // moeda 42
        y: 2627
      },
      {
        x: 4483.5, // moeda 43
        y: 2627
      },
      {
        x: 5100.5, // moeda 44
        y: 2467
      },
      {
        x: 4831.375, // moeda 45
        y: 2275
      },
      {
        x: 4101.375, // moeda 46
        y: 2083
      },
      {
        x: 3741.375, // moeda 47
        y: 2083
      },
      {
        x: 3261.375, // moeda 48
        y: 2019
      },
      {
        x: 4136.5, // moeda 49
        y: 2819
      },
      {
        x: 4036.5, // moeda 50
        y: 2819
      },
      {
        x: 3936.5, // moeda 51
        y: 2819
      },
      {
        x: 3836.5, // moeda 52
        y: 2819
      },
      {
        x: 3736.5, // moeda 53
        y: 2819
      },
      {
        x: 3146.5, // moeda 54
        y: 2819
      },
      {
        x: 2459.5, // moeda 55
        y: 2659
      },
      {
        x: 2291.5, // moeda 56
        y: 2531
      },
      {
        x: 2506.5, // moeda 57
        y: 2243
      },
      {
        x: 1719.5, // moeda 58
        y: 2147
      },
      {
        x: 1948.5, // moeda 59
        y: 3779
      },
      {
        x: 2563.5, // moeda 60
        y: 3779
      },
      {
        x: 3143.5, // moeda 61
        y: 3715
      },
      {
        x: 3753.5, // moeda 62
        y: 3715
      },
      {
        x: 4293.5, // moeda 63
        y: 3715
      },
      {
        x: 4688.5, // moeda 64
        y: 3715
      },
      {
        x: 5134.5, // moeda 65
        y: 3939
      },
      {
        x: 5256.5, // moeda 66
        y: 3939
      },
      {
        x: 5182.5, // moeda 67
        y: 3715
      },
      {
        x: 5751.5, // moeda 68
        y: 3747
      },
      {
        x: 6216.5, // moeda 69
        y: 3459
      },
      {
        x: 6851.5, // moeda 70
        y: 3683
      },
      {
        x: 7686.5, // moeda 71
        y: 3683
      },
      {
        x: 7931.5, // moeda 72
        y: 3523
      },
      {
        x: 8776.5, // moeda 73
        y: 3843
      },
      {
        x: 8936.5, // moeda 74
        y: 3683
      },
      {
        x: 9476.5, // moeda 75
        y: 3683
      }
    ]

    this.anims.create({
      key: 'moeda-girando',
      frames: this.anims.generateFrameNumbers('moeda', {
        start: 0,
        end: 5
      }),
      frameRate: 6,
      repeat: -1
    })

    this.moeda.forEach((moeda) => {
      moeda.objeto = this.physics.add.sprite(moeda.x, moeda.y, 'moeda')
      moeda.objeto.anims.play('moeda-girando')
      moeda.objeto.body.setAllowGravity(false)
      this.physics.add.collider(this.personagem, moeda.objeto, this.coletar_moeda, null, this)
    })

    this.textoMoeda = this.add.text(20, 150, `albuns: ${this.game.scoreMoeda.score}`, {
      fontFamily: 'Silkscreen',
      fontSize: '25px',
      stroke: '#000000',
      strokeThickness: 4,
      fill: '#ffffff'
    }).setScrollFactor(0)

    /* botão pra direita */
    this.direita = this.add.sprite(190, 400, 'direita', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('personagem-direita', true)
        this.personagem.setVelocityX(300)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('personagem-paradoD')
        this.personagem.setVelocityX(0)
      })

    /* botão pra esquerda */
    this.esquerda = this.add.sprite(60, 397, 'esquerda', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('personagem-esquerda', true)
        this.personagem.setVelocityX(-300)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('personagem-paradoE')
        this.personagem.setVelocityX(0)
      })

    /* botão pra cima */
    this.cima = this.add.sprite(680, 397, 'cima', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        if (this.personagem.body.blocked.down) {
          this.personagem.anims.play('personagem-pulo', true)
          this.personagem.setVelocityY(-645)
        }
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        if (this.personagem.body.velocity.y === 0) {
          // Se o personagem estiver tocando o chão, reproduza a animação 'personagem-parado'
          this.personagem.anims.play('personagem-parado', true)
        } else {
          // Caso contrário, reproduza a animação 'personagem-pulou'
          this.personagem.anims.play('personagem-pulou', true)
        }
      })

    /* balões */
    /* balão Tyler */

    this.balaoT = this.add.sprite(0, 0, 'balaoT', 0)
    this.balaoT.visible = false
    this.balaoT.setOrigin(0, 0)

    this.textoBalaoT = this.add.text(this.balaoT.x + 50, this.balaoT.y + 30, '', {
      fontSize: '18px',
      fill: '#fff',
      wordWrap: { width: 700, useAdvancedWrap: true }
    })

    this.anims.create({
      key: 'balaoT',
      frames: this.anims.generateFrameNumbers('balaoT', { start: 0, end: 2 }),
      frameRate: 12,
      repeat: -1
    })

    this.balaoT.on('animationcomplete', () => {
      this.balaoT.setFrame(0)
      this.balaoT.visible = false
      this.textoBalaoT.setText('')
    })

    // Função para exibir o balão com parâmetros configuráveis
    const exibirBalaoT = function (texto, tempoExibicao) {
      const jogadorX = this.personagem.x
      const jogadorY = this.personagem.y

      const offsetX = -400
      const offsetY = -250

      this.balaoT.x = jogadorX + offsetX
      this.balaoT.y = jogadorY + offsetY

      const textoOffsetX = 130
      const textoOffsetY = 50

      this.textoBalaoT.x = this.balaoT.x + textoOffsetX
      this.textoBalaoT.y = this.balaoT.y + textoOffsetY

      this.balaoT.setFrame(1)
      this.balaoT.visible = true
      this.balaoT.anims.play('balaoT', true)

      this.textoBalaoT.setOrigin(0, 0)
      this.textoBalaoT.setText(texto)

      this.time.delayedCall(tempoExibicao, () => {
        this.balaoT.visible = false
        this.textoBalaoT.setText('')
      })
    }

    /* como usar o balão
        this.input.keyboard.on('keydown-F', function (event) {
      // Chame a função exibirBalaoT com o texto desejado e o tempo de exibição
      exibirBalaoT.call(this, "Pressionada a tecla F", 3000 -> tempo em ms);
    }, this); */

    this.input.keyboard.on('keydown-F', function (event) {
      // Chame a função exibirBalaoT com o texto desejado e o tempo de exibição
      exibirBalaoT.call(this, 'Pressionada a tecla F', 3000)
    }, this)

    // Associe a função exibirBalaoT ao pressionar a tecla "G"
    this.input.keyboard.on('keydown-G', function (event) {
      // Chame a função exibirBalaoT com o texto desejado e o tempo de exibição
      exibirBalaoT.call(this, 'Pressionada a tecla G', 6000)
    }, this)

    /* balão YE */

    this.balaoY = this.add.sprite(0, 0, 'balaoY', 0)
    this.balaoY.visible = false
    this.balaoY.setOrigin(0, 0)

    this.textoBalaoY = this.add.text(this.balaoY.x + 50, this.balaoY.y + 30, '', {
      fontSize: '18px',
      fill: '#fff',
      wordWrap: { width: 700, useAdvancedWrap: true }
    })

    this.anims.create({
      key: 'balaoY',
      frames: this.anims.generateFrameNumbers('balaoY', { start: 0, end: 2 }),
      frameRate: 12,
      repeat: -1
    })

    this.balaoY.on('animationcomplete', () => {
      this.balaoY.setFrame(0)
      this.balaoY.visible = false
      this.textoBalaoY.setText('')
    })

    // Função para exibir o balão com parâmetros configuráveis
    const exibirBalaoY = function (texto, tempoExibicao) {
      const jogadorX = this.personagem.x
      const jogadorY = this.personagem.y

      const offsetX = -400
      const offsetY = -250

      this.balaoT.x = jogadorX + offsetX
      this.balaoT.y = jogadorY + offsetY

      const textoOffsetX = 130
      const textoOffsetY = 50

      this.textoBalaoY.x = this.balaoY.x + textoOffsetX
      this.textoBalaoY.y = this.balaoY.y + textoOffsetY

      this.balaoY.setFrame(1)
      this.balaoY.visible = true
      this.balaoY.anims.play('balaoY', true)

      this.textoBalaoY.setOrigin(0, 0)
      this.textoBalaoY.setText(texto)

      this.time.delayedCall(tempoExibicao, () => {
        this.balaoY.visible = false
        this.textoBalaoY.setText('')
      })
    }

    // Associe a função exibirBalaoT ao pressionar a tecla "G"
    this.input.keyboard.on('keydown-H', function (event) {
      // Chame a função exibirBalaoT com o texto desejado e o tempo de exibição
      exibirBalaoY.call(this, 'Pressionada a tecla H', 6000)
    }, this)

    this.game.socket.on('artefatos-notificar', (artefatos) => {
      if (artefatos.moeda) {
        this.game.scoreMoeda.score = 0
        for (let i = 0; i < artefatos.moeda.length; i++) {
          if (!artefatos.moeda[i]) {
            this.moeda[i].objeto.disableBody(true, true)
            this.game.scoreMoeda.score++
          }
          this.textoMoeda.setText(`albuns: ${this.game.scoreMoeda.score}`)
        }
      }
    })

    this.game.socket.on('estado-notificar', ({ x, y, frame }) => {
      this.personagemRemoto.x = x
      this.personagemRemoto.y = y
      this.personagemRemoto.setFrame(frame)
    })

    /* mapa */
    this.layerfundo.setCollisionByProperty({ collides: true })
    this.layeratras2.setCollisionByProperty({ collides: true })
    this.layeratras.setCollisionByProperty({ collides: true })
    this.layerblocos.setCollisionByProperty({ collides: true })
    this.layerdano.setCollisionByProperty({ collides: true })
    this.layerfrente.setCollisionByProperty({ collides: true })

    // this.physics.add.collider(this.personagem, this.layerfundo)
    // this.physics.add.collider(this.personagem, this.layeratras2)
    // this.physics.add.collider(this.personagem, this.layeratras)
    this.physics.add.collider(this.personagem, this.layerblocos)
    this.physics.add.collider(this.personagem, this.layerdano)
    // this.physics.add.collider(this.personagem, this.layerfrente)

    this.physics.add.collider(this.personagem, this.moneysGroup, this.coletar_money, null, this)

    this.personagem.vida = 1
    this.vidasSpritesheet = this.add.sprite(400, 397, 'vida', 0)
    this.vidasSpritesheet.setScrollFactor(0)

    this.anims.create({
      key: 'perdeuVida',
      frames: this.anims.generateFrameNumbers('vidasSpritesheetKey', { start: 1, end: 4 }),
      frameRate: 10, // Ajuste a velocidade da animação conforme necessário
      repeat: 0, // Não repete a animação
      hideOnComplete: true // Oculta o spritesheet quando a animação estiver completa
    })

    this.physics.add.collider(this.personagem, this.layerdano, () => {
      this.personagem.vida--

      if (this.personagem.vida <= 0) {
        this.vidasSpritesheet.play('perdeuVida')
        this.load.shader('desaturateShader', '../js/desaturateShader.frag')
        this.cameras.main.setShader('desaturateShader')
        this.game.scene.stop('mapa1')
        this.game.scene.start('gameOver')
      }
    })

    this.timerText = this.add.text(20, -5, 'Hora', {
      fontFamily: 'Silkscreen',
      fontSize: '25px',
      stroke: '#000000',
      strokeThickness: 4,
      fill: '#ffffff'
    }).setScrollFactor(0)
  }

  update () {
    this.timerText.setText(this.game.data_formatada)

    // Atualize a posição do balaoT com base na posição do personagem
    this.balaoT.x = this.personagem.x - 400 // Ajuste conforme necessário
    this.balaoT.y = this.personagem.y - 250 // Ajuste conforme necessário

    this.textoBalaoT.x = this.balaoT.x + 130 // Ajuste conforme necessário
    this.textoBalaoT.y = this.balaoT.y + 50 // Ajuste conforme necessário

    // Atualize a posição do balaoT com base na posição do personagem
    this.balaoY.x = this.personagem.x - 400 // Ajuste conforme necessário
    this.balaoY.y = this.personagem.y - 250 // Ajuste conforme necessário

    this.textoBalaoY.x = this.balaoY.x + 130 // Ajuste conforme necessário
    this.textoBalaoY.y = this.balaoY.y + 50 // Ajuste conforme necessário

    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        x: this.personagem.x,
        y: this.personagem.y,
        frame: this.personagem.frame.name
      })
    } catch (error) {
      console.error(error)
    }
  }

  coletar_moeda (personagem, moeda) {
    this.moedaSom.play()
    moeda.disableBody(true, true)
    this.game.scoreMoeda.score++
    this.textoMoeda.setText(`albuns: ${this.game.scoreMoeda.score}`)
    this.game.socket.emit('artefatos-publicar', this.game.sala, {
      moeda: this.moeda.map((moeda) => moeda.objeto.visible)
    })
  }

  FimdeJogo () {
    this.tempo = 2
    this.relogio = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.tempo--
        if (this.tempo === 0) {
          this.relogio.destroy()

          // Verificar se o número de moedas é <= 60
          if (this.game.scoreMoeda.score < 60) {
            // Moedas <= 60, iniciar a cena 'gameOver'
            this.scene.stop('mapa1')
            this.scene.start('gameOver')
          } else {
            // Moedas > 60, iniciar a cena 'gameWin'
            this.scene.stop('mapa1')
            this.scene.start('gameWin')
          }
        }
      },
      callbackScope: this,
      loop: true
    })
  }

  gameOver () {
    this.trilha.stop()
    this.gameOverSom = this.sound.add('gameOverSom')
    this.gameOverSom.play()
    this.gameOverSom.loop = true
    this.game.scene.stop('mapa1')
    this.game.scene.start('gameOver')
  }

  gameWin () {
    this.trilha.stop()
    this.gameWinSom = this.sound.add('crianças')
    this.gameWinSom.play()
    this.game.scene.stop('mapa1')
    this.game.scene.start('gameWin')
  }
}
