import { IFunctionOption } from './@types/IFunctionOption';
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
    const endTime = now()
    messageEnd(options, (endTime - startTime), this, funcName, result)
    return result
  }
}