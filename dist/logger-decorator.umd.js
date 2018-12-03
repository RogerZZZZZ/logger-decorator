(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.loggerDecorator = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    /**
     * Return the keys of the target object
     * @param data target object
     * @return the keys of the input object
     */
    var keys = function (data) {
        return Object.keys(data);
    };
    /**
     * Get the parameters of one function
     * @param func target function
     * @return the parameters of function
     */
    var getArsName = function (func) {
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES) || [];
        return result;
    };
    /**
     * Check if the target object is empty of not
     * @param obj target object
     * @return whether the object is empty or not
     */
    var isObjEmpty = function (obj) {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    };

    var defaultOpt = {
        classProperties: false,
        log: console.log,
        withTime: true,
        disable: false,
        duration: false,
    };

    var defaultFuncOpt = Object.assign(defaultOpt, {
        withParams: false,
        logReturn: false,
        beginMessage: ''
    });

    var TAB = '    ';
    var getArgsList = function (func, values) {
        return getArsName(func).map(function (param, index) {
            return param + ": " + values[index];
        }).join(',');
    };
    var concatMsg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.filter(function (el) { return el && el !== ''; }).join(' ');
    };
    var getProperties = function (classObj) {
        return Object.keys(classObj).reduce(function (msg, el) {
            msg.push(el + ": " + classObj[el]);
            return msg;
        }, []).join(' ');
    };
    var message = function (options, that, arg, name, func) {
        var logger = options.log || console.log;
        // print basic info of function
        var className = (that && that.constructor && that.constructor.name) || '';
        var time = options.withTime ? (new Date()).toISOString() : '';
        logger(concatMsg(time, "[" + className + "#" + name + "] START"));
        // print begin message if there are any
        options.beginMessage && logger("" + TAB + options.beginMessage);
        options.classProperties && logger(TAB + "Class Properties: [" + getProperties(that) + "]");
        // print parameters of function
        options.withParams && logger(TAB + "Parameters: [" + getArgsList(func, arg) + "]");
    };
    var messageEnd = function (options, duration, that, name, returnValue) {
        var logger = options.log || console.log;
        options.duration && logger(TAB + "Function spent: " + duration.toFixed(3) + "ms");
        options.logReturn && returnValue && logger(TAB + "Return Value: " + returnValue);
        var className = (that && that.constructor && that.constructor.name) || '';
        logger("[" + className + "#" + name + "] END");
    };

    /**
     * @return return the current time info when on node environment
     */
    var getTimeOnNode = function () {
        var hrTime = process.hrtime();
        return hrTime[0] * 1e9 + hrTime[1];
    };
    /**
     * Polyfill of performance.now function
     * Get the value of performance.now() on both node or web browser.
     * @return the performance.now()
     */
    var now = function () {
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            return performance.now();
        }
        else if (typeof process !== undefined && typeof process.hrtime === 'function') {
            return (function (loadTime) {
                return (getTimeOnNode() - loadTime) / 1e9;
            })(getTimeOnNode() - (process.uptime() * 1e9));
        }
        else {
            return (function (loadTime) {
                return (new Date()).getTime() - loadTime;
            })((new Date).getTime());
        }
    };

    var FunctionWrapper = function (func, funcName, options) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            message(options, this, args, funcName, func);
            var startTime = now();
            var result = func.apply(this, args);
            messageEnd(options, (now() - startTime), this, funcName, result);
            return result;
        };
    };

    var decorateFunc = function (descriptor, field, value) {
        var oldFunc = descriptor.value;
        oldFunc[field] = value;
        descriptor.value = oldFunc;
        return descriptor;
    };
    var FuncLogger = function (opt) {
        return function (target, name, descriptor) {
            return isObjEmpty(opt) ? descriptor : decorateFunc(descriptor, '__opt', opt);
        };
    };
    var DisableLogger = function () {
        return function (target, name, descriptor) {
            return decorateFunc(descriptor, '__disable_logger', true);
        };
    };
    var Logger = function (opt) {
        var options = __assign({}, defaultFuncOpt, opt);
        return function (target, name, descriptor) {
            if (options.disable)
                return descriptor;
            var oldFunc = descriptor.value;
            descriptor.value = FunctionWrapper(oldFunc, name, options);
            return descriptor;
        };
    };

    var defaultClassOpt = Object.assign(defaultFuncOpt, {});

    var ClassLogger = function (opt) {
        var options = __assign({}, defaultClassOpt, opt);
        return function (target) {
            if (options.disable)
                return;
            keys(target.prototype).map(function (funcName) {
                var oldFunc = target.prototype[funcName];
                if (oldFunc.__disable_logger)
                    return;
                var individualOpt = oldFunc.__opt ? __assign({}, options, oldFunc.__opt) : options;
                if (individualOpt.disable)
                    return;
                target.prototype[funcName] = FunctionWrapper(oldFunc, funcName, individualOpt);
            });
        };
    };

    var logDecorate = function (opt) {
        var options = __assign({}, defaultFuncOpt, opt);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (result, el) {
                var funcName = el.name;
                el = FunctionWrapper(el, funcName, options);
                result[funcName] = el;
                return result;
            }, {});
        };
    };

    exports.ClassLogger = ClassLogger;
    exports.FuncLogger = FuncLogger;
    exports.DisableLogger = DisableLogger;
    exports.Logger = Logger;
    exports.logDecorate = logDecorate;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=logger-decorator.umd.js.map
