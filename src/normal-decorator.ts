import { IFunctionOption } from './lib/interface/IFunctionOption'
import { defaultFuncOpt } from './lib/opt/default-function-option';
import { FunctionWrapper } from './lib/function-wrapper';

export const logDecorate = (opt?: Partial<IFunctionOption>) => {
  const options = {...defaultFuncOpt, ...opt}
  return (...args: Function[]): any => {
    return args.reduce(function(result: any, el: any) {
      const funcName = el.name
      el = FunctionWrapper(el, funcName, options)
      result[funcName] = el
      return result
    }, {})
  }
}