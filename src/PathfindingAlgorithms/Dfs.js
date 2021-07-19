import getNeighbours from "./findneighbours";

let found = false;

export default function dfs(grid, startNode) {
  const visitedNode = [];
  dfs_util(grid, startNode, visitedNode);
  return visitedNode;
}

function dfs_util(grid, startNode, visitedNode) {
  if (found === true) {
    return;
  }
  const row = startNode.row;
  const col = startNode.col;

  const neighbours = getNeighbours(row, col, grid);

  if (neighbours.length === 0) {
    return;
  }

  neighbours.forEach((neigh) => {
    const neighElement = grid[neigh[0]][neigh[1]];
    if (neighElement.visited === false) {
      if (neighElement.endNode === true) {
        found = true;
      }

      if (found !== true) {
        neighElement.visited = true;
        visitedNode.push([neighElement.row, neighElement.col]);
        return dfs_util(grid, neighElement, visitedNode);
      }
    }
  });
}
