import { IFunctionOption } from './interface/IFunctionOption';
export declare const message: (options: IFunctionOption, that: Function, arg: any[], name: string, func: Function) => void;
export declare const messageEnd: (options: IFunctionOption, duration: number, that: Function, name: string, returnValue?: any) => void;
