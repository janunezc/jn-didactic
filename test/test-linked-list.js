const assert = require("assert");
const linkedListLib = require("../linked-list");
const jnc = require("jnconsole");
const exp = require("constants");


describe("linkedListLib(head)", () => {
  it("Instantiates the module with a public function InvertLinkedList", () => {
    assert.notEqual(linkedListLib, undefined, "ll module should not be undefined");
    assert.notEqual(linkedListLib.InvertLinkedList, undefined, "ll.InvertLinkedList function not found in module");
    assert.notEqual(linkedListLib.DetectCycle_Naive, undefined, "LinkedList.DetectCycle_Naive not found in module");
    assert.notEqual(linkedListLib.DetectCycle_Floyd, undefined, "LinkedList.DetectCycle_Floyd not found in module");
  });

  it("Inverts a linked list", () => {
    const node5 = {
      data: 5,
      next: null
    };
    const node4 = {
      data: 4,
      next: node5
    };
    const node3 = {
      data: 3,
      next: node4
    };
    const node2 = {
      data: 2,
      next: node3
    };
    const node1 = {
      data: 1,
      next: node2
    };
    const head = node1;

    let currentNode = linkedListLib.InvertLinkedList(head);
    let expectedData = 5;
    while (currentNode) {
      assert.equal(currentNode.data, expectedData);
      expectedData--;
      currentNode = currentNode.next;
    }
  });

  it("Inverts a big list", () => {
    let head = {
      data: 10000,
      next: null
    };
    for (let i = 9999; i >= 1; i--) {
      let newNode = {
        data: i,
        next: head
      };
      head = newNode;
    }

    let inverted = linkedListLib.InvertLinkedList(head);
    let expectedData = 10000;
    currentNode = inverted;
    while (currentNode) {
      assert.equal(currentNode.data, expectedData);
      expectedData--;
      currentNode = currentNode.next;
    }
  });

  it("Inverts an empty list", () => {
    let head = undefined;
    let inverted = linkedListLib.InvertLinkedList(head);
    assert.equal(inverted, undefined);

    head = {
      data: 0,
      next: null
    }

  });

  it("Inverts a one element list", () => {
    let head = {
      data: 0,
      next: null
    };
    let inverted = linkedListLib.InvertLinkedList(head);
    assert.deepEqual(head, inverted);
  });
});

/**
 * Happy Test Case
 * Input:  1>2>3>4>5>6>7>null m:3, n:6
 *             m     n
 * Output: 1>2>6>5>4>3>7>null
 *           - - - - -        << Items to modify
 */
describe("invertLinkedListPartial(head, m, n)", () => {
  it("inverts happy testcase correctly 1,2,3,4,5,6,7 m=3, n=6", () => {
    let head = createLinkedList(7);
    let m = 3;
    let n = 6;
    console.log("HEAD:     ", reportList(head));

    let expected = partialHappyCaseResult();
    console.log("EXPECTED: ", reportList(expected));


    let partiallyInverted = linkedListLib.InvertLinkedListPartial(head, m, n);
    console.log("RESULT:   ", reportList(partiallyInverted));

    assert.deepEqual(partiallyInverted, expected);
  });

  it("Works on an small list", () => {
    let head = createLinkedList(3);
    let m = 2;
    let n = 3;
    let inverted = linkedListLib.InvertLinkedListPartial(head, m, n);
    let expected = {
      data: 1,
      next: {
        data: 3,
        next: {
          data: 2,
          next: null
        }
      }
    };
    console.log("EXPECTED: ", reportList(expected));
    console.log("RESULT:   ", reportList(inverted));

    assert.deepEqual(expected, inverted);
  });

  it("Works on an VERY small list", () => {
    let head = createLinkedList(1);
    let m = 1;
    let n = 1;
    let inverted = linkedListLib.InvertLinkedListPartial(head, m, n);
    let expected = {
      data: 1,
      next: null
    };
    console.log("EXPECTED: ", reportList(expected));
    console.log("RESULT:   ", reportList(inverted));

    assert.deepEqual(expected, inverted);
  });

  it("Inverts a big list", () => {
    let head = {
      data: 10000,
      next: null
    };
    for (let i = 9999; i >= 1; i--) {
      let newNode = {
        data: i,
        next: head
      };
      head = newNode;
    }
    let m = 2;
    let n = 10000;
    let inverted = linkedListLib.InvertLinkedListPartial(head, m, n);
    let expectedData = 10000;
    currentNode = inverted;
    while (currentNode.data > 1) {
      assert.equal(currentNode.data, expectedData);
      expectedData--;
      currentNode = currentNode.next;
    }
  });

  it("Can process a complete list", () => {
    let head = createLinkedList(2);
    let m = 1;
    let n = 2;
    let inverted = linkedListLib.InvertLinkedListPartial(head, m, n);
    let expected = {
      data: 2,
      next: {
        data: 1,
        next: null
      }
    };
    console.log("EXPECTED: ", reportList(expected));
    console.log("RESULT:   ", reportList(inverted));

    assert.deepEqual(inverted, expected);
  });
});

describe("Detect Cycle Naive", () => {
  it("Detects cycle of happy path 1>2>4>6>8>4...", () => {
    let inputList = detectCycle_happyPathInput();
    let expectedResultData = 8;
    let actualResult = linkedListLib.DetectCycle_Naive(inputList);
    console.log("ASSERTION DATA", actualResult.data, expectedResultData);
    assert.equal(actualResult.data, expectedResultData);
  });

  it("Detects cycle on BIG LIST 100000", () => {
    let max = 10000000;
    let inputList = createLinkedList(max, 10);
    console.log("BIGLIST", inputList);
    let expectedResultData = max;
    console.time("Big List Naive");
    let actualResult = linkedListLib.DetectCycle_Naive(inputList, max * 10);
    console.timeEnd("Big List Naive");
    assert.equal(actualResult.data, expectedResultData);
  });

  it("Can process a null input", () => {
    let uniqueNode = null;
    let expectedResult = false;
    let actualResult = linkedListLib.DetectCycle_Naive(uniqueNode);
    assert.equal(actualResult, expectedResult);
  });

  it("Can detect an uncycled ODD list", () => {
    let uncycledList = createLinkedList(3);
    let expectedResult = false;
    let actualResult = linkedListLib.DetectCycle_Naive(uncycledList, 100);
    assert.equal(actualResult, expectedResult);
  });

  it("Can detect an uncycled EVEN list", () => {
    let uncycledList = createLinkedList(4);
    let expectedResult = false;
    let actualResult = linkedListLib.DetectCycle_Naive(uncycledList, 100);
    assert.equal(actualResult, expectedResult);
  });

  it("Can process a one node list pointing to itself", () => {
    let uniqueNode = { data: 999 };
    uniqueNode.next = uniqueNode;
    let expectedResult = 999
    let actualResult = linkedListLib.DetectCycle_Naive(uniqueNode, 10);
    assert.equal(actualResult.data, expectedResult);
  });  
});

describe("Detect Cycle Floyd", () => {
  it("Detects cycle on happy path 1>2>4>6>8>4...", () => {
    let inputList = detectCycle_happyPathInput();
    let expectedResultData = 8;
    console.time("Happy Path Floyd");
    let actualResult = linkedListLib.DetectCycle_Floyd(inputList, 20);
    console.timeEnd("Happy Path Floyd");
    assert.equal(actualResult.data, expectedResultData);
  });

  it("Detects cycle on BIG LIST 100000", () => {
    let max = 10000000;
    let inputList = createLinkedList(max, 10);
    console.log("BIGLIST", inputList);
    let expectedResultData = max;
    console.time("Big List Floyd");
    let actualResult = linkedListLib.DetectCycle_Floyd(inputList, max * 10);
    console.timeEnd("Big List Floyd");
    assert.equal(actualResult.data, expectedResultData);
  });

  it("Can process a null input", () => {
    let uniqueNode = null;
    let expectedResult = false;
    let actualResult = linkedListLib.DetectCycle_Floyd(uniqueNode, 10);
    assert.equal(actualResult, expectedResult);
  });

  it("Can detect an uncycled ODD list", () => {
    let uncycledList = createLinkedList(3);
    let expectedResult = false;
    let actualResult = linkedListLib.DetectCycle_Floyd(uncycledList, 100);
    assert.equal(actualResult, expectedResult);
  });

  it("Can detect an uncycled EVEN list", () => {
    let uncycledList = createLinkedList(4);
    let expectedResult = false;
    let actualResult = linkedListLib.DetectCycle_Floyd(uncycledList, 100);
    assert.equal(actualResult, expectedResult);
  });

  it("Can process a one node list pointing to itself", () => {
    let uniqueNode = { data: 999 };
    uniqueNode.next = uniqueNode;
    let expectedResult = 999
    let actualResult = linkedListLib.DetectCycle_Floyd(uniqueNode, 10);
    assert.equal(actualResult.data, expectedResult);
  });
});

/**
 * Creates a happy path input linked list with cycle 8>4
 * @returns head of cycled linked list 1>2>4>6>8>4...
 */
function detectCycle_happyPathInput() {
  let node8 = { data: 8, next: null };
  let node6 = { data: 6, next: node8 };
  let node4 = { data: 4, next: node6 };
  let node2 = { data: 2, next: node4 };
  let node1 = { data: 1, next: node2 };
  node8.next = node4;

  return node1;
};


/*
  Output: 1>2>6>5>4>3>7>null
            ----------
*/
function partialHappyCaseResult() {
  let node7 = {
    data: 7,
    next: null
  };
  let node3 = {
    data: 3,
    next: node7
  };
  let node4 = {
    data: 4,
    next: node3
  };
  let node5 = {
    data: 5,
    next: node4
  };
  let node6 = {
    data: 6,
    next: node5
  };
  let node2 = {
    data: 2,
    next: node6
  };
  let node1 = {
    data: 1,
    next: node2
  };

  return node1;
}

function createLinkedList(maxVal, cycleNumber) {
  let head = {
    data: maxVal,
    next: null
  };
  let tail = head;
  let cycleNode = null;


  for (let i = maxVal - 1; i >= 1; i--) {
    let newNode = {
      data: i,
      next: head
    };

    if (cycleNumber && newNode.data === cycleNumber) {
      cycleNode = newNode;
    }

    head = newNode;
  }

  tail.next = cycleNode;

  return head;
}

function reportList(head) {
  let max = 10;
  let currentNode = head;
  let result = "";
  let i = 1;
  while (currentNode) {
    result = result + `${currentNode.data}>`;
    currentNode = currentNode.next;
    if (i > max) break;
    i++;
  }

  return (`${result}null`);
}
