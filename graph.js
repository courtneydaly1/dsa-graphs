class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes){
      if(node.adjacent.has(vertex)){
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const res = [];

    function transverse(vertex) {
      if(!vertex){
        return null;
      }
      visited.add(vertex);
      res.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if( !visited.has(neighbor)){
          return transverse(neighbor);
        }
      });
    }
    transverse(start);
    return res;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const res = [];
    const visited = new Set();
    let currentVertex;

    // visit node
    visited.add(start);

    while (queue.length){
      currentVertex = queue.shift();
      res.push(currentVertex.value);

      currentVertex.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)){
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return res;
  }
  shortestPath(start, end) {
    if (start === end) {
      return [start.value];
    }

    var queue = [start];
    let visited = new Set();
    let predecessors = {};
    let path = [];

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {
        let stop = predecessors[end.value];
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(start.value);
        path.reverse();
        return path;
      }

      visited.add(currentVertex);
      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }
}

}

module.exports = {Graph, Node}