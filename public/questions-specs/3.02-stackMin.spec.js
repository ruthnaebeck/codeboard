/* global chai describe it beforeEach stackMin */

describe('Stacks & Queues - Three Stacks in One', function() {
  beforeEach(function() {
    this.stack = new stackMin()
  })

  it('Your function failed. Min should be undefined when the stack is empty.', function() {
    // chai.expect(this.stack.isEmpty()).to.be.true
    chai.expect(this.stack.min()).to.be.undefined
  })

  it('Your function failed to keep min the same when values are pushed in ascending order.', function() {
    const values = [2, 4, 6, 8, 10, 12]

    values.forEach(v => {
      this.stack.push(v)
      chai.expect(this.stack.min()).to.equal(2)
    })

    values.reverse().forEach(v => {
      chai.expect(this.stack.min()).to.equal(2)
      chai.expect(this.stack.pop()).to.equal(v)
    })

    chai.expect(this.stack.min()).to.be.undefined
  })

  it('Your function failed to update min when values are pushed in descending order.', function() {
    const values = [12, 10, 8, 6, 4, 2]

    values.forEach(v => {
      this.stack.push(v)
      chai.expect(this.stack.min()).to.equal(v)
    })

    values.reverse().forEach((v) => {
      chai.expect(this.stack.min()).to.equal(v)
      chai.expect(this.stack.pop()).to.equal(v)
    })

    chai.expect(this.stack.min()).to.be.undefined
  })
})
