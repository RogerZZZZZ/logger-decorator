import { ClassLogger } from '../../dist/lib/logger-decorator'
import { ConsoleCollector } from './lib/console-collector'


describe('Class Logger Decorator', () => {
  it('should bind logger', () => {

    const collector = new ConsoleCollector()

    @ClassLogger({
      classProperties: true,
      log: collector.logger.bind(collector)
    })
    class Test {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }
      test() {
        //
      }
    }

    const test = new Test('111')
    test.test()
    console.log(collector.history())
    // console.printHistory()
  })
})
