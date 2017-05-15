// STACK SIZE IS DYNAMIC

var TripleStack = class {
  constructor() {
    this.stack = []
    this.stackLengths = [0, 0, 0]
  }

  getLength(stackNum) {
    return this.stackLengths[stackNum - 1]
  }

  push(stackNum, value) {
    const stackIndex = this.getLength(stackNum) * 3 + stackNum - 1
    this.stack[stackIndex] = value
    this.stackLengths[stackNum - 1]++
  }

  pop(stackNum) {
    const stackLength = this.getLength(stackNum)
    let value

    if (stackLength > 0) {
      const stackIndex = (stackLength - 1) * 3 + stackNum - 1
      value = this.stack[stackIndex]
      this.stack[stackIndex] = undefined
      this.stackLengths[stackNum - 1]--
    }
    return value
  }

  peek(stackNum) {
    const stackLength = this.getLength(stackNum)
    let value

    if (stackLength > 0) {
      const stackIndex = (stackLength - 1) * 3 + stackNum - 1
      value = this.stack[stackIndex]
    }
    return value
  }

  isEmpty(stackNum) {
    return this.getLength(stackNum) === 0
  }
}
