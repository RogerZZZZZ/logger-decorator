import { IFunctionOption } from './lib/interface/IFunctionOption';
export declare const FuncLogger: (opt?: Partial<IFunctionOption>) => (target: any, name: string, descriptor: any) => any;
export declare const DisableLogger: () => (target: any, name: String, descriptor: any) => any;
export declare const Logger: (opt?: Partial<IFunctionOption>) => (target: any, name: string, descriptor: any) => any;
