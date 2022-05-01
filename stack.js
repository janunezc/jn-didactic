(() => {

    class stackClass {
        constructor() {
            this.mydata = [];
        }

        push(entry) {
            this.mydata.push(entry);
        }

        pop() {
            return this.mydata.pop();
        }

        peek() {
            return this.mydata[this.mydata.length - 1];
        }
    }

    exports.StackClass = stackClass;
})();

