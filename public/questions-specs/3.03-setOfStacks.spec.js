/* global chai describe it beforeEach setOfStacks */

describe('Stacks & Queues - Set of Stacks', function() {
  beforeEach(function() {
    this.stack = new setOfStacks(4)
  })

  it('Your class failed to throw an error when max size is not passed in.', function() {
    chai.expect(() => new setOfStacks()).to.throw(Error)
  })

  it('Your function failed to pop items in the correct order.', function() {
    let i
    for (i = 1; i <= 100; ++i) {
      this.stack.push(i)
    }

    for (i = 100; i > 0; --i) {
      chai.expect(this.stack.pop()).to.equal(i)
    }
  })

  it('Your function failed to use pop correctly after using pop at to remove one item from each stack.', function() {
    let i
    for (i = 1; i <= 16; ++i) {
      this.stack.push(i)
    }
    for (i = 4; i >= 1; --i) {
      chai.expect(this.stack.popAt(i)).to.equal(i * 4)
    }
    for (i = 16; i > 0; --i) {
      if (i % 4) {
        chai.expect(this.stack.pop()).to.equal(i)
      }
    }
  })

  it('Your function failed when using push then pop at to remove whole stacks worth of items from the middle.', function() {
    let i
    for (i = 1; i <= 20; ++i) {
      this.stack.push(i)
    }

    for (i = 0; i < 9; ++i) {
      chai.expect(this.stack.popAt(2)).to.equal(8 + i)
    }

    [20, 19, 18, 17, 7, 6, 5, 4, 3, 2, 1].forEach(v =>
      chai.expect(this.stack.pop()).to.equal(v))
  })
})
