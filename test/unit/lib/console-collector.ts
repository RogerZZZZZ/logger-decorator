export class ConsoleCollector {
  private log = []

  logger(...args) {
    console.log(...args)
    this.log.push(args.join(''))
  }

  history() {
    return this.log
  }
}

export default ConsoleCollector