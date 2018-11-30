import { getArsName } from './utils';
import { IFunctionOption } from './@types/IFunctionOption';

const getArgsList = (func: Function, values: any[]) => {
  return getArsName(func).map((param, index) => {
    return `${param}: ${values[index]}`
  }).join(' ')
}

export const message = (
  options: IFunctionOption,
  that: Function,
  arg: any[],
  name: string,
  func: Function,
) => {
  const logger = options.log || console.log
  logger(that)
  logger(arg)
  const time = options.withTime ? (new Date()).toISOString() : ''

  const beginMessage = options.beginMessage || null
  beginMessage && logger(beginMessage)

  logger(`[Function: ${name}] - ${time}`)

  logger(`[${getArgsList(func, arg)}]`)
}

export const messageEnd = (
  options: IFunctionOption,
  returnValue?: any
) => {
  const logger = options.log || console.log
  returnValue && logger(returnValue)
}