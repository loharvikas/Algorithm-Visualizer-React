export default function getNeighbours(i, j, grid) {
  const neighbours = [];
  let node;
  if (i - 1 >= 0) {
    node = grid[i - 1][j];
    if (node.wall === false && node.visited === false) {
      neighbours.push([i - 1, j]);
    }
  }
  if (j + 1 < 65) {
    node = grid[i][j + 1];
    if (node.wall === false && node.visited === false) {
      neighbours.push([i, j + 1]);
    }
  }

  if (i + 1 < 25) {
    node = grid[i + 1][j];
    if (node.wall === false && node.visited === false) {
      neighbours.push([i + 1, j]);
    }
  }

  if (j - 1 >= 0) {
    node = grid[i][j - 1];
    if (node.wall === false && node.visited === false) {
      neighbours.push([i, j - 1]);
    }
  }

  return neighbours;
}
