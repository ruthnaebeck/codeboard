function helperLLtoArr(list) {
  let arr = [],
    node = list
  while (node !== null) {
    arr.push(node.value)
    node = node.next
  }
  return arr
}

function helperCreateNode(value, next = null) {
  return {
    value,
    next
  }
}

function helperArrToLL(arr) {
  if (arr.length === 0) {
    return null
  }

  let list = null
  for (let i = arr.length - 1; i >= 0; --i) {
    list = helperCreateNode(arr[i], list)
  }
  return list
}

function helperGetListLength(list) {
  let length = 0
  while (list) {
    list = list.next
    ++length
  }
  return length
}

function helperCreateLinkedList() {
  return {
    head: null,
    tail: null
  }
}

function helperPushSingle(list, value) {
  const node = helperCreateNode(value)
  if (list.head) {
    list.tail.next = node
    list.tail = node
  } else {
    list.head = node
    list.tail = node
  }
}

function helperPush(list) {
  for (let i = 1; i < arguments.length; ++i) {
    helperPushSingle(list, arguments[i])
  }
}
