import { IFunctionOption } from './interface/IFunctionOption';
import { message, messageEnd } from './message'
import { now } from './performance-now-polyfill'

export const FunctionWrapper = (
  func: Function,
  funcName: string,
  options: IFunctionOption
) => {
  return function(...args: any[]) {
    message(options, this, args, funcName, func)
    const startTime = now()
    const result = func.apply(this, args)
    messageEnd(options, (now() - startTime), this, funcName, result)
    return result
  }
}