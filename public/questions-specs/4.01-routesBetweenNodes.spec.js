/* global chai describe it beforeEach routesBetweenNodes */

var adjList = [
  [1],
  [0, 4, 5],
  [3, 4, 5],
  [2, 6],
  [1, 2],
  [1, 2, 6],
  [3, 5],
  [7]
]

describe('Trees & Graphs - Routes Between Nodes', function() {
  it('Your function should throw an error if given an invalid graph', function() {
    chai.expect(() => routesBetweenNodes(null)).to.throw(Error)
    chai.expect(() => routesBetweenNodes(undefined)).to.throw(Error)
  })

  it('Your function should throw an error with an invalid start node', function() {
    chai.expect(() => routesBetweenNodes(adjList, 99)).to.throw(Error)
  })

  it('Your function should return the correct true or false for a single node graph', function() {
    const list = [ [] ]
    chai.expect(routesBetweenNodes(list, 0, 0)).to.be.true
    chai.expect(routesBetweenNodes(list, 0, 3)).to.be.false
  })

  it('Your function should return the correct true or false for a larger graph', function() {
    chai.expect(routesBetweenNodes(adjList, 0, 4)).to.be.true
    chai.expect(routesBetweenNodes(adjList, 0, 3)).to.be.true
    chai.expect(routesBetweenNodes(adjList, 3, 6)).to.be.true

    chai.expect(routesBetweenNodes(adjList, 7, 3)).to.be.false
    chai.expect(routesBetweenNodes(adjList, 6, 7)).to.be.false
    chai.expect(routesBetweenNodes(adjList, 1, 11)).to.be.false
  })
})
