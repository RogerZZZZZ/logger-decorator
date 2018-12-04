import {
  logDecorate,
} from '../../dist/lib/logger-decorator'
import { ConsoleCollector } from './lib/console-collector'

describe('Test logDecorate method', () => {
  it('Test decorate one method', () => {
    const collector = new ConsoleCollector()
    function test(a: string, b: string) {
      return a + b
    }
    
    const res = logDecorate({
      logReturn: true,
      withTime: false,
      log: collector.logger.bind(collector),
    })(test)
    
    res.test('1', 'b')

    expect(collector.history()).toEqual([
      '[Object#test] START',
      '    Return Value: 1b',
      '[Object#test] END'])
  })

  it('Test decorate multiple methods', () => {
    const collector = new ConsoleCollector()
    function test(a: string, b: string) {
      return a + b
    }

    function test2() {
      return 'aaa'
    }
    
    const res = logDecorate({
      logReturn: true,
      withTime: false,
      log: collector.logger.bind(collector),
    })(test, test2)
    
    res.test('1', 'b')
    res.test2()

    expect(collector.history()).toEqual([
      '[Object#test] START',
      '    Return Value: 1b',
      '[Object#test] END',
      '[Object#test2] START',
      '    Return Value: aaa',
      '[Object#test2] END'])
    expect(res.noFunc).toBeUndefined()
  })
})