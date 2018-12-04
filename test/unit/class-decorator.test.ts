/* eslint-disable */
import { ClassLogger } from '../../dist/lib/logger-decorator'
import ConsoleCollector from '../lib/console-collector'

const collector = new ConsoleCollector()

describe('Class Logger Decorator', () => {
  it('should bind logger', () => {
    @ClassLogger({
      classProperties: true,
      log: collector.logger
    })
    class Test {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }
    }

    const test = new Test('111')
    console.log(collector.history())
    // console.printHistory()
  })
})
