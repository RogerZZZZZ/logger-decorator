export default class ConsoleCollector {
  private log = []

  logger(...args) {
    this.log.push(args.join(''))
  }

  history() {
    return this.log
  }
}