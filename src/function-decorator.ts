import { defaultFuncOpt } from './lib/opt/default-function-option';
import { IFunctionOption } from './lib/@types/IFunctionOption';

const decorateFunc = (descriptor: any, field: string, value: any) => {
  const oldFunc = descriptor.value
  oldFunc[field] = value
  descriptor.value = oldFunc
  return descriptor
}

export const FuncLogger = (opt?: Partial<IFunctionOption>) => {
  const options = {...defaultFuncOpt, ...opt}
  return function(target: any, name: string, descriptor: any) {
    return decorateFunc(descriptor, '__opt', options)
  }
}

export const DisableLogger = () => {
  return function(target: any, name: String, descriptor: any) {
    return decorateFunc(descriptor, '__disable_logger', true)
  }
}