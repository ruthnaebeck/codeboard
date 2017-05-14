/* global chai describe it helperLLtoArr helperArrToLL removeDupes */

describe('Linked Lists - Remove Duplicates', function() {
  it('to consider the value null', function() {
    chai.expect(removeDupes(null)).to.be.null
  })
  it('to consider the value undefined', function() {
    chai.expect(removeDupes(undefined)).to.be.undefined
  });

  [
    {
      list: [5],
      expected: [5]
    },
    {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  ].forEach(context => {
    it('to return a linked list, originally with no duplicates', function() {
      const list = helperArrToLL(context.list)
      removeDupes(list)
      chai.expect(helperLLtoArr(list)).to.eql(context.expected)
    })
  });

  [
    {
      list: [5, 5, 5, 5, 5],
      expected: [5]
    },
    {
      list: [2, 4, 5, 4, 5, 4, 6, 7, 6, 8],
      expected: [2, 4, 5, 6, 7, 8]
    },
    {
      list: [8, 6, 8, 6],
      expected: [8, 6]
    },
    {
      list: [8, 8, 9, 9, 9, 6, 6, 4, 4, 6, 6, 4, 4, 6, 9, 4, 8, 2, 3, 1],
      expected: [8, 9, 6, 4, 2, 3, 1]
    }
  ].forEach(context => {
    it('to remove duplicates from a linked list that originally had duplicates', function() {
      const list = helperArrToLL(context.list)
      removeDupes(list)
      chai.expect(helperLLtoArr(list)).to.eql(context.expected)
    })
  })
})
