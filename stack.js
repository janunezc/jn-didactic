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

    /**
     * Takes a string s and scans it to determine it is valid regarding bracket closures.
     * Examples:
     * VALID: ""
     *        "({[[[{}]]]})"
     *        "(abc(def)[][])"
     * INVALID: ((
     *          ([{{{}}})    < Missing a ] before last )
     * 
     * APPROACH:
     * Fast track on empty string
     * Scan string for opening or closing bracket symbols
     *  if an opening brackt is found, add it to stack
     *  if a closing bracket is found, determine if last item in stack is the corresponding opening one.
     *   if not, return false
     * When all string is scanned, check stack is empty. If so, then return true.
     * Otherwise return false
     * 
     * openparentargets: "(,[,{"
     * closeparentargets: ")=>(,}=>{,]=>["
     * s:"([{randomtext}])"
     * p:0
     *  c:"(" //part of our openparentargets  ==> PROCESS OPENPAREN
     *   stack.push(c):"("
     * p:1
     *  c:"[" //part of our openparentargets
     *   stack.push(c)="[("
     * 
     * p:2
     *  c="{" //part of our openparentargets
     *   stack="{[("
     * 
     * p:3...12 ==> IGNORE
     *  c="r"|"a"..."randomtext" ignore all of these
     * 
     * p:13
     *  c:"}" //part of our closeparentargets => corresponding opening paren (cop): "{" ==>PROCESS CLOSEPAREN
     *   stack.pop: "{"
     *   stack: "[("
     *   cop!==pop ("{"): return false
     * 
     * p:14
     *  c:"]" //part of our closeparentargets => corresponding opening paren (cop): "["
     *   stack.pop: "["
     *   stack: "("
     *   cop!==pop ("["): return false
     * 
     * p:15
     *  c:")"
     *  //part of our closeparentargets => corresponding opening paren (cop): "("
     *   stack.pop: "("
     *   stack: ""
     * 
     * check stack is empty (peek===undefined): return true otherwise return false/
     * 
     * 
     * "({[[[{}]]]})"
     * hashmap openParenthesis
     * openP["("] = ")"
     * openP["{"] = "}"
     * openP["["] = "]"
     * 
     * closeP[")"] = "("
     * closeP["}"] = "{"
     * closeP["]"] = "["
     * let openStack
     * scanString => char:
     *   if(openP[char]){
     *     openStack.push(char); 
     *   }
     * 
     *   openCandidate = closeP[char];
     *   if(openCandidate){
     *     targetOpenP = openStack.pop()
     *     if(targetOpenP !== openCandidate) return false;
     *   }
     * 
     * @param {string} s 
     */
    function checkBracketClosures(s) {
        let openParenSpec = "({[";
        let closeParenSpec = {
            ")": "(",
            "}": "{",
            "]": "["
        }

        let stack = [];

        for (let i = 0; i < s.length; i++) {
            let myChar = s.charAt(i);
            let openSpecItem = openParenSpec.includes(myChar);
            let cop = closeParenSpec[myChar];

            if (openSpecItem) {
                stack.push(myChar);
            } else if (cop) {
                let popped = stack.pop();
                if (cop !== popped) return false;
            }
        }

        if (stack.length === 0) return true;
        else return false;

    }

    exports.StackClass = stackClass;
    exports.CheckBracketString = checkBracketClosures;

})();

