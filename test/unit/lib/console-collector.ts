export class ConsoleCollector {
  private log: string[]

  constructor() {
    this.log = []
  }

  logger(...args) {
    this.log.push(args.join(''))
  }

  history() {
    return this.log
  }
}

export default ConsoleCollector