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
    players.forEach(this.addPlayer)
  }

  //===========================
  //     Player Functions
  //===========================
  addPlayer(player, index) {
    this.players[player.id] = player
  }

  getGameParticipants() {
    // Return a random subset of players not currently in games
    return []
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