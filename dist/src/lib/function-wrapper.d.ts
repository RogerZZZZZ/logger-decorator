import { IFunctionOption } from './interface/IFunctionOption';
export declare const FunctionWrapper: (func: Function, funcName: string, options: IFunctionOption) => (...args: any[]) => any;
