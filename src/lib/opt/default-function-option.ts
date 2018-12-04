import { IFunctionOption } from './../interface/IFunctionOption';
import { defaultOpt } from './default-base-option'

export const defaultFuncOpt: IFunctionOption = {...defaultOpt, ...{
  withParams: false,
  logReturn: false,
  beginMessage: ''
}}
