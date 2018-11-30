import { defaultFuncOpt } from './lib/opt/default-function-option';
import { IFunctionOption } from './lib/@types/IFunctionOption';

export const FuncLogger = (opt?: Partial<IFunctionOption>) => {
  const options = {...defaultFuncOpt, ...opt}
  return function(target: any, name: string, descriptor: any) {

  }
}

export const DisableLogger = () => {
  return function(target: any, name: String, descriptor: any) {
    const oldFunc = descriptor.value
    oldFunc.__disable_logger = true
    descriptor.value = oldFunc
    return descriptor
  }
}