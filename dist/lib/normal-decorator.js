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
var default_function_option_1 = require("./lib/opt/default-function-option");
var function_wrapper_1 = require("./lib/function-wrapper");
exports.logDecorate = function (opt) {
    var options = __assign({}, default_function_option_1.defaultFuncOpt, opt);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.reduce(function (result, el) {
            var funcName = el.name;
            el = function_wrapper_1.FunctionWrapper(el, funcName, options);
            result[funcName] = el;
            return result;
        }, {});
    };
};
//# sourceMappingURL=normal-decorator.js.map