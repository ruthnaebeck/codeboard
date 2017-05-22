/* global chai describe it beforeEach minimalHeightBST */

describe('Trees & Graphs - Minimal Height BST', function() {
  it('Your function failed to return an empty tree with no values.', function() {
    let tree = minimalHeightBST(null)
    chai.expect(tree).to.be.null
    tree = minimalHeightBST([])
    chai.expect(tree).to.be.null
  })

  it('Your function failed to return a tree with a root node set that has one value.', function() {
    const tree = minimalHeightBST([10])
    chai.expect(tree.value).to.equal(10)
  })

  it('Your function failed to return a balanced tree with 10 nodes.', function() {
    const tree = minimalHeightBST([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    chai.expect(isBalanced(tree)).to.be.true
  })

  it('Your function failed to return a balanced tree with 13 nodes.', function() {
    const tree = minimalHeightBST([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    chai.expect(isBalanced(tree)).to.be.true
  })

  it('Your function failed to return a balanced tree with 255 nodes.', function() {
    const values = []
    for (let i = 1; i <= 255; ++i) {
      values.push(i)
    }
    const tree = minimalHeightBST(values)
    chai.expect(isBalanced(tree)).to.be.true
  })
})

function isBalanced(tree) {
  if (!tree) return true

  const cache = {
    min: Number.MAX_SAFE_INTEGER,
    max: Number.MIN_SAFE_INTEGER
  }

  findDepth(cache, tree, 0)
  return cache.max - cache.min <= 1
}

function findDepth(cache, node, depth) {
  if (!node) {
    if (depth < cache.min) {
      cache.min = depth
    }
    if (depth > cache.max) {
      cache.max = depth
    }
  } else {
    findDepth(cache, node.left, depth + 1)
    findDepth(cache, node.right, depth + 1)
  }
}
