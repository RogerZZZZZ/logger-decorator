"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyLibrary_1 = require("./MyLibrary");
describe('TypeScript WebPack Starter Tests', function () {
    it('A good way to start building an awesome library is by doing Unit Tests 👌🏽', function () {
        var myLibrary = new MyLibrary_1.MyLibrary();
        var result = myLibrary.executeDependency();
        expect(result >= 0 && result <= 10).toBeTruthy();
    });
});
//# sourceMappingURL=MyLibrary.spec.js.map