import config from './config.js'
import abertura from './abertura.js'
import sala from './sala.js'
import mapa1 from './mapa1.js'
import gameOver from './gameOver.js'
import gameWin from './gameWin.js'
import senha from './senha.js'

/* global Phaser */
class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.id = 3
    this.valor = 100

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
    this.scene.add('senha', senha)

    this.data = new Date('2024-10-01T00:02:25.000')
    this.data_formatada = ''
    setInterval(() => {
      this.data = new Date(this.data.getTime() - 1000) // Incrementa em 1 segundo o relógio
      this.data_formatada =
        (this.data.getMinutes() < 10 ? '0' : '') + // Adiciona 0 quando necessário
        this.data.getMinutes() +
        ':' +
        (this.data.getSeconds() < 10 ? '0' : '') + // Adiciona 0 quando necessário
        this.data.getSeconds()

      /* Verifica se já chegou a meia noite */
      // this.fimDoJogo = new Date("2024-01-01T00:00:00.000");
      this.fimDoJogo = new Date('2024-10-01T00:00:00.000')
      if (this.data.getTime() === this.fimDoJogo.getTime()) {
        this.scene.stop('mapa1')
        this.scene.start('gameOver')
      }
    }, 1000)

    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
