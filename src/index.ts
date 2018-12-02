import { DisableLogger, FuncLogger, Logger } from './function-decorator';
import { ClassLogger } from './class-decorator';
import { logDecorate } from './normal-decorator';

@ClassLogger({
  beginMessage: 'aaaaa'
})
class Index {
  private p1: string
  private p2: string

  constructor(p1: string, p2: string) {
    this.p1 = p1
    this.p2 = p2
  }

  @FuncLogger()
  add(p3: string): string {
    return this.p1 + p3
  }

  @FuncLogger({
    withTime: false,
    beginMessage: 'access to test function'
  })
  test(p4: string): string {
    return this.p2 + p4
  }

  @DisableLogger()
  get(): string {
    return this.p2
  }

  @FuncLogger({
    logReturn: true,
    duration: true,
  })
  loop(): number {
    let index = 0
    for (let i = 0; i < 1000000; i++) {
      index ++
    }
    return index
  }
}

const index = new Index('piggy', 'pig')
index.add('1020')
index.test('2020')
index.loop()
index.get()


function add2(a: string, b: string) {
  return a + b
}

const res = logDecorate({
  logReturn: true
})(add2)

// could directly export res

res.add2('1', 'b')