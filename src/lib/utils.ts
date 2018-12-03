const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g

/**
 * Return the keys of the target object
 * @param data target object
 * @return the keys of the input object
 */
export const keys = (data: Object) => {
  return Object.keys(data)
}

/**
 * Get the parameters of one function
 * @param func target function
 * @return the parameters of function
 */
export const getArsName = (func: Function) => {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '')
  const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES) || []
  return result
}

/**
 * Check if the target object is empty of not
 * @param obj target object
 * @return whether the object is empty or not
 */
export const isObjEmpty = (obj: any) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * A function that check if the script is running on node or not.
 * @return whether running on nodejs environment
 */
export const runningOnNode = () => {
  return typeof window === 'undefined'
}