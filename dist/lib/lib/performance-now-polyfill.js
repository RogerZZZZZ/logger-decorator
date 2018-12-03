"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.now = function () {
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
//# sourceMappingURL=performance-now-polyfill.js.map