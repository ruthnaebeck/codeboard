// ITERATIVE BREADTH FIRST SEARCH
// O(E) TIME --- O(V) SPACE
// E = Edges --- V = Vertices

function routesBetweenNodes(graph, start, target) {
  errorCheck(graph, start)

  if (start === target) return true

  const visited = new Set(),
    queue = [start]

  while (queue.length) {
    const currentNode = queue.shift()
    for (const neighbour of graph[currentNode]) {
      if (!visited.has(neighbour)) {
        if (neighbour === target) return true
        visited.add(neighbour)
        queue.push(neighbour)
      }
    }
  }

  return false
}


// Helper Function
function errorCheck(graph, start) {
  if (!Array.isArray(graph)) throw Error('invalid graph')
  if (!graph[start]) throw Error('invalid start node')
}


// RECURSIVE DEPTH FIRST SEARCH
// O(E) TIME --- O(V) SPACE

function routesBetweenNodes(graph, start, target) {
  errorCheck(graph, start)
  return searchDFS(graph, start, target, new Set())
}

function searchDFS(graph, start, target, visited) {
  if (start === target) return true

  visited.add(start)

  for (const neighbour of graph[start]) {
    if (!visited.has(neighbour)) {
      if (searchDFS(graph, neighbour, target, visited)) return true
    }
  }

  return false
}
