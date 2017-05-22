function partition(list, partitionNum) {
  let smallerHead, smallerTail, largerHead, largerTail
  smallerHead = smallerTail = largerHead = largerTail = null

  while (list) {
    const nextNode = list.next
    list.next = null
    if (list.value < partitionNum) {
      if (smallerHead) {
        smallerTail = smallerTail.next = list
      } else {
        smallerHead = smallerTail = list
      }
    } else {
      if (largerHead) {
        largerTail = largerTail.next = list
      } else {
        largerHead = largerTail = list
      }
    }
    list = nextNode
  }

  if (smallerTail) {
    smallerTail.next = largerHead
  }
  return smallerHead || largerHead
}
