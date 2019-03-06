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
    players.forEach((player) => this.addBot(player))
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
    return new Promise((resolve, reject) => {
      let complete = false,
          result
      async.whilst(
        () => !complete,
        (done) => {
          console.log('play() - Run Turn')
          // Game loop
          if(this.isComplete()) {
            complete = true
            result = this.endGame()
            return done(null, result)
          }
          let movePromises = []

          this.getAliveBots().forEach(bot => {
            let state = this.getGameState(bot)
            movePromises.push(
              post(`${bot.url}/move`, state)
              .then(({ move }) => {
                return {
                  bot,
                  move,
                  didTimeout: false
                }
              })
              .catch(e => {
                console.log('Error')
                return {
                  bot,
                  move: null,
                  didTimeout: true
                }
              })
              )
            })

            return Promise.all(movePromises)
            .then(moveData => {
              // Apply the moves
              moveData.forEach(({ bot, move }) => {
                // Run player's turn based on their request response
                this.doTurn(bot, move)
              });
            })
            .then(() => {
              setTimeout(() => done(), 20)
            })
            .catch(e => {
              console.log(`ERR: play() - ${e}`)
            })
        },
        (err, result) => {
          // Done callback
          if (err) {
            return reject(err);
          }
          return resolve(result);
        }
      )
    })
  }

  //===========================
  //     Setup Functions
  //===========================
  addBot(player: Player) {
    this.bots.push(new Bot(player))
  }

  //===========================
  //    Teardown Functions
  //===========================
  endGame() {

  }

  //===========================
  //      State Functions
  //===========================
  doTurn(bot: Bot, move) {

  }

  getGameState(bot: Bot) {
    return {data: 'waow'}
  }

  isComplete(): boolean {
    return this.getAliveBots().length <= 1
  }

  getAliveBots(): Array<Bot> {
    return this.bots.filter(bot => bot.alive)
  }

}