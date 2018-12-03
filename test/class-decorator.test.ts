import { ClassLogger } from '../dist/lib/logger-decorator'
import consolemock from 'consolemock'

describe('Class Logger Decorator', () => {
  it('should bind logger', () => {
    const console = consolemock()
    @ClassLogger({
      log: console.log
    })
    class Test {
      private field1: string

      constructor(field1: string) {
        this.field1 = field1
      }
    }

    const test = new Test('111')

    console.printHistory()
  })
})
