import { ClassLogger } from './class-decorator';

@ClassLogger()
class Index {
  private p1: string
  private p2: string

  constructor(p1: string, p2: string) {
    this.p1 = p1
    this.p2 = p2
  }

  add(p3: string): string {
    return this.p1 + p3
  }
}


const index = new Index('piggy', 'pig')
index.add('1020')
