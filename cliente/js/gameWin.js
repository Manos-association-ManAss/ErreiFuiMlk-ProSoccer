export default class GameWin extends Phaser.Scene {
  constructor () {
    super('gameWin')
  }

  init (data) {
    // Certifique-se de que data e data.coinsCollected existam
    // Se não existirem, defina coinsCollected como 0
    const coinsCollected = data && data.coinsCollected ? data.coinsCollected : 0

    // Ajuste da equação para garantir um valor mínimo de 100
    this.creditsConquered = 100 + Math.max(2 * coinsCollected, 0)
  }

  create () {
    // Crie aqui o conteúdo da cena de vitória
    const text = this.add.text(400, 200, `Você venceu!\nCréditos conquistados: ${this.creditsConquered}`, {
      fontSize: '32px',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5)

    // Botão para voltar ao início
    const restartButton = this.add.text(400, 400, 'Voltar ao início', {
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 }
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        // Reinicie o jogo aqui (talvez reinicializando variáveis, resetando posições, etc.)
        this.scene.start('abertura')
      })
  }
}
