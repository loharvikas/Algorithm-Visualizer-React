import getNeighbours from "./findneighbours";

function bfs(grid, startNode) {
  startNode.visited = true;
  let row = startNode.row;
  let col = startNode.col;
  let queue = [[row, col]];
  let targetNode;
  const visitedNode = [];
  while (queue.length > 0) {
    const node = queue.shift();
    row = node[0];
    col = node[1];

    const neighbours = getNeighbours(row, col, grid);

    for (let i = 0; i < neighbours.length; i++) {
      const element = neighbours[i];
      const nodeRow = element[0];
      const nodeCol = element[1];
      const neighElement = grid[nodeRow][nodeCol];
      neighElement.parent = node;
      if (neighElement.endNode) {
        queue = [];
        targetNode = neighElement;
        break;
      }
      neighElement.visited = true;
      visitedNode.push([nodeRow, nodeCol]);
      queue.push([nodeRow, nodeCol]);
    }
  }
  const shortestPath = getShortestPath(targetNode, grid);
  return [visitedNode, shortestPath];
}

function getShortestPath(node, grid) {
  const shortestPath = [];
  while (node.parent) {
    shortestPath.push(node.parent);
    node = grid[node.parent[0]][node.parent[1]];
  }
  return shortestPath;
}

export default bfs;
