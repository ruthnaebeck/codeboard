/* global chai describe it beforeEach queueViaStacks */

describe('Stacks & Queues - Three Stacks in One', function() {
  beforeEach(function() {
    this.queue = new queueViaStacks()
  })

  it('Your class failed. Dequeue should throw an error when queue is empty.', function() {
    chai.expect(() => this.queue.dequeue()).to.throw(Error)
  })

  it('Your class failed to enqueue and dequeue items.', function() {
    for (let i = 0; i < 10; ++i) {
      let j
      for (j = 1; j <= 100; ++j) {
        this.queue.enqueue(j)
      }
      for (j = 1; j <= 100; ++j) {
        chai.expect(this.queue.dequeue()).to.equal(j)
      }
    }
  })

  it('Your class failed to perform alternating enqueue and dequeue operations.', function() {
    this.queue.enqueue(10)
    this.queue.enqueue(20)
    this.queue.enqueue(30)
    chai.expect(this.queue.dequeue()).to.equal(10)
    this.queue.enqueue(40)
    chai.expect(this.queue.dequeue()).to.equal(20)
    chai.expect(this.queue.dequeue()).to.equal(30)
    chai.expect(this.queue.dequeue()).to.equal(40)
    this.queue.enqueue(50)
    this.queue.enqueue(60)
    this.queue.enqueue(70)
    chai.expect(this.queue.dequeue()).to.equal(50)
    chai.expect(this.queue.dequeue()).to.equal(60)
    this.queue.enqueue(80)
    chai.expect(this.queue.dequeue()).to.equal(70)
    this.queue.enqueue(90)
    chai.expect(this.queue.dequeue()).to.equal(80)
    chai.expect(this.queue.dequeue()).to.equal(90)
  })
})
