const assert = require("assert");
let stackLib = require("../stack");

describe("Stack Library", () => {
    it("Isn't undefined", () => {
        assert.notEqual(stackLib, undefined);
    });

    it("Has a Stack class that is complete", () => {
        let stackInstance = new stackLib.StackClass();

        assert.notEqual(stackInstance, undefined);
        assert.notEqual(stackInstance.peek, undefined);
        assert.notEqual(stackInstance.pop, undefined);
        assert.notEqual(stackInstance.push, undefined);

    });

    it("Performs push, peek and pop", () => {
        let testStack = new stackLib.StackClass();
        testStack.push("1");
        testStack.push("2");
        testStack.push("3");

        assert.equal(testStack.peek(), "3");
        assert.equal(testStack.pop(), "3");
        assert.equal(testStack.pop(), "2");
        assert.equal(testStack.pop(), "1");
        assert.equal(testStack.pop(), undefined);
    });

});