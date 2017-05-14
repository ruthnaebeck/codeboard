/* global chai describe it helperLLtoArr helperArrToLL kthToLast */

describe('Linked Lists - Kth to Last', function() {
  it('. It should throw an error for null or undefined lists.', function() {
    chai.expect(() => kthToLast(null)).to.throw(Error)
    chai.expect(() => kthToLast(undefined)).to.throw(Error)
  })
  it('. It should throw an error for lists less than or equal to K.', function() {
    chai.expect(() => kthToLast(helperArrToLL([1]), 1)).to.throw(Error)
    chai.expect(() => kthToLast(helperArrToLL([1, 2, 3]), 3)).to.throw(Error)
    chai.expect(() => kthToLast(helperArrToLL([1, 2, 3]), 4)).to.throw(Error)
  });

  [
    {
      list: [5],
      k: 0
    },
    {
      list: [8, 5, 1],
      k: 0
    },
    {
      list: [8, 5, 1],
      k: 1
    },
    {
      list: [8, 5, 1],
      k: 2
    },
    {
      list: [8, 8, 9, 9, 9, 6, 6, 4, 4, 6, 6, 4, 4, 6, 9, 4, 8, 2, 3, 1],
      k: 8
    },
    {
      list: [8, 8, 9, 9, 9, 6, 6, 4, 4, 6, 6, 4, 4, 6, 9, 4, 8, 2, 3, 1],
      k: 16
    }
  ].forEach(context => {
    it('to get the K to last element in the list', function() {
      let list = helperArrToLL(context.list)
      let expected = context.list[context.list.length - 1 - context.k]
      chai.expect(kthToLast(list, context.k)).to.eql(expected)
    })
  })
})
