import { isObjEmpty } from './lib/utils';
import { defaultFuncOpt } from './lib/opt/default-function-option';
import { IFunctionOption } from './lib/@types/IFunctionOption';
import { FunctionWrapper } from './lib/function-wrapper';

const decorateFunc = (descriptor: any, field: string, value: any) => {
  const oldFunc = descriptor.value
  oldFunc[field] = value
  descriptor.value = oldFunc
  return descriptor
}

export const FuncLogger = (opt?: Partial<IFunctionOption>) => {
  return function(target: any, name: string, descriptor: any) {
    return isObjEmpty(opt) ? descriptor : decorateFunc(descriptor, '__opt', opt)
  }
}

export const DisableLogger = () => {
  return function(target: any, name: String, descriptor: any) {
    return decorateFunc(descriptor, '__disable_logger', true)
  }
}
export const Logger = (opt?: Partial<IFunctionOption>) => {
  const options = {...defaultFuncOpt, ...opt}
  return function(target: any, name: string, descriptor: any) {
    if (options.disable) return descriptor
    const oldFunc = descriptor.value
    descriptor.value = FunctionWrapper(oldFunc, name, options)
    return descriptor
  }
}