import { IFunctionOption } from './interface/IFunctionOption';
export declare const message: (options: IFunctionOption, that: any, arg: any[], name: string, func: Function) => void;
export declare const messageEnd: (options: IFunctionOption, duration: number, that: any, name: string, returnValue?: any) => void;
