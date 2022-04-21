const assert = require("assert");
const ill = require("../invert-linked-list");
const jnc = require("jnconsole");
describe("invert-linked-list script", () => {
  it("Instantiates the module with a public function InvertLinkedList", () => {
    assert.notEqual(ill, undefined, "ill module should not be undefined");
    assert.notEqual(ill.InvertLinkedList, undefined, "ill.InvertLinkedList function not found in module");
  });

  it("Inverts a linked list", () => {
    const node5 = { data: 5, next: null };
    const node4 = { data: 4, next: node5 };
    const node3 = { data: 3, next: node4 };
    const node2 = { data: 2, next: node3 };
    const node1 = { data: 1, next: node2 };
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
    let head = { data: 10000, next: null };
    for (let i = 9999; i >= 1; i--) {
      let newNode = { data: i, next: head };
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

    head = { data: 0, next: null }

  });

  it("Inverts a one element list", () => {
    let head = { data: 0, next: null };
    let inverted = ill.InvertLinkedList(head);
    assert.deepEqual(head, inverted);
  });
});
