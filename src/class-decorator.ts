import { defaultClassOpt } from './lib/opt/default-class-option';
import { IClassOption } from './lib/@types/IClassOption';
import { keys } from './lib/utils'
import { FunctionWrapper } from './lib/function-wrapper'

export const ClassLogger = (opt?: Partial<IClassOption>) => {
  let options = {...defaultClassOpt, ...opt}
  return (target: any) => {
    keys(target.prototype).map(funcName => {
      const oldFunc = target.prototype[funcName]

      if (oldFunc.__disable_logger) return

      const individualOpt = oldFunc.__opt ? {...options, ...oldFunc.__opt } : options
      target.prototype[funcName] = FunctionWrapper(oldFunc, funcName, individualOpt)
    })
  }
}
