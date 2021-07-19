export default function dfsMazeGenerator(grid) {
    const stack = [] //To keep track of current node
    const visitedNode = []
    let currentPos = [0, 0]
    let futureWalls = [true, true, true, true]
    do {
        const i = currentPos[0];
        const j = currentPos[1];
        const currentNode = grid[i][j]
        if(!currentNode.visited) {
            stack.push([i, j]);
            visitedNode.push([i, j, futureWalls])
            currentNode.visited = true
        }
        cellPos = getRandomPos(i,j, grid);
        if(cellPos){
          breakWalls(grid, currentPos, cellPos)
          currentPos = cellPos
        }
        else{
          currentPos = stack.pop()
        }

    }
    while( stack.length > 0)
    return visitedNode
}

function getRandomPos(i, j, grid) {
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
    const randomNumber = parseInt(Math.random()*neighbours.length)
    return neighbours[randomNumber]
  }
  

  function breakWalls(grid, prev, current) {
    let prevX = prev[0];
    let prevY = prev[1];
    let currX = current[0];
    let currY = current[1];
    const prevCellElement = grid[prevX][prevY]
    const currCellElement = grid[currX][currY]
    diffX = prevX - currX;
    diffY = prevY - currY;
    if (diffX === 0) {
        if (diffY === 1){
            prevCellElement.borders[3] = false
            currCellElement.borders[1] = false
    
        }
        else if  (diffY === -1) {
            prevCellElement.borders[1] = false
            currCellElement.borders[3] = false
        }
    }
    else {
        if (diffX === 1){
            prevCellElement.borders[0] = false
            currCellElement.borders[2] = false
        
        }
        else if (diffX === -1){
            prevCellElement.borders[2] = false
            currCellElement.borders[0] = false

        }
    }
}
