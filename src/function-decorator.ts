import { defaultFuncOpt } from './lib/opt/default-function-option';
import { IFunctionOption } from './lib/@types/IFunctionOption';

export const FuncLogger = (opt?: Partial<IFunctionOption>) => {
  const options = {...defaultFuncOpt, ...opt}
  return function(target: any, name: string, descriptor: any) {

  }
}