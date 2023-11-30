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
    this.load.spritesheet('tyler-poderD', './assets/projetilT.png', {
      frameWidth: 64,
      frameHeight: 32
    })
    this.load.spritesheet('tyler-poderE', './assets/projetilT2.png', {
      frameWidth: 64,
      frameHeight: 32
    })
    this.load.spritesheet('ye-poderD', './assets/projetilY.png', {
      frameWidth: 41,
      frameHeight: 32
    })
    this.load.spritesheet('ye-poderE', './assets/projetilY2.png', {
      frameWidth: 41,
      frameHeight: 32
    })
    this.load.spritesheet('vida', './assets/vida.png', {
      frameWidth: 48,
      frameHeight: 48
    })
    this.load.spritesheet('balaoT', './assets/balaoT.png', {
      frameWidth: 800,
      frameHeight: 450
    })
    this.load.spritesheet('balaoY', './assets/balaoY.png', {
      frameWidth: 800,
      frameHeight: 450
    })

    /* vilão */
    this.load.spritesheet('bike', './assets/vilao/bike.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('cudi', './assets/vilao/cudi.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('drake', './assets/vilao/drake.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('graduation', './assets/vilao/graduation.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('pau', './assets/vilao/pau.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('terra', './assets/vilao/terra.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('twitter', './assets/vilao/twitter.png', {
      frameWidth: 64,
      frameHeight: 64
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
    this.load.spritesheet('poderD', './assets/poderD.png', {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('poderE', './assets/poderE.png', {
      frameWidth: 32,
      frameHeight: 32
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
      frameWidth: 28,
      frameHeight: 28
    })

    this.load.audio('trilha', './assets/sons/allofthelights.mp3')
    this.load.audio('moedaSom', './assets/sons/moedaSom.mp3')
    this.load.audio('gameOverSom', './assets/sons/gameOverSom.mp3')
  }

  create () {
    this.timer = this.time.delayedCall(10000, this.gameOver, [], this)
    this.timerText = this.add.text(10, 10, 'Tempo: 10', { fontSize: '32px', fill: '#fff' })

    this.trilha = this.sound.add('trilha')
    this.trilha.loop = true
    this.trilha.volume = 0.2
    this.trilha.play()
    this.input.addPointer(3)
    this.moedaSom = this.sound.add('moedaSom')

    this.timer = this.time.addEvent({
      delay: 1000, // atraso em milissegundos
      callback: this.atualizarTempo, // função de retorno de chamada
      callbackScope: this,
      loop: true // repetir
    })

    /* mapa */
    this.tilemapMapa = this.make.tilemap({
      key: 'mapa'
    })

    this.tilesetTile1 = this.tilemapMapa.addTilesetImage('MapaTiles')

    this.layerfundo = this.tilemapMapa.createLayer('fundo', [this.tilesetTile1])
    this.layeratras2 = this.tilemapMapa.createLayer('atras2', [this.tilesetTile1])
    this.layeratras = this.tilemapMapa.createLayer('atras', [this.tilesetTile1])
    this.layerblocos = this.tilemapMapa.createLayer('blocos', [this.tilesetTile1])
    this.layerfrente = this.tilemapMapa.createLayer('frente', [this.tilesetTile1])

    /* multiplayer + vida de cada jogador */
    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'YE'
      this.remoto = 'tyler'
      this.personagem = this.physics.add.sprite(2028, 2544, this.local, 18)
      this.personagemRemoto = this.add.sprite(2084, 2544, this.remoto, 18)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'tyler'
      this.remoto = 'YE'
      this.personagemRemoto = this.add.sprite(2084, 2544, this.remoto, 18)
      this.personagem = this.physics.add.sprite(2028, 2544, this.local, 18)

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
        x: 900,
        y: -60
      },
      {
        x: 950,
        y: -60
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

    this.textoMoeda = this.add.text(20, 150, `moedas: ${this.game.scoreMoeda.score}`, {
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
        this.personagem.setVelocityX(200)
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
        this.personagem.setVelocityX(-200)
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
          this.personagem.setVelocityY(-500)
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
          this.textoMoeda.setText(`moeda: ${this.game.scoreMoeda.score}`)
        }
      }
    })

    /* vilões */
    const viloesConfig = [
      { key: 'bike', x: 200, y: 500, moveDistance: 100, moveDuration: 2000 },
      { key: 'cudi', x: 400, y: 500, moveDistance: 150, moveDuration: 3000 },
      { key: 'drake', x: 600, y: 500, moveDistance: 120, moveDuration: 2500 },
      { key: 'graduation', x: 600, y: 500, moveDistance: 120, moveDuration: 2500 },
      { key: 'pau', x: 600, y: 500, moveDistance: 120, moveDuration: 2500 },
      { key: 'terra', x: 600, y: 500, moveDistance: 120, moveDuration: 2500 },
      { key: 'twitter', x: 600, y: 500, moveDistance: 120, moveDuration: 2500 }
    ]

    viloesConfig.forEach(({ key, x, y, moveDistance, moveDuration }) => {
      const vilao = this.physics.add.sprite(x, y, key)
      this.physics.world.enable(vilao)

      // Configurando colisão com o layerfundo e o vilao
      this.physics.add.collider([this.layerfundo, vilao])

      // Adicionando movimento automático para o vilao
      this.tweens.add({
        targets: vilao,
        x: vilao.x + moveDistance,
        duration: moveDuration,
        ease: 'Linear',
        yoyo: true,
        repeat: -1
      })
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
    this.layerfundo.setCollisionByProperty({ collides: true })

    // this.physics.add.collider(this.personagem, this.layerfrente)
    this.physics.add.collider(this.personagem, this.layerblocos)
    // this.physics.add.collider(this.personagem, this.layeratras)
    // this.physics.add.collider(this.personagem, this.layeratras2)
    // this.physics.add.collider(this.personagem, this.layerfundo)

    /* vilões */
    this.physics.add.collider(this.personagem, this.bike)
    this.physics.add.collider(this.personagem, this.cudi)
    this.physics.add.collider(this.personagem, this.drake)
    this.physics.add.collider(this.personagem, this.graduation)
    this.physics.add.collider(this.personagem, this.pau)
    this.physics.add.collider(this.personagem, this.terra)
    this.physics.add.collider(this.personagem, this.twitter)

    this.physics.add.collider(this.personagem, this.moneysGroup, this.coletar_money, null, this)

    this.personagem.vida = 1
    this.vidasSpritesheet = this.add.sprite(400, 397, 'vida', 0)
    this.vidasSpritesheet.setScrollFactor(0)

    this.anims.create({
      key: 'perdeuVida',
      frames: this.anims.generateFrameNumbers('vidasSpritesheetKey', { start: 1, end: 13 }),
      frameRate: 10, // Ajuste a velocidade da animação conforme necessário
      repeat: 0, // Não repete a animação
      hideOnComplete: true // Oculta o spritesheet quando a animação estiver completa
    })

    this.physics.add.collider(this.personagem, this.vilao, () => {
      this.personagem.vida--

      if (this.personagem.vida <= 0) {
        this.vidasSpritesheet.play('perdeuVida')
        this.load.shader('desaturateShader', '../js/desaturateShader.frag')
        this.cameras.main.setShader('desaturateShader')
        this.game.scene.stop('mapa1')
        this.game.scene.start('gameOver')
      }
    })
  }

  update () {
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

    this.timerText.setText('Tempo: ' + (this.timer.delay - this.timer.elapsed) / 1000)
  }

  coletar_moeda (personagem, moeda) {
    this.moedaSom.play()
    moeda.disableBody(true, true)
    this.game.scoreMoeda.score++
    this.textoMoeda.setText(`moeda: ${this.game.scoreMoeda.score}`)
    this.game.socket.emit('artefatos-publicar', this.game.sala, {
      moeda: this.moeda.map((moeda) => moeda.objeto.visible)
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
}
