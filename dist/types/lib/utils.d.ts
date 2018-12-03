/**
 * Return the keys of the target object
 * @param data target object
 * @return the keys of the input object
 */
export declare const keys: (data: Object) => string[];
/**
 * Get the parameters of one function
 * @param func target function
 * @return the parameters of function
 */
export declare const getArsName: (func: Function) => RegExpMatchArray;
/**
 * Check if the target object is empty of not
 * @param obj target object
 * @return whether the object is empty or not
 */
export declare const isObjEmpty: (obj: any) => boolean;
/**
 * A function that check if the script is running on node or not.
 * @return whether running on nodejs environment
 */
export declare const runningOnNode: () => boolean;
