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
    i=1:   1>2
    i=2*:  1>2?               i==m-1      invertEntry
    i=3*:  1>2?3?             i==m        headToInvert
    i=4*:  1>2?4>3?
    i=5*:  1>2?5>4>3?
    i=6*:  1>2>6>5>4>3?       i==n        tailToInvert
    i=7!:  1>2>6>5>4>3>7>null i>n         invertExit

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

    while (currentNode) { //            1>2     2>3     3>4     4>5     5>6     6>7       7>null
      if (currentPos === m - 1) { //    1vs2    2vs2    3vs2    4vs2    5vs2    6vs2      7vs2
        invertEntry = currentNode; //            2>3     2>3     2>3     2>3     2>3      2>3
      }

      if (currentPos === m) { //         1vs3    2vs3    3vs3    4vs3    5vs3    6vs3     7vs3
        headToInvert = currentNode; //                   3>4     3>4     3>4     3>4      3>4
      }

      if (currentPos === n) { //         1vs6    2vs6    3vs6    4vs6    5vs6    6vs6     7vs6
        tailToInvert = currentNode; //                                           6>7      6>7
      }

      if (currentPos > n) { //           1vs6    2vs6    3vs6    4vs6    5vs6    6vs6     7vs6*
        invertExit = currentNode; //                                                      7>null
        break; //                                                                         BREAK!
      }

      currentNode = currentNode.next; // 2>3     3>4     4>5     5>6     6>7      7>null
      currentPos++; //                   2       3       4       5       6        7
    }

    tailToInvert.next = null; //                                                          6>null

    let invertedPart = invertLinkedList(headToInvert); //                                 (3>4>5>6>null) => (6>5>4>3>null)

    invertExit ? headToInvert.next = invertExit : null; //                                3>...null ==> 3>...7>null

    if (invertEntry) { //                                                                 2>3
      invertEntry.next = invertedPart; //                                                 2>6>5>4>3>null
      return head; //                                                                     1>2>6>5>4>3>7>null
    } else {
      return invertedPart; //
    }
  }

  exports.InvertLinkedList = invertLinkedList;
  exports.InvertLinkedListPartial = invertLinkedListPartial;
})();
