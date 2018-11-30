import { IFunctionOption } from './@types/IFunctionOption';
import { message, messageEnd } from './message'

export const FunctionWrapper = (
  func: Function,
  funcName: string,
  options: IFunctionOption
) => {
  return function(...args: any[]) {
    message(options, this, args, funcName, func)
    const result = func.apply(this, args)
    messageEnd(options, result)
  }
}