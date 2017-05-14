/* global chai describe it beforeEach TripleStack */

describe('Stacks & Queues - Three Stacks in One', function() {
  beforeEach(function() {
    this.tStack = new TripleStack()
  })

  it('Your push and pop methods are not handling values from the middle stack correctly', function() {
    const stack = []
    for (let i = 1; i < 100; i += 4) {
      const val = Math.trunc(Math.random() * 999999)
      this.tStack.push(2, val)
      stack.push(val)
    }
    stack.reverse().forEach(v => chai.expect(this.tStack.pop(2)).to.equal(v))
  })

  it('Your push, peek and pop methods are not handling values from all 3 stacks correctly', function() {
    const stacks = [[], [], []]
    for (let j = 9; j > 0; --j) {
      for (let i = 1; i <= 3; ++i) {
        const val = i * 10 + j
        this.tStack.push(i, val)
        stacks[i - 1].push(val)
        chai.expect(this.tStack.peek(i)).to.equal(val)
      }
    }

    for (let i = 1; i <= 3; ++i) {
      stacks[i - 1].reverse().forEach(v => chai.expect(this.tStack.pop(i)).to.equal(v))
      // chai.expect(this.tStack.isEmpty(i)).to.be.true
    }
  })
})
