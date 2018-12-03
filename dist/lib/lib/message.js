"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var TAB = '    ';
var getArgsList = function (func, values) {
    return utils_1.getArsName(func).map(function (param, index) {
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
exports.message = function (options, that, arg, name, func) {
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
exports.messageEnd = function (options, duration, that, name, returnValue) {
    var logger = options.log || console.log;
    options.duration && logger(TAB + "Function spent: " + duration.toFixed(3) + "ms");
    options.logReturn && returnValue && logger(TAB + "Return Value: " + returnValue);
    var className = (that && that.constructor && that.constructor.name) || '';
    logger("[" + className + "#" + name + "] END");
};
//# sourceMappingURL=message.js.map