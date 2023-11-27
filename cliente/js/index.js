import config from './config.js'
import abertura from './abertura.js'
import sala from './sala.js'
import mapa1 from './mapa1.js'
import gameOver from './gameOver.js'
import gameWin from './gameWin.js'

/* global Phaser */
class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.jogadores = {}

    let iceServers
    if (window.location.host === 'feira-de-jogos.sj.ifsc.edu.br') {
      /* global io */
      this.socket = io.connect({ path: '/adcipt20232/socket.io/' })
      iceServers = [
        {
          urls: 'stun:feira-de-jogos.sj.ifsc.edu.br'
        },
        {
          urls: 'turns:feira-de-jogos.sj.ifsc.edu.br',
          username: 'adcipt',
          credential: 'adcipt20232'
        }
      ]
    } else {
      this.socket = io()
      iceServers = [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }
    this.iceServers = { iceServers }
    this.audio = document.querySelector('audio')

    this.socket.on('connect', () => {
      console.log('Conectado ao servidor!')
    })

    this.scoreMoeda = {
      score: 0
    }

    this.scene.add('abertura', abertura)
    this.scene.add('sala', sala)
    this.scene.add('mapa1', mapa1)
    this.scene.add('gameOver', gameOver)
    this.scene.add('gameWin', gameWin)

    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
