import { defaultClassOpt } from './lib/opt/default-class-option';
import { IClassOption } from './lib/interface/IClassOption';
import { keys } from './lib/utils'
import { FunctionWrapper } from './lib/function-wrapper'

export const ClassLogger = (opt?: Partial<IClassOption>) => {
  let options = {...defaultClassOpt, ...opt}
  return (target: any) => {
    if (options.disable) return
    keys(target.prototype).map(funcName => {
      const oldFunc = target.prototype[funcName]

      if (oldFunc.__disable_logger) return

      const individualOpt = oldFunc.__opt ? {...options, ...oldFunc.__opt } : options
      if (individualOpt.disable) return
      target.prototype[funcName] = FunctionWrapper(oldFunc, funcName, individualOpt)
    })
  }
}
