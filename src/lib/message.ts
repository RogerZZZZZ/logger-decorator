import { getArsName } from './utils';
import { IFunctionOption } from './@types/IFunctionOption';

const TAB = '    '

const getArgsList = (func: Function, values: any[]) => {
  return getArsName(func).map((param, index) => {
    return `${param}: ${values[index]}`
  }).join(',')
}

const concatMsg = (...args: string[]): string => {
  return args.filter(el => el && el !== '').join(' ')
}

const getProperties = (classObj: Object): string => {
  return Object.keys(classObj).reduce((msg, el) => {
    msg.push(`${el}: ${classObj[el]}`)
    return msg
  }, []).join(' ')
}

export const message = (
  options: IFunctionOption,
  that: Function,
  arg: any[],
  name: string,
  func: Function,
) => {
  const logger = options.log || console.log


  // print basic info of function
  const className = (that && that.constructor && that.constructor.name) || ''
  const time = options.withTime ? (new Date()).toISOString() : ''
  logger(concatMsg(time, `[${className}#${name}] START`))

  // print begin message if there are any
  options.beginMessage && logger(`${TAB}${options.beginMessage}`)

  options.classProperties && logger(`${TAB}Class Properties: [${getProperties(that)}]`)

  // print parameters of function
  options.withParams && logger(`${TAB}Parameters: [${getArgsList(func, arg)}]`)
}

export const messageEnd = (
  options: IFunctionOption,
  duration: number,
  that: Function,
  name: string,
  returnValue?: any
) => {
  const logger = options.log || console.log

  options.duration && logger(`${TAB}Function spent: ${duration.toFixed(3)}ms`)

  options.logReturn && returnValue && logger(`${TAB}Return Value: ${returnValue}`)

  const className = (that && that.constructor && that.constructor.name) || ''
  logger(`[${className}#${name}] END`)
}
