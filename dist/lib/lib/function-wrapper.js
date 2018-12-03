"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = require("./message");
var performance_now_polyfill_1 = require("./performance-now-polyfill");
exports.FunctionWrapper = function (func, funcName, options) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        message_1.message(options, this, args, funcName, func);
        var startTime = performance_now_polyfill_1.now();
        var result = func.apply(this, args);
        message_1.messageEnd(options, (performance_now_polyfill_1.now() - startTime), this, funcName, result);
        return result;
    };
};
//# sourceMappingURL=function-wrapper.js.map