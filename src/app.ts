import * as express    from 'express'
import * as bodyParser from 'body-parser'

import GameManager      from './game/game_manager'
import PlayerManager    from './player/player_manager'

import * as gameController from './controllers/game'

const app = express()
app.set("port", process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/game',gameController.getGame)

GameManager.init(PlayerManager.getPlayers())
let gamePlayers = GameManager.getAvailablePlayers()
let game = GameManager.createGame(gamePlayers)
game.start()

export default app
