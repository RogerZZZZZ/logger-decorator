import { ClassLogger } from '../../dist/lib/logger-decorator'
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
      disable: true,
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

  it('Test withParams', () => {
    const collector = new ConsoleCollector()
    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      withParams: true,
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testWithParams(param1: string, param2: string) {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testWithParams('param1', 'param2')
    expect(collector.history()).toEqual([
      '[Basic#testWithParams] START',
      '    Parameters: [param1: param1,param2: param2]',
      '[Basic#testWithParams] END',
    ])
  })

  it('Test logReturn', () => {
    const collector = new ConsoleCollector()
    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      logReturn: true,
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testWithParams(param1: string, param2: string) {
        return this.field1 + param1 + param2
      }
    }

    const basic = new Basic('basic')
    basic.testWithParams('param1', 'param2')
    expect(collector.history()).toEqual([
      '[Basic#testWithParams] START',
      '    Return Value: basicparam1param2',
      '[Basic#testWithParams] END',
    ])
  })

  it('Test beginMessage', () => {
    const collector = new ConsoleCollector()
    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      beginMessage: 'Begin Message'
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testWithParams(param1: string, param2: string) {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testWithParams('param1', 'param2')
    expect(collector.history()).toEqual([
      '[Basic#testWithParams] START',
      '    Begin Message',
      '[Basic#testWithParams] END',
    ])
  })
})

describe('Test ClassLogger In other occasion', () => {
  it('Test whole options', () => {
    const collector = new ConsoleCollector()
    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      beginMessage: 'Begin Message',
      logReturn: true,
      duration: true,
      withParams: true,
      classProperties: true,
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testAllOptions(param1: string, param2: string) {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testAllOptions('param1', 'param2')
    const history = collector.history()
    expect(history.length).toBe(7)
    const duration = history.splice(4, 1)
    expect(history).toEqual([
      '[Basic#testAllOptions] START',
      '    Begin Message',
      '    Class Properties: [field1: basic]',
      '    Parameters: [param1: param1,param2: param2]',
      '    Return Value: basic',
      '[Basic#testAllOptions] END',
    ])
    expect(duration).toMatch('Function spent: ')
  })

  it('Test multi functions', () => {
    const collector = new ConsoleCollector()
    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      beginMessage: 'Begin Message',
      logReturn: true,
      withParams: true,
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      testFunction1(param1: string, param2: string) {
        return param1 + param2
      }

      testFunction2() {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testFunction1('param1', 'param2')
    basic.testFunction2()
    expect(collector.history()).toEqual([
      '[Basic#testFunction1] START',
      '    Begin Message',
      '    Parameters: [param1: param1,param2: param2]',
      '    Return Value: param1param2',
      '[Basic#testFunction1] END',
      '[Basic#testFunction2] START',
      '    Begin Message',
      '    Parameters: []',
      '    Return Value: basic',
      '[Basic#testFunction2] END',
    ])
  })
})