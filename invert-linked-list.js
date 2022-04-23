(() => {

  /***
  1>2>3>4>5>null
  null<1<2<3<4<5
  **/
  function invertLinkedList(head) {
    let newHead = null; //                 null
    let currentNode = head; //             1>2
    while (currentNode) { //               1>2     2>3     3>4   4>5     5>null  null
      let nextNode = currentNode.next; //  2>3     3>4     4>5   5>null  null
      currentNode.next = newHead; //       null    1>null  2>3   3>4     4>5 ****
      newHead = currentNode; //            1>null  2>1>n   3>2>1 4>3>2>1 5>4 ****
      currentNode = nextNode; //           2>3     3>4     4>5   5>null  null
    }

    return newHead; // 5>4>3>2>1>null
  }


  /**
   * Happy Test Case
   * Input:  1>2>3>4>5>6>7>null m:3, n:6
   *             m     n
   * Output: 1>2>6>5>4>3>7>null
   *           - - - - -        << Items to modify
   *
   * Constraints:
   * 1<=m<=n<=tail (m and n will always be under the bounds of the list)

    i,m,n
    1,3,6
    1>2>3>4>5>6>7>null m:3, n:6
    i=1:   1>2                i<m-1
    i=2*:  1>2?               i==m-1    2? = invertHead
    i=3*:  1>2?3?             i==m      3? = invertTail
    i=4*:  1>2?4>3?           i>m && i<n
    i=5*:  1>2?5>4>3?         i>m && i<n
    i=6*:  1>2>6>5>4>3?       i==n > resolve invertHead.next
    i=7!:  1>2>6>5>4>3>7>null i>n

    !RESULT: 1>2>6>5>4>3>7>null

   */
  function invertLinkedListPartial(head, m, n) {
    if (m === n) return head; //QUICK EXIT

    let currentNode = head;
    let currentPos = 1;
    let invertEntry = null; //node that points to the inverted portion
    let invertExit = null; //node that the inverted tail must point at the end

    let headToInvert = null; //begining of the list that must be inverted
    let tailToInvert = null; //end of the list that must be inverted

    while (currentNode) {
      if (currentPos === m - 1) {
        invertEntry = currentNode;
      }

      if (currentPos === m) {
        headToInvert = currentNode;
      }

      if (currentPos === n) {
        tailToInvert = currentNode;
      }

      if (currentPos > n) {
        invertExit = currentNode;
        break;
      }

      currentNode = currentNode.next;
      currentPos++;
    }

    tailToInvert.next = null

    let invertedPart = invertLinkedList(headToInvert);

    invertExit ? headToInvert.next = invertExit : null;

    if(invertEntry){
      invertEntry.next = invertedPart;
      return head;
    } else {
      return invertedPart;
    }
  }

  exports.InvertLinkedList = invertLinkedList;
  exports.InvertLinkedListPartial = invertLinkedListPartial;
})();
