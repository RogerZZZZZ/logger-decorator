"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_decorator_1 = require("./logger-decorator");
var Index = /** @class */ (function () {
    function Index(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    Index.prototype.add = function (p3) {
        return this.p1 + p3;
    };
    Index.prototype.test = function (p4) {
        return this.p2 + p4;
    };
    Index.prototype.get = function () {
        return this.p2;
    };
    Index.prototype.testDisable = function () {
        return 'testDisable';
    };
    Index.prototype.loop = function () {
        var index = 0;
        for (var i = 0; i < 1000000; i++) {
            index++;
        }
        return index;
    };
    __decorate([
        logger_decorator_1.FuncLogger({
            classProperties: true,
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", String)
    ], Index.prototype, "add", null);
    __decorate([
        logger_decorator_1.FuncLogger({
            withTime: false,
            withParams: true,
            beginMessage: 'access to test function'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", String)
    ], Index.prototype, "test", null);
    __decorate([
        logger_decorator_1.DisableLogger(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], Index.prototype, "get", null);
    __decorate([
        logger_decorator_1.FuncLogger({}),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Index.prototype, "testDisable", null);
    __decorate([
        logger_decorator_1.FuncLogger({
            logReturn: true,
            duration: true,
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Number)
    ], Index.prototype, "loop", null);
    Index = __decorate([
        logger_decorator_1.ClassLogger({
            beginMessage: 'aaaaa'
        }),
        __metadata("design:paramtypes", [String, String])
    ], Index);
    return Index;
}());
var index = new Index('piggy', 'pig');
index.add('1020');
index.test('2020');
index.testDisable();
index.loop();
// index.get()
function add2(a, b) {
    return a + b;
}
var res = logger_decorator_1.logDecorate({
    logReturn: true
})(add2);
// could directly export res
res.add2('1', 'b');
//# sourceMappingURL=index.js.map