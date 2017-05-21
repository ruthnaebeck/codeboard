/* global chai describe it beforeEach linkedListsOfBTDepth */

describe('Trees & Graphs - List of Depth BT', function() {
  beforeEach(function() {
    this.tree = new Tree()
  })

  it('Your function failed to return an empty list for an empty tree.', function() {
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree))).to.eql([])
  })

  it('Your function failed on a single node tree.', function() {
    this.tree.add(10)
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree))).to.eql([[10]])
  })

  it('Your function failed to return single value lists for a left heavy tree', function() {
    [10, 9, 8].forEach(v => this.tree.add(v))
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree))).to.eql([
      [10],
      [9],
      [8]
    ])
  })

  it('Your function failed to return two value lists for an upside down V shaped tree.', function() {
    [10, 11, 12, 13, 9, 8, 7].forEach(v => this.tree.add(v))
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree))).to.eql([
      [10],
      [9, 11],
      [8, 12],
      [7, 13]
    ])
  })

  it('Your function failed for a larger balanced tree.', function() {
    const expected = []
    this.tree.add(8)
    expected.push([8])
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree)), 'root').to.be.eql(expected)
    this.tree.add(4)
    this.tree.add(12)
    expected.push([4, 12])
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree)), 'depth 1').to.eql(expected)
    this.tree.add(2)
    this.tree.add(6)
    this.tree.add(10)
    this.tree.add(14)
    expected.push([2, 6, 10, 14])
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree)), 'depth 2').to.eql(expected)
    this.tree.add(1)
    this.tree.add(3)
    this.tree.add(5)
    this.tree.add(7)
    expected.push([1, 3, 5, 7])
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree)), '1/2 depth 3').to.eql(expected)
    this.tree.add(9)
    this.tree.add(11)
    this.tree.add(13)
    this.tree.add(15)
    expected[expected.length - 1].push(9, 11, 13, 15)
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree)), 'depth 3').to.eql(expected)
    this.tree.add(16)
    expected.push([16])
    chai.expect(toArrayOfArrays(linkedListsOfBTDepth(this.tree)), '1 depth 4').to.eql(expected)
  })
})

function toArrayOfArrays(lists) {
  return lists.map(l => l.toArray())
}

var Tree = class {
  constructor() {
    this.root = null
  }

  add(value) {
    const newNode = new TreeNode(value)
    if (!this.root) {
      this.root = newNode
    } else {
      let node = this.root, branch
      while (node) {
        branch = value <= node.value ? 'left' : 'right'
        if (!node[branch]) {
          break
        }
        node = node[branch]
      }
      newNode.parent = node
      node[branch] = newNode
    }
  }
}

var TreeNode = class {
  constructor(value) {
    this.value = value
    this.parent = this.left = this.right = null
  }
}
