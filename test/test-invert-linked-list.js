const assert = require("assert");
const ill = require("../invert-linked-list");
const jnc = require("jnconsole");
describe("invertLinkedList(head)", () => {
  it("Instantiates the module with a public function InvertLinkedList", () => {
    assert.notEqual(ill, undefined, "ill module should not be undefined");
    assert.notEqual(ill.InvertLinkedList, undefined, "ill.InvertLinkedList function not found in module");
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

    let currentNode = ill.InvertLinkedList(head);
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

    let inverted = ill.InvertLinkedList(head);
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
    let inverted = ill.InvertLinkedList(head);
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
    let inverted = ill.InvertLinkedList(head);
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


    let partiallyInverted = ill.InvertLinkedListPartial(head, m, n);
    console.log("RESULT:   ", reportList(partiallyInverted));

    assert.deepEqual(partiallyInverted, expected);
  });

  it("Works on an small list", () => {
    let head = createLinkedList(3);
    let m = 2;
    let n = 3;
    let inverted = ill.InvertLinkedListPartial(head, m, n);
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
    let inverted = ill.InvertLinkedListPartial(head, m, n);
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
    let inverted = ill.InvertLinkedListPartial(head, m, n);
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
    let inverted = ill.InvertLinkedListPartial(head, m, n);
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

function createLinkedList(maxVal) {
  let head = {
    data: maxVal,
    next: null
  };
  for (let i = maxVal - 1; i >= 1; i--) {
    let newNode = {
      data: i,
      next: head
    };
    head = newNode;
  }

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
