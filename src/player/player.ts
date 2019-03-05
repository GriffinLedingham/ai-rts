import * as UUID from 'uuid/v4'

export default class Player {
  public id:    string
  public url:   string

  constructor() {
    this.id = UUID()
  }
}