import { IFunctionOption } from './lib/@types/IFunctionOption';
export declare const FuncLogger: (opt?: Partial<IFunctionOption>) => (target: any, name: string, descriptor: any) => any;
export declare const DisableLogger: () => (target: any, name: String, descriptor: any) => any;
