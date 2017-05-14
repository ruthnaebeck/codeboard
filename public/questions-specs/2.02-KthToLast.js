// USING A RUNNER
// O(N) TIME --- O(1) SPACE

function kthToLast(list, k) {
  if (!list) throw Error('invalid list')

  let aheadPointer = list, behindPointer = list

  for (let i = 0; i < k; i++) {
    if (!aheadPointer.next) throw Error('list is not long enough')
    aheadPointer = aheadPointer.next
  }

  while (aheadPointer.next) {
    aheadPointer = aheadPointer.next
    behindPointer = behindPointer.next
  }

  return behindPointer.value
}


// USING A COUNTER

function kthToLast(list, k) {
  if (!list) throw Error('invalid list')

  let indexCounter = -1, head = list

  while (head) {
    indexCounter++
    head = head.next
  }

  if (indexCounter < k) throw Error('list is not long enough')

  while (indexCounter-- > k) list = list.next

  return list.value
}
