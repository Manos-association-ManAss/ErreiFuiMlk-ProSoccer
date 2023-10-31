export default class mapa1 extends Phaser.Scene {
  constructor () {
    super('mapa1')
  }

  preload () {
    /* mapa */
    this.load.tilemapTiledJSON('mapa', '../assets/mapa/mapa.json')
    this.load.image('Tileset', '../assets/mapa/MapaTiles.png')

    /* personagem */
    this.load.spritesheet('YE', '../assets/YE.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('tyler', '../assets/tyler.png', {
      frameWidth: 47,
      frameHeight: 64
    })
    this.load.spritesheet('YE-pulo', '../assets/ye-pulo.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('tyler-pulo', '../assets/tyler-pulo.png', {
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

    this.load.audio('trilha', './assets/allofthelights.mp3')
  }

  create () {
    this.trilha = this.sound.add('trilha')
    this.trilha.loop = true
    this.trilha.play()

    /* mapa */
    this.tilemapMapa = this.make.tilemap({
      key: 'mapa'
    })

    this.tilesetTile1 = this.tilemapMapa.addTilesetImage('Tileset')

    this.layerfundo = this.tilemapMapa.createLayer('fundo', [this.tilesetTile1])
    this.layeratras2 = this.tilemapMapa.createLayer('atras2', [this.tilesetTile1])
    this.layeratras = this.tilemapMapa.createLayer('atras', [this.tilesetTile1])
    this.layerblocos = this.tilemapMapa.createLayer('blocos', [this.tilesetTile1])
    this.layerfrente = this.tilemapMapa.createLayer('frente', [this.tilesetTile1])

    /* multiplayer */
    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'YE'
      this.remoto = 'tyler'
      this.personagem = this.physics.add.sprite(1000, 2000, this.local, 18)
      this.cameras.main.startFollow(this.personagem)
      this.personagemRemoto = this.add.sprite(1184, -80, this.remoto, 18)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'tyler'
      this.remoto = 'YE'
      this.personagemRemoto = this.add.sprite(-350, -80, this.remoto, 18)
      this.personagem = this.physics.add.sprite(1184, -80, this.local, 18)
      this.cameras.main.startFollow(this.personagem)

      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          this.game.localConnection = new RTCPeerConnection(this.game.ice_servers)

          this.game.localConnection.onicecandidate = ({ candidate }) =>
            candidate && this.game.socket.emit('candidate', this.game.sala, candidate)

          this.game.localConnection.ontrack = ({ streams: [stream] }) =>
            this.game.audio.srcObject = stream

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

      this.game.remoteConnection.onicecandidate = ({ candidate }) =>
        candidate && this.game.socket.emit('candidate', this.game.sala, candidate)

      this.game.remoteConnection.ontrack = ({ streams: [midia] }) =>
        this.game.audio.srcObject = midia

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
        start: 20,
        end: 33
      }),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'YE-pulo',
      frames: this.anims.generateFrameNumbers('YE-pulo', {
        start: 0,
        end: 3
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'YE-pulou',
      frames: this.anims.generateFrameNumbers('YE-pulo', {
        start: 4,
        end: 7
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'tyler-direita',
      frames: this.anims.generateFrameNumbers('tyler', {
        start: 0,
        end: 35
      }),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'tyler-esquerda',
      frames: this.anims.generateFrameNumbers('tyler', {
        start: 36,
        end: 71
      }),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'tyler-paradoD',
      frames: this.anims.generateFrameNumbers('tyler', {
        start: 72,
        end: 77
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'tyler-paradoE',
      frames: this.anims.generateFrameNumbers('tyler', {
        start: 78,
        end: 83
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'tyler-pulo',
      frames: this.anims.generateFrameNumbers('tyler-pulo', {
        start: 0,
        end: 3
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({
      key: 'tyler-pulou',
      frames: this.anims.generateFrameNumbers('tyler-pulo', {
        start: 4,
        end: 6
      }),
      frameRate: 3,
      repeat: -1
    })

    this.anims.create({})

    /* botão pra direita */
    this.direita = this.add.sprite(190, 400, 'direita', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('YE-direita', true)
        this.personagem.setVelocityX(200)
        this.personagemRemoto.anims.play('tyler-direita', true)
        this.personagemRemoto.setVelocityX(200)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('YE-paradoD')
        this.personagem.setVelocityX(0)
        this.personagemRemoto.anims.play('tyler-paradoD')
        this.personagemRemoto.setVelocityX(0)
      })

    /* botão pra esquerda */
    this.esquerda = this.add.sprite(90, 397, 'esquerda', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('YE-esquerda', true)
        this.personagem.setVelocityX(-200)
        this.personagemRemoto.anims.play('tyler-esquerda', true)
        this.personagemRemoto.setVelocityX(-200)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('YE-paradoE')
        this.personagem.setVelocityX(0)
        this.personagemRemoto.anims.play('tyler-paradoE')
        this.personagemRemoto.setVelocityX(0)
      })

    /* botão pra cima */
    this.cima = this.add.sprite(730, 397, 'cima', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        if (this.personagem.body.blocked.down) {
          this.personagem.anims.play('YE-pulo', true)
          this.personagem.setVelocityY(-500)
        }
        if (this.personagem.body.blocked.down) {
          this.personagemRemoto.anims.play('tyler-pulo', true)
          this.personagemRemoto.setVelocityY(-500)
        }
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('YE-pulou')
        this.cima.setFrame(0)
        this.personagemRemoto.anims.play('tyler-pulou')
      })

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
  }

  update () { }
}
