import { IFunctionOption } from './../@types/IFunctionOption';
import { defaultOpt } from './default-base-option'

export const defaultFuncOpt: IFunctionOption = Object.assign(defaultOpt, {
  withParams: false,
  logReturn: false,
  beginMessage: ''
})
