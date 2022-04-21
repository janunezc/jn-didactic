/**
 * Goal: invert a linked list
 * a->b->c->d->e->null
 * e->d->c->b->a->null
 */

(() => {

  /***
  1>2>3>4>5>null
  null<1<2<3<4<5
  
  
  
  **/
  function invertLinkedList(head) {
    let newHead = null;//                 null
    let currentNode = head;//             1>2
    while (currentNode) {//               1>2     2>3     3>4   4>5     5>null  null
      let nextNode = currentNode.next;//  2>3     3>4     4>5   5>null  null
      currentNode.next = newHead;//       null    1>null  2>3   3>4     4>5 ****
      newHead = currentNode;//            1>null  2>1>n   3>2>1 4>3>2>1 5>4 ****
      currentNode = nextNode;//           2>3     3>4     4>5   5>null  null
    }

    return newHead; // 5>4>3>2>1>null
  }

  exports.InvertLinkedList = invertLinkedList;
})();
