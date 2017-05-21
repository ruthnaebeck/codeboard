/* global chai describe it beforeEach checkBalancedBT */

describe('Trees & Graphs - Check Balanced BT', function() {
  beforeEach(function() {
    this.tree = new Tree()
  })

  it('Your function failed to return true for a null tree or root.', function() {
    chai.expect(checkBalancedBT(null)).to.be.true
    chai.expect(checkBalancedBT(this.tree)).to.be.true
  })

  it('Your function failed to return true for a single node tree.', function() {
    this.tree.add(10)
    chai.expect(checkBalancedBT(this.tree)).to.be.true
  })

  it('Your function failed to return false for a left heavy tree.', function() {
    this.tree.add(10)
    this.tree.add(9)
    this.tree.add(8)
    chai.expect(checkBalancedBT(this.tree)).to.be.false
  })

  it('Your function failed to return false with an equal max height tree that is uneven.', function() {
    this.tree.add(10)
    this.tree.add(11)
    this.tree.add(12)
    this.tree.add(13)
    this.tree.add(9)
    this.tree.add(8)
    this.tree.add(7)
    chai.expect(checkBalancedBT(this.tree)).to.be.false
  })

  it('Your function failed to return true for a larger balanced tree.', function() {
    this.tree.add(8)
    chai.expect(checkBalancedBT(this.tree), 'root').to.be.true
    this.tree.add(4)
    this.tree.add(12)
    chai.expect(checkBalancedBT(this.tree), 'depth 1').to.be.true
    this.tree.add(2)
    this.tree.add(6)
    this.tree.add(10)
    this.tree.add(14)
    chai.expect(checkBalancedBT(this.tree), 'depth 2').to.be.true
    this.tree.add(1)
    this.tree.add(3)
    this.tree.add(5)
    this.tree.add(7)
    chai.expect(checkBalancedBT(this.tree), '1/2 depth 3').to.be.true
    this.tree.add(9)
    this.tree.add(11)
    this.tree.add(13)
    this.tree.add(15)
    chai.expect(checkBalancedBT(this.tree), 'depth 3').to.be.true
    this.tree.add(16)
    chai.expect(checkBalancedBT(this.tree), '1 depth 4').to.be.true
  })
})

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
