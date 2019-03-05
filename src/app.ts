import * as express    from 'express'
import * as bodyParser from 'body-parser'

import GameManager from './game/manager'

import * as gameController from './controllers/game'

const app = express()
app.set("port", process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/game',gameController.getGame)

GameManager.init()

export default app
