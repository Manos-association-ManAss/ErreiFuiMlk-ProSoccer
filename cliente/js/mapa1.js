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
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('tyler', './assets/tyler.png', {
      frameWidth: 47,
      frameHeight: 64
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
    this.load.spritesheet('poder', './assets/poder.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('moeda', './assets/money.png', {
      frameWidth: 28,
      frameHeight: 28
    })

    this.load.audio('trilha', './assets/sons/allofthelights.mp3')
    this.load.audio('moedaSom', './assets/sons/moedaSom.mp3')
  }

  create () {
    this.trilha = this.sound.add('trilha')
    this.trilha.loop = true
    this.trilha.volume = 0.5
    this.trilha.play()
    this.input.addPointer(3)
    this.moedaSom = this.sound.add('moedaSom')
    let poderTimer

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
      this.personagem = this.physics.add.sprite(1000, -80, this.local, 18)
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
      this.cameras.main.startFollow(this.personagem)
      this.personagemRemoto = this.add.sprite(1000, -80, this.remoto, 18)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'tyler'
      this.remoto = 'YE'
      this.personagemRemoto = this.add.sprite(1000, -80, this.remoto, 18)
      this.personagem = this.physics.add.sprite(1000, -80, this.local, 18)
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
      this.cameras.main.startFollow(this.personagem)

      function reduzirVida (personagem) {
        personagem.vida--

        if (personagem.vida <= 0) {
          // A vida é zero ou menos, execute a lógica do game over aqui
          // Por exemplo, você pode redirecionar para a cena 'gameOver'
          this.scene.start('gameOver')
        } else {
          // Ainda há vida, você pode realizar outras ações aqui
          console.log(`Vida restante: ${personagem.vida}`)
        }
      }
      this.physics.add.collider(this.personagem, this.vilao, () => {
        // Colisão entre personagem e vilão
        reduzirVida(this.personagem, this.vidasSpritesheet)

        this.load.shader('desaturateShader', '../js/desaturateShader.frag')

        // Reproduz a animação quando o jogador morrer
        if (this.personagem.vida <= 0) {
          this.vidasSpritesheet.play('perdeuVida')

          // retirar a saturação das cores
          this.cameras.main.setShader('desaturateShader')

          // Define a posição do jogador morto na tela do jogador ativo
          this.personagemRemoto.x = this.personagem.x
          this.personagemRemoto.y = this.personagem.y

          this.personagemRemoto.setScrollFactor(0)

          /* caso queira desativar o shader
          this.cameras.main.removeShader() */
        }
      })

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
        end: 30
      }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-pulou',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 31,
        end: 32
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
    this.esquerda = this.add.sprite(90, 397, 'esquerda', 0)
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
    this.cima = this.add.sprite(730, 397, 'cima', 0)
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

    /* botão de poder pra Direita */
    this.poder = this.add.sprite(630, 400, 'poder', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        // Verificar se o timer está completo (permite ação) antes de prosseguir
        if (!poderTimer || poderTimer.getProgress() === 1) {
          this.poder.setFrame(1)
          this.personagem.anims.play('personagem-poderD', true)
          this.personagem.setVelocityX(0)

          this.personagem.once('animationcomplete-personagem-poderD', () => {
            // Ativar habilidade logo após a animação ser concluída
            ativarHabilidade.call(this)

            // Reiniciar animação do personagem para a posição parada
            this.personagem.anims.play('personagem-paradoD')
          })

          // Iniciar o timer após a ação
          poderTimer = this.time.addEvent({ delay: 250, callback: () => { }, loop: false })
        }
      })

      .on('pointerup', () => {
        this.poder.setFrame(0)
        if (this.personagem.anims.currentAnim.key !== 'personagem-poderD') {
          this.personagem.anims.play('personagem-paradoD')
          this.personagem.setVelocityX(0)
        }
      })

    function ativarHabilidade () {
      // Criar um projétil
      let projeteilSpritesheetKey
      if (this.local === 'YE') {
        projeteilSpritesheetKey = 'ye-poderD'
      } else if (this.local === 'tyler') {
        projeteilSpritesheetKey = 'tyler-poderD'
      }

      // Corrigir a posição inicial do projétil para evitar sobreposição com o personagem
      const projeteilLocal = this.physics.add.sprite(this.personagem.x, this.personagem.y + 5, projeteilSpritesheetKey)
      projeteilLocal.setVelocityX(800) // Mudar para 800 para ir para a direita

      // Configurar animação para tocar os frames de 0 a 6 em loop
      projeteilLocal.anims.create({
        key: 'projeteilLoop',
        frames: this.anims.generateFrameNumbers(projeteilSpritesheetKey, { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1 // Repetir indefinidamente
      })

      // Configurar animação para tocar os frames de 6 a 10 quando colidir com layerfundo
      projeteilLocal.anims.create({
        key: 'projeteilCollision',
        frames: this.anims.generateFrameNumbers(projeteilSpritesheetKey, { start: 6, end: 10 }),
        frameRate: 10,
        repeat: 0 // Repetir uma vez
      })

      // Restante do código relacionado ao projétil (colisões, gravidade, remoção, etc.)

      projeteilLocal.anims.play('projeteilLoop')

      // Configurar colisão do projétil com o layerfundo
      this.physics.add.collider(projeteilLocal, this.layerfundo, () => {
        projeteilLocal.anims.play('projeteilCollision')
        projeteilLocal.once('animationcomplete', () => {
          projeteilLocal.destroy()
        })
      })

      // Configurar a gravidade apenas enquanto o projétil estiver visível
      projeteilLocal.body.setAllowGravity(false)

      // Remover o projétil da simulação de física quando não estiver mais visível
      projeteilLocal.on('animationcomplete', () => {
        projeteilLocal.destroy()
      })
    }

    /* botão de poder pra Esquerda */
    this.poderE = this.add.sprite(530, 400, 'poder', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        // Verificar se o timer está completo (permite ação) antes de prosseguir
        if (!poderTimer || poderTimer.getProgress() === 1) {
          this.poderE.setFrame(1)
          this.personagem.anims.play('personagem-poderE', true)
          this.personagem.setVelocityX(0)

          this.personagem.once('animationcomplete-personagem-poderE', () => {
            // Ativar habilidade logo após a animação ser concluída
            ativarHabilidadeEsquerda.call(this)

            // Reiniciar animação do personagem para a posição parada
            this.personagem.anims.play('personagem-paradoE')
          })

          // Iniciar o timer após a ação
          poderTimer = this.time.addEvent({ delay: 250, callback: () => { }, loop: false })
        }
      })

      .on('pointerup', () => {
        this.poderE.setFrame(0)
        if (this.personagem.anims.currentAnim.key !== 'personagem-poderE') {
          this.personagem.anims.play('personagem-paradoE')
          this.personagem.setVelocityX(0)
        }
      })

    function ativarHabilidadeEsquerda () {
      // Criar um projétil
      let projeteilSpritesheetKey
      if (this.local === 'YE') {
        projeteilSpritesheetKey = 'ye-poderE'
      } else if (this.local === 'tyler') {
        projeteilSpritesheetKey = 'tyler-poderE'
      }

      // Corrigir a posição inicial do projétil para evitar sobreposição com o personagem
      const projeteilLocal = this.physics.add.sprite(this.personagem.x, this.personagem.y + 5, projeteilSpritesheetKey)
      projeteilLocal.setVelocityX(-800) // Mudar para -800 para ir para a esquerda

      // Configurar animação para tocar os frames de 0 a 6 em loop
      projeteilLocal.anims.create({
        key: 'projeteilLoop',
        frames: this.anims.generateFrameNumbers(projeteilSpritesheetKey, { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1 // Repetir indefinidamente
      })

      // Configurar animação para tocar os frames de 6 a 10 quando colidir com layerfundo
      projeteilLocal.anims.create({
        key: 'projeteilCollision',
        frames: this.anims.generateFrameNumbers(projeteilSpritesheetKey, { start: 6, end: 10 }),
        frameRate: 10,
        repeat: 0 // Repetir uma vez
      })

      // Restante do código relacionado ao projétil (colisões, gravidade, remoção, etc.)

      projeteilLocal.anims.play('projeteilLoop')

      // Configurar colisão do projétil com o layerfundo
      this.physics.add.collider(projeteilLocal, this.layerfundo, () => {
        projeteilLocal.anims.play('projeteilCollision')
        projeteilLocal.once('animationcomplete', () => {
          projeteilLocal.destroy()
        })
      })

      // Configurar a gravidade apenas enquanto o projétil estiver visível
      projeteilLocal.body.setAllowGravity(false)

      // Remover o projétil da simulação de física quando não estiver mais visível
      projeteilLocal.on('animationcomplete', () => {
        projeteilLocal.destroy()
      })
    }

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
    this.layerfrente.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.personagem, this.layerfrente)
    this.physics.add.collider(this.personagem, this.layerblocos)
    this.physics.add.collider(this.personagem, this.layeratras)
    this.physics.add.collider(this.personagem, this.layeratras2)
    this.physics.add.collider(this.personagem, this.layerfundo)

    /* vilões */
    this.physics.add.collider(this.personagem, this.bike)
    this.physics.add.collider(this.personagem, this.cudi)
    this.physics.add.collider(this.personagem, this.drake)
    this.physics.add.collider(this.personagem, this.graduation)
    this.physics.add.collider(this.personagem, this.pau)
    this.physics.add.collider(this.personagem, this.terra)
    this.physics.add.collider(this.personagem, this.twitter)

    this.physics.add.collider(this.personagem, this.moneysGroup, this.coletar_money, null, this)
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
}
