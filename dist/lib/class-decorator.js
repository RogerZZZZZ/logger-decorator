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
var default_class_option_1 = require("./lib/opt/default-class-option");
var utils_1 = require("./lib/utils");
var function_wrapper_1 = require("./lib/function-wrapper");
exports.ClassLogger = function (opt) {
    var options = __assign({}, default_class_option_1.defaultClassOpt, opt);
    return function (target) {
        if (options.disable)
            return;
        utils_1.keys(target.prototype).map(function (funcName) {
            var oldFunc = target.prototype[funcName];
            if (oldFunc.__disable_logger)
                return;
            var individualOpt = oldFunc.__opt ? __assign({}, options, oldFunc.__opt) : options;
            if (individualOpt.disable)
                return;
            target.prototype[funcName] = function_wrapper_1.FunctionWrapper(oldFunc, funcName, individualOpt);
        });
    };
};
//# sourceMappingURL=class-decorator.js.map