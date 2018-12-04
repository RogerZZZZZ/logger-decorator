import {
  ClassLogger,
  FuncLogger,
  DisableLogger,
  Logger,
} from '../../dist/lib/logger-decorator'
import { ConsoleCollector } from './lib/console-collector'

describe('Test FuncLogger', () => {
  it('Test config override', () => {
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

      @FuncLogger({
        withParams: false,
      })
      testFunction1() {
        return this.field1
      }

      @FuncLogger({
        logReturn: false,
        beginMessage: 'test function2'
      })
      testFunction2() {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testFunction1()
    basic.testFunction2()
    const history = collector.history()
    expect(history).toEqual([
      '[Basic#testFunction1] START',
      '    Begin Message',
      '    Return Value: basic',
      '[Basic#testFunction1] END',
      '[Basic#testFunction2] START',
      '    test function2',
      '    Parameters: []',
      '[Basic#testFunction2] END'])
  })
})

describe('Test DisableLogger', () => {
  it('Test DisableLogger decorator', () => {
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

      @FuncLogger({
        withParams: false,
      })
      testFunction1() {
        return this.field1
      }

      @DisableLogger()
      testFunction2() {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testFunction1()
    basic.testFunction2()
    const history = collector.history()
    expect(history).toEqual([
      '[Basic#testFunction1] START',
      '    Begin Message',
      '    Return Value: basic',
      '[Basic#testFunction1] END'])
  })

  it('Test use FuncLogger and DisableLogger meantime', () => {
    const collector = new ConsoleCollector()
    @ClassLogger({
      log: collector.logger.bind(collector),
      withTime: false,
      beginMessage: 'Begin Message',
    })
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      @FuncLogger({
        withParams: false,
      })
      @DisableLogger()
      testFunction1() {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testFunction1()
    const history = collector.history()
    expect(history.length).toBe(0)
  })
})

describe('Test Logger Decorate', () => {
  it('Test without ClassDecorator', () => {
    const collector = new ConsoleCollector()
    class Basic {
      private field1: string
      constructor(field1: string) {
        this.field1 = field1
      }

      @Logger({
        withParams: true,
        logReturn: true,
        withTime: false,
        log: collector.logger.bind(collector)
      })
      testFunction1(param: string) {
        return this.field1
      }
    }

    const basic = new Basic('basic')
    basic.testFunction1('param')
    const history = collector.history()
    expect(history).toEqual([
      '[Basic#testFunction1] START',
      '    Parameters: [param: param]',
      '    Return Value: basic',
      '[Basic#testFunction1] END'])
  })
})