import Player from '../player/player'
import Game   from './game'

class GameManager {
  public players:   {[key: string]: Player}
  public games:     {[key: string]: Game}

  constructor() {
    this.players  = {}
    this.games    = {}
  }

  init(players: Array<Player>) {
    // Add all players to the game manager
    players.forEach((player, index) => this.addPlayer(player, index))
  }

  //===========================
  //     Player Functions
  //===========================
  addPlayer(player, index) {
    this.players[player.id] = player
  }

  getAvailablePlayers() {
    // Return a random subset of players not currently in games
    return Object.keys(this.players).map(key => this.players[key]).filter((player) => !player.inGame);
  }

  //===========================
  //      Game Functions
  //===========================
  createGame(players: Array<Player>) {
    let game = new Game(players)
    this.games[game.id] = game
    return game
  }

}

export default new GameManager()