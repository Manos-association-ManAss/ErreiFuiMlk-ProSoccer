export default class gameOver extends Phaser.Scene {
  constructor () {
    super('gameOver')
  }

  preload () {
    this.load.image('gameOver', './assets/gameOver/gameOver.png')
  }

  create () {
    const gameOverImage = this.add.image(400, 300, 'gameOver');
    gameOverImage.setInteractive();

    // Adiciona um evento de clique à imagem
    gameOverImage.on('pointerdown', () => {
      // Quando a imagem for clicada, transiciona para a cena 'abertura'
      this.scene.start('abertura');
    })
  }

  update () { 
      
    }
}