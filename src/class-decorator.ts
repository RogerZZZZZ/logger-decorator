import { defaultClassOpt } from './lib/opt/default-class-option';
import { IClassOption } from './lib/@types/IClassOption';
import { keys } from './lib/utils'
import { FunctionWrapper } from './lib/function-wrapper'

export const ClassLogger = (opt?: Partial<IClassOption>) => {
  const options = {...defaultClassOpt, ...opt}
  return (target: any) => {
    console.log(target.prototype)
    keys(target.prototype).map(funcName => {
      const oldFunc = target.prototype[funcName]

      if (oldFunc.__disable_logger) return
      
      target.prototype[funcName] = FunctionWrapper(oldFunc, funcName, options)
    })
  }
}
