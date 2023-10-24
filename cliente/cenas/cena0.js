export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    /* mapa */
    this.load.tilemapTiledJSON('mapa', '../assets/mapa/mapa.json')

    this.load.image('tile1', '../assets/mapa/tile_1.png')
    this.load.image('tile2', '../assets/mapa/tile_2.png')
    this.load.image('tile3', '../assets/mapa/tile_3.png')
    this.load.image('tile4', '../assets/mapa/tile_4.png')
    this.load.image('tile5', '../assets/mapa/tile_5.png')
    this.load.image('tile6', '../assets/mapa/tile_6.png')
    this.load.image('tile7', '../assets/mapa/tile_7.png')
    this.load.image('tile8', '../assets/mapa/tile_8.png')
    this.load.image('tile9', '../assets/mapa/tile_9.png')
    this.load.image('tile10', '../assets/mapa/tile_10.png')
    this.load.image('tile11', '../assets/mapa/tile_11.png')
    this.load.image('tile12', '../assets/mapa/tile_12.png')
    this.load.image('tile13', '../assets/mapa/tile_13.png')
    this.load.image('tile14', '../assets/mapa/tile_14.png')
    this.load.image('tile15', '../assets/mapa/tile_15.png')
    this.load.image('tile16', '../assets/mapa/tile_16.png')
    this.load.image('tile17', '../assets/mapa/tile_17.png')
    this.load.image('tile18', '../assets/mapa/tile_18.png')
    this.load.image('tile19', '../assets/mapa/tile_19.png')
    this.load.image('tile20', '../assets/mapa/tile_20.png')
    this.load.image('tile21', '../assets/mapa/tile_21.png')
    this.load.image('tile22', '../assets/mapa/tile_22.png')
    this.load.image('tile23', '../assets/mapa/tile_23.png')
    this.load.image('tile24', '../assets/mapa/tile_24.png')
    this.load.image('tile25', '../assets/mapa/tile_25.png')
    this.load.image('tile26', '../assets/mapa/tile_26.png')
    this.load.image('tile27', '../assets/mapa/tile_27.png')
    this.load.image('tile28', '../assets/mapa/tile_28.png')
    this.load.image('tile29', '../assets/mapa/tile_29.png')
    this.load.image('tile30', '../assets/mapa/tile_30.png')
    this.load.image('tile31', '../assets/mapa/tile_31.png')
    this.load.image('tile32', '../assets/mapa/tile_32.png')
    this.load.image('tile33', '../assets/mapa/tile_33.png')
    this.load.image('tile34', '../assets/mapa/tile_34.png')
    this.load.image('tile35', '../assets/mapa/tile_35.png')
    this.load.image('tile36', '../assets/mapa/tile_36.png')
    this.load.image('tile37', '../assets/mapa/tile_37.png')
    this.load.image('tile38', '../assets/mapa/tile_38.png')
    this.load.image('tile39', '../assets/mapa/tile_39.png')
    this.load.image('tile40', '../assets/mapa/tile_40.png')

    /* personagem */
    this.load.spritesheet('YE', '../assets/YE.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('tyler', '../assets/tyler.png', {
      frameWidth: 47,
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
    this.load.spritesheet('pulo', '../assets/pulo.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    /* mapa */
    this.tilemapLabirinto = this.make.tilemap({
      key: 'labirinto'
    })

    this.tilesetTile1 = this.tilemapLabirinto.addTilesetImage('tile1')
    this.tilesetTile2 = this.tilemapLabirinto.addTilesetImage('tile2')
    this.tilesetTile3 = this.tilemapLabirinto.addTilesetImage('tile3')
    this.tilesetTile4 = this.tilemapLabirinto.addTilesetImage('tile4')
    this.tilesetTile5 = this.tilemapLabirinto.addTilesetImage('tile5')
    this.tilesetTile6 = this.tilemapLabirinto.addTilesetImage('tile6')
    this.tilesetTile7 = this.tilemapLabirinto.addTilesetImage('tile7')
    this.tilesetTile8 = this.tilemapLabirinto.addTilesetImage('tile8')
    this.tilesetTile9 = this.tilemapLabirinto.addTilesetImage('tile9')
    this.tilesetTile10 = this.tilemapLabirinto.addTilesetImage('tile10')
    this.tilesetTile11 = this.tilemapLabirinto.addTilesetImage('tile11')
    this.tilesetTile12 = this.tilemapLabirinto.addTilesetImage('tile12')
    this.tilesetTile13 = this.tilemapLabirinto.addTilesetImage('tile13')
    this.tilesetTile14 = this.tilemapLabirinto.addTilesetImage('tile14')
    this.tilesetTile15 = this.tilemapLabirinto.addTilesetImage('tile15')
    this.tilesetTile16 = this.tilemapLabirinto.addTilesetImage('tile16')
    this.tilesetTile17 = this.tilemapLabirinto.addTilesetImage('tile17')
    this.tilesetTile18 = this.tilemapLabirinto.addTilesetImage('tile18')
    this.tilesetTile19 = this.tilemapLabirinto.addTilesetImage('tile19')
    this.tilesetTile20 = this.tilemapLabirinto.addTilesetImage('tile20')
    this.tilesetTile21 = this.tilemapLabirinto.addTilesetImage('tile21')
    this.tilesetTile22 = this.tilemapLabirinto.addTilesetImage('tile22')
    this.tilesetTile23 = this.tilemapLabirinto.addTilesetImage('tile23')
    this.tilesetTile24 = this.tilemapLabirinto.addTilesetImage('tile24')
    this.tilesetTile25 = this.tilemapLabirinto.addTilesetImage('tile25')
    this.tilesetTile26 = this.tilemapLabirinto.addTilesetImage('tile26')
    this.tilesetTile27 = this.tilemapLabirinto.addTilesetImage('tile27')
    this.tilesetTile28 = this.tilemapLabirinto.addTilesetImage('tile28')
    this.tilesetTile29 = this.tilemapLabirinto.addTilesetImage('tile29')
    this.tilesetTile30 = this.tilemapLabirinto.addTilesetImage('tile30')
    this.tilesetTile31 = this.tilemapLabirinto.addTilesetImage('tile31')
    this.tilesetTile32 = this.tilemapLabirinto.addTilesetImage('tile32')
    this.tilesetTile33 = this.tilemapLabirinto.addTilesetImage('tile33')
    this.tilesetTile34 = this.tilemapLabirinto.addTilesetImage('tile34')
    this.tilesetTile35 = this.tilemapLabirinto.addTilesetImage('tile35')
    this.tilesetTile36 = this.tilemapLabirinto.addTilesetImage('tile36')
    this.tilesetTile37 = this.tilemapLabirinto.addTilesetImage('tile37')
    this.tilesetTile38 = this.tilemapLabirinto.addTilesetImage('tile38')
    this.tilesetTile39 = this.tilemapLabirinto.addTilesetImage('tile39')
    this.tilesetTile40 = this.tilemapLabirinto.addTilesetImage('tile40')

    /* personagem */
    this.personagem = this.physics.add.sprite(400, 225, 'YE')
    this.personagemRemoto = this.physics.add.sprite(200, 225, 'tyler')

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

    this.anims.create({})

    /* botão pra dirieta */
    this.direita = this.add.sprite(190, 400, 'direita', 0)
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
    this.esquerda = this.add.sprite(90, 397, 'esquerda', 0)
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
    this.cima = this.add.sprite(730, 397, 'cima', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        if (this.personagem.body.blocked.down) {
          this.personagem.anims.play('YE-pulo', true)
          this.personagem.setVelocityY(-500)
        }
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        // this.personagem.anims.play('YE-pulou')
      })
  }

  update () { }
}
