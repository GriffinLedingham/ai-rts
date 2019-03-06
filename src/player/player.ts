import * as UUID from 'uuid/v4'

export default class Player {
  public id:      string
  public url:     string
  public inGame:  boolean

  constructor(url) {
    this.id     = UUID()
    this.inGame = false
    this.url    = url
  }
}