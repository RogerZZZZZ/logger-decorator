"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./lib/utils");
var default_function_option_1 = require("./lib/opt/default-function-option");
var function_wrapper_1 = require("./lib/function-wrapper");
var decorateFunc = function (descriptor, field, value) {
    var oldFunc = descriptor.value;
    oldFunc[field] = value;
    descriptor.value = oldFunc;
    return descriptor;
};
exports.FuncLogger = function (opt) {
    return function (target, name, descriptor) {
        return utils_1.isObjEmpty(opt) ? descriptor : decorateFunc(descriptor, '__opt', opt);
    };
};
exports.DisableLogger = function () {
    return function (target, name, descriptor) {
        return decorateFunc(descriptor, '__disable_logger', true);
    };
};
exports.Logger = function (opt) {
    var options = __assign({}, default_function_option_1.defaultFuncOpt, opt);
    return function (target, name, descriptor) {
        if (options.disable)
            return descriptor;
        var oldFunc = descriptor.value;
        descriptor.value = function_wrapper_1.FunctionWrapper(oldFunc, name, options);
        return descriptor;
    };
};
//# sourceMappingURL=function-decorator.js.map