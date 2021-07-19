import getNeighbours from './findneighbours'

export default function dijsktra(grid, startNode){
    const row = startNode.row
    const col = startNode.col
    const stack = [];
    const visitedNode = []
    startNode.distance = 0;
    startNode.parent = null
    stack.push([row][col]);
    x = 100
    while(true) {
        const bestCurrentNode = minimumDistance(grid);
        const bestRow = bestCurrentNode[0];
        const bestCol = bestCurrentNode[1];
        const bestCurrentElement = grid[bestRow][bestCol];
        bestCurrentElement.visited = true;
        visitedNode.push(bestCurrentNode);
        const neighbours = getNeighbours(bestRow, bestCol, grid);
        
        for(let i =0; i < neighbours.length; i++) {
            const Node = neighbours[i]
            const nRow = Node[0];
            const nCol = Node[1];
            const nodeElement = grid[nRow][nCol]
            if(nodeElement.endNode === true) {
                nodeElement.parent = bestCurrentNode
                let shortestPath = getShortestPath(nodeElement, grid);
                console.log('s',shortestPath)
                return [visitedNode, shortestPath]
            }
            

            if(nodeElement.visited === false) { 
                if(nodeElement.distance > nodeElement.weight + bestCurrentElement.distance) {
                    nodeElement.distance = nodeElement.weight + bestCurrentElement.distance
                    nodeElement.parent = bestCurrentNode
                }
            }
            
        }
        x -= 1
    }
}


function minimumDistance(grid) {
    const rows = grid.length;
    const cols = grid[0].length
    let minimumDistance = Infinity;
    let minimumNode = [0, 0]
    for (let i =0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if(!grid[i][j].visited && grid[i][j].distance < minimumDistance) {
                minimumNode = [i, j];
                minimumDistance = grid[i][j].distance;
            }
            }
        }

    return minimumNode;
}

function getShortestPath(node, grid) {
    const shortestPath = [];
    while (node.parent) {
      shortestPath.push(node.parent);
      node = grid[node.parent[0]][node.parent[1]];
    }
    return shortestPath;
  }