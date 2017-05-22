/* global chai describe it helperLLtoArr helperArrToLL deleteMiddleNode */

describe('Linked Lists - Delete Middle Node', function() {
  it('Your function failed. It should throw an error if the node is invalid', function() {
    chai.expect(() => deleteMiddleNode(null)).to.throw(Error)
    chai.expect(() => deleteMiddleNode(undefined)).to.throw(Error)
    chai.expect(() => deleteMiddleNode(helperArrToLL([11]))).to.throw(Error)
  })

  it('Your function failed to delete multiple nodes in a long list.', function() {
    const list = helperArrToLL([8, 6, 4, 2, 1])
    deleteMiddleNode(list)
    deleteMiddleNode(list)
    deleteMiddleNode(list)
    deleteMiddleNode(list)
    chai.expect(list.value).to.equal(1)
    chai.expect(list.next).to.be.null
  });

  [
    {
      list: [5, 8],
      node: 0,
      expected: [8]
    },
    {
      list: [5, 8, 3, 2, 7, 1, 4, 9, 15, 30],
      node: 8,
      expected: [5, 8, 3, 2, 7, 1, 4, 9, 30]
    },
    {
      list: [5, 8, 3, 2, 7, 1, 4, 9, 15, 30],
      node: 4,
      expected: [5, 8, 3, 2, 1, 4, 9, 15, 30]
    },
    {
      list: [5, 8, 3, 2, 7, 1, 4, 9, 15, 30],
      node: 1,
      expected: [5, 3, 2, 7, 1, 4, 9, 15, 30]
    },
    {
      list: [5, 8, 3, 2, 7, 1, 4, 9, 15, 30],
      node: 2,
      expected: [5, 8, 2, 7, 1, 4, 9, 15, 30]
    }
  ].forEach(context => {
    it('Your function failed to delete a given node from a list.', function() {
      let list = helperArrToLL(context.list),
        node = list
      for (let i = 0; i < context.node; ++i) {
        node = node.next
      }
      deleteMiddleNode(node)
      chai.expect(helperLLtoArr(list)).to.eql(context.expected)
    })
  })
})
