var queueViaStacks = class {
  constructor() {
    this.newStack = []
    this.oldStack = []
  }

  enqueue(value) {
    this.newStack.push(value)
  }

  dequeue() {
    this.shiftStacks()
    return this.oldStack.pop()
  }

  peek() {
    this.shiftStacks()
    return this.oldStack[this.oldStack.length - 1]
  }

  shiftStacks() {
    const newStackLength = this.newStack.length,
      oldStackLength = this.oldStack.length

    if (!newStackLength && !oldStackLength) throw Error('Queue is empty')
    if (!oldStackLength) {
      while (this.newStack.length) {
        this.oldStack.push(this.newStack.pop())
      }
    }
  }
}
