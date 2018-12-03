"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyLibrary = /** @class */ (function () {
    function MyLibrary() {
    }
    MyLibrary.prototype.executeDependency = function () {
        return Math.floor(Math.random() * 10 + 1);
    };
    return MyLibrary;
}());
exports.MyLibrary = MyLibrary;
exports.default = MyLibrary;
//# sourceMappingURL=MyLibrary.js.map