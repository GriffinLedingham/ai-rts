import * as UUID    from 'uuid/v4'
import Player from '../player/player';

export default class Bot {
    public id:          string
    public playerId:    string
    public url:         string
    public alive:       boolean

    constructor(player: Player) {
        this.id = UUID()
        this.playerId = player.id
        this.url = player.url
        this.alive = false
    }

    update() {

    }
}