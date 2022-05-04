(() => {
    function fibonacci_iterative(n) {
        let arr = [0, 1];
        for (let i = 2; i < n + 1; i++) {
            arr.push(arr[i-2]+arr[i-1]);
        }

        return arr[n];
    }

    function fibonacci_recursive(n){
        if (n<2){
            return n;
        } else {
            return fibonacci_recursive(n-1) + fibonacci_recursive(n-2);
        }
    }

    exports.Fibonacci_I = fibonacci_iterative;
    exports.Fibonacci_R = fibonacci_recursive;
})();