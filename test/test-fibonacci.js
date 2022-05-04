const assert = require("assert");

describe("Fibonacci Iterative", () => {
    it("Works on a decent size (20)", () => { 
        let fib = require("../fibonacci");
        console.time("FIB10IT");
        let result = fib.Fibonacci_I(20);
        console.timeEnd("FIB10IT");
        assert.equal(result, 6765);
    });
});

describe("Fibonacci Recursive", () => {
    it("Works on a decent size (20)", () => { 
        let fib = require("../fibonacci");
        console.time("FIB10RE");
        let result = fib.Fibonacci_R(20);
        console.timeEnd("FIB10RE");
        assert.equal(result, 6765);
    });
});