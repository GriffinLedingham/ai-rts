import UUID from 'uuid/v4'

export default class Player {
  public id: string

  constructor() {
    this.id = UUID()
  }
}