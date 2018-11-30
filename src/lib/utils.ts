const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g

export const keys = (data: Object) => {
  return Object.keys(data)
}

export const getArsName = (func: Function) => {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '')
  const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES) || []
  return result
}

export const isObjEmpty = (obj: Object) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}