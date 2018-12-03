import { IBaseOption } from './IBaseOption';
export interface IFunctionOption extends IBaseOption {
    withParams: Boolean;
    logReturn: Boolean;
    beginMessage: string;
}
