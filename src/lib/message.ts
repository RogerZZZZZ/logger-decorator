import { getArsName } from './utils';
import { IFunctionOption } from './@types/IFunctionOption';
import { runningOnNode } from './utils'

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
  const time = options.withTime ? (new Date()).toISOString() : ''

  const beginMessage = options.beginMessage || null
  beginMessage && logger(beginMessage)

  logger(`[Function: ${name}] - ${time}`)

  logger(`[${getArgsList(func, arg)}]`)
}

export const messageEnd = (
  options: IFunctionOption,
  duration: number,
  returnValue?: any
) => {
  const logger = options.log || console.log
  const perf = (options.duration && `Function spent: ${duration.toFixed(3)}ms`) || ''
  const value = (options.logReturn && returnValue && `Return Value: ${returnValue}`) || ''
  if (perf !== '' || value !== '') logger(`[${perf} ${value}]`)
}
