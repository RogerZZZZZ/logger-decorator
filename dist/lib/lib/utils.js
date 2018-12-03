"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
/**
 * Return the keys of the target object
 * @param data target object
 * @return the keys of the input object
 */
exports.keys = function (data) {
    return Object.keys(data);
};
/**
 * Get the parameters of one function
 * @param func target function
 * @return the parameters of function
 */
exports.getArsName = function (func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES) || [];
    return result;
};
/**
 * Check if the target object is empty of not
 * @param obj target object
 * @return whether the object is empty or not
 */
exports.isObjEmpty = function (obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};
/**
 * A function that check if the script is running on node or not.
 * @return whether running on nodejs environment
 */
exports.runningOnNode = function () {
    return typeof window === 'undefined';
};
//# sourceMappingURL=utils.js.map