import { ClassLogger } from '../../dist/lib/ogger-decorator'
import { ConsoleCollector } from './lib/console-collector'


describe('Test ClassLogger', () => {
  it('Test basic class decorator', () => {
    const collector = new ConsoleCollector()

    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testGetField() {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testGetField()
    expect(collector.history()).toEqual([
      '[Basic#testGetField] START',
      '[Basic#testGetField] END'
    ])
  })

  it('Test with class propertities', () => {
    const collector = new ConsoleCollector()

    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      classProperties: true,
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testGetField() {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testGetField()
    expect(collector.history()).toEqual([
      '[Basic#testGetField] START',
      '    Class Properties: [field1: basic]',
      '[Basic#testGetField] END'
    ])
  })

  it('Test with duration', () => {
    const collector = new ConsoleCollector()

    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      duration: true,
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testDuration() {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testDuration()
    const history = collector.history()
    expect(history.length).toBe(3)
    expect(history[1]).toMatch('Function spent: ')
  })

  it('Test disable option', () => {
    const collector = new ConsoleCollector()

    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      duration: true,
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testDisable() {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testDisable()
    expect(collector.history().length).toBe(0)
  })

})
