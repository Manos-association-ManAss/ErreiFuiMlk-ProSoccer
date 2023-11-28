export default class gameOver extends Phaser.Scene {
  constructor () {
    super('gameOver')
  }

  preload () {
    this.load.spritesheet('gameOver', './assets/gameOver/gameOver.png', {
      frameWidth: 800, // Largura de cada frame em pixels
      frameHeight: 450 // Altura de cada frame em pixels
    })
  }

  create () {
    // Adicione um spritesheet em vez de uma imagem simples
    const gameOverSpritesheet = this.add.sprite(400, 225, 'gameOverSheet')

    // Defina a animação para o spritesheet
    this.anims.create({
      key: 'gameOverAnimation', // Nome da animação
      frames: this.anims.generateFrameNumbers('gameOver'), // Gera frames do spritesheet
      frameRate: 1, // Taxa de quadros por segundo
      repeat: -1 // -1 para repetição infinita
    })

    // Inicie a animação
    gameOverSpritesheet.anims.play('gameOverAnimation')

    // Adicione um evento de clique ao spritesheet
    gameOverSpritesheet.setInteractive()
    gameOverSpritesheet.on('pointerdown', () => {
      // Quando o spritesheet for clicado, transiciona para a cena 'abertura'
      this.scene.start('abertura')
    })
  }

  update () { }
}
