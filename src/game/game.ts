import Player from '../classes/player'

export default class Game {
  public players: {[key: string]: Player}
  public turn:    number

  constructor(playerOne: Player, playerTwo: Player) {
    this.turn = 0
    this.players[playerOne.id] = playerOne
    this.players[playerTwo.id] = playerTwo
  }

  start() {
    setTimeout(this.update(),1000)
  }

  update() {
    console.log('update()')
    setTimeout(this.update(),1000)
  }

  render() {

  }
}