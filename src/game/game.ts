import Player       from '../player/player'
import Bot          from './bot'
import * as UUID    from 'uuid/v4'
import async        from 'async'
import { post }     from '../util/util'

export default class Game {
  public id:      string
  public bots:    Array<Bot>
  public alive:   Array<Bot>
  public turn:    number

  constructor(players: Array<Player>) {
    this.id = UUID()
    this.turn = 0
    this.bots = []
    players.forEach(this.addBot)
  }

  //===========================
  //     Core Game Loop
  //===========================
  start() {
    let startCallbacks = []

    this.bots.forEach((bot) => {
      startCallbacks.push(
        post(`${bot.url}/start`, {
          game: {
            id: this.id
          }
        })
        .then(data => {
          bot.alive = true
        })
        .catch(e => {
          console.log(`ERR: start() - ${e}`)
        })
      )
    })

    return Promise.all(startCallbacks).then(() => {
      this.play()
    })
  }

  play() {
    async.whilst(
      () => this.isComplete(),
      (done) => {
        // Game loop
      },
      (err, result) => {
        // Done callback
      }
    )
  }

  //===========================
  //     Setup Functions
  //===========================
  addBot(player: Player) {

  }

  //===========================
  //      State Functions
  //===========================
  isComplete() {
    return (this.bots.reduce((a, c) => c.alive === true ? ++a : a, 0)) <= 1
  }

}