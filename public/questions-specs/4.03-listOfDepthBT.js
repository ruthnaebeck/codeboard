// ITERATIVE BREADTH-FIRST SEARCH SOLUTION
// O(N) TIME AND SPACE
function linkedListsOfBTDepth(tree) {
  if (!tree.root) return []

  const queue = [tree.root], lists = []
  tree.root.level = 0

  while (queue.length) {
    const parent = queue.shift()

    if (!lists[parent.level]) lists[parent.level] = new LinkedList()
    lists[parent.level].append(parent.value)

    if (parent.left) {
      parent.left.level = parent.level + 1
      queue.push(parent.left)
    }

    if (parent.right) {
      parent.right.level = parent.level + 1
      queue.push(parent.right)
    }
  }

  return lists
}

var LinkedListNode = class {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

var LinkedList = class {
  constructor() {
    this.head = this.tail = null
  }

  prepend(value) {
    if (!this.head) {
      this.head = this.tail = new LinkedListNode(value)
    } else {
      this.head = new LinkedListNode(value, this.head)
    }
  }

  append(value) {
    if (!this.head) {
      this.head = this.tail = new LinkedListNode(value)
    } else {
      this.tail = this.tail.next = new LinkedListNode(value)
    }
  }

  toArray() {
    let arr = [], node = this.head
    while (node) {
      arr.push(node.value)
      node = node.next
    }
    return arr
  }
}
