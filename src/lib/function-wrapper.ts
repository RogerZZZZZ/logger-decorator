import { message } from './message'

export const FunctionWrapper = (func: Function, funcName: string) => {
  return function() {
    message(this, arguments, funcName)
  }
}