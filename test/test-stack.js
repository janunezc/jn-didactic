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

    it("Performs push, peek and pop in a big dataset scenario", () => {
        let stack = new stackLib.StackClass();
        for (let i = 0; i < 1000000; i++) {
            stack.push(i);
            assert.equal(stack.peek(), i);
        }

        for (let expected = 999999; expected >= 0; expected--) {
            let popped = stack.pop();
            assert.equal(popped, expected);
        }
    });

});


describe("CheckBracketString", () => {
    it("Processes Happy Path Case", () => {
        let happyString = "HOLA (TODOS) ESTA ES UNA PRUEBA [prueba {elemental}] OK";
        //                      1     0                    1       2         10
        assert.equal(stackLib.CheckBracketString(happyString), true);

    });

    it("Process angry path - wrong closing symbol", () => {
        let angryString = "HOLA (TODOS]) ESTA ES UNA PRUEBA [prueba {elemental}] OK";
        //                      1     X 
        assert.equal(stackLib.CheckBracketString(angryString), false);
    });

    it("Process empty string", () => {
        let angryString = "";
        assert.equal(stackLib.CheckBracketString(angryString), true);
    });

    it("Processes incomplete closure", () => {
        let unclosedString = "HOLA (TODOS) ESTA ES UNA PRUEBA [prueba {elemental} OK";
        //                         1     0                    1       2         1       !
        assert.equal(stackLib.CheckBracketString(unclosedString), false);
    });


});