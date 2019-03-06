import Player from "./player";

class PlayerManager {
    constructor() {

    }

    getPlayers() {
        return [
            new Player('http://localhost:5001'),
            new Player('http://localhost:5001')
        ]
    }
}

export default new PlayerManager()