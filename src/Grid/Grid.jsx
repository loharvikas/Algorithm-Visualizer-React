import React, {Component} from 'react'
import './Grid.css'
import Node from './Node/Node'
import bfs from '../PathfindingAlgorithms/Bfs'
import dfs from '../PathfindingAlgorithms/Dfs'
import dfsMazeGenerator from '../MazeGeneratorAlgorithms/dfsMazeGenerator'
import recursiveDivision from '../MazeGeneratorAlgorithms/recursiveDivision'
import dijkstra from '../PathfindingAlgorithms/dijkstra'
const START_NODE = [15, 15]  // Initial Start Node
const END_NODE = [15, 35]    // Initial end Node (target Node)

export default class Grid extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            grid: []
        }
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({
            grid: grid,
            mousePressed: false,
            startNodePressed: false,  // To change start node dynamically
            endNodePressed: false,    //  To change end node dynamically
            previousStartNode: null,  /* Keeping track of previous node so whenever start and end node change   we can remove previous node being start and end node* */
            previousEndNode: null,
            startNode:START_NODE, 
            endNode:END_NODE,
            shiftKeyPressed:false
        }
        )
    }

    // componentWillMount() {
    //     document.addEventListener('keydown', this.handleKeydown(e))
    // }

    handleMouseUp() {
        this.setState(
            {
                mousePressed: false,
                startNodePressed: false,
                endNodePressed: false,
                previousStartNode: null,
                previousEndNode: null,
                shiftKeyPressed:false
            }   
        )
    }



    handleMouseDown(row, col, event) {
        const grid = this.state.grid;
        let shift  = false
        if(event.shiftKey){
            shift = true          
        }
        this.setState({
            mousePressed: true,
            shiftKeyPressed: shift
        })
        
        if (grid[row][col].startNode === true) {
            this.setState(
                {
                    startNodePressed: true,
                    previousStartNode: [row, col]
                }
            )
        }
        else if (grid[row][col].endNode === true) {
            this.setState(
                {
                    endNodePressed: true,
                    previousEndNode: [row, col]
                }
            )
        }
        else {
            
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col, shift);
                this.setState(
                    {
                        gird: newGrid,
                    }
                )
        }
    }

    handleMouseEnter(row, col, event) {
        let shift;
        if(event.shiftKey) {
            shift = true
        }
        if(!this.state.mousePressed) {
            return
        }
        
        if (this.state.startNodePressed) {
            var newGrid = changeStartNode(this.state.grid, row, col);
            const node = this.state.previousStartNode;
            newGrid[node[0]][node[1]].startNode = false

            this.setState(
                {
                    gird: newGrid,
                    previousStartNode: [row, col],
                    startNode: [row, col]
                }
            )
        }
        else if (this.state.endNodePressed) {
            
            var newGrid = changeEndNode(this.state.grid, row, col);
            const node = this.state.previousEndNode;
            newGrid[node[0]][node[1]].endNode = false

            this.setState(
                {
                    gird: newGrid,
                    previousEndNode: [row, col],
                }
            )
        }
        else {
            var newGrid = getNewGridWithWallToggled(this.state.grid, row, col, shift);
            this.setState(
                {
                    gird: newGrid,
                }
            )
        }
        console.log(this.state.grid)
    }

    clearBoard() {
        const grid = this.state.grid
        this.componentDidMount();
        grid.forEach(row => {
            row.forEach(node => {
                const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
                nodeElement.style.border = '1px solid rgb(192, 200, 206)';
                if(node.startNode) {
                   nodeElement.className = 'node node-start'
                }
                else if(node.endNode) {
                    nodeElement.className = 'node node-end'
                }
                else{
                    nodeElement.className = 'node'
                }
            })
        })
    }

    animateVisitedNode(visitedNode, shortestPath) {
        const grid = this.state.grid
        for (let i=0; i <= visitedNode.length; i++) {
            if ( i === visitedNode.length) {
                if(shortestPath) {
                    setTimeout(() => {
                        this.animateShortestPath(shortestPath)
                    }, 10*i);
                    break
                }
            }
            setTimeout(() => {
                const node = visitedNode[i];
                if(!grid[node[0]][node[1]].startNode){
                    document.getElementById(`node-${node[0]}-${node[1]}`).className = 'node node-visited'
                }
            }, 10*i);
           
        }
        return true

    }

    animateShortestPath(shortestPath) {
        const grid = this.state.grid;
        console.log('s',shortestPath)
        for (let i = 0; i < shortestPath.length-1; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                if(!grid[node[0]][node[1]].startNode){
                    document.getElementById(`node-${node[0]}-${node[1]}`).className = 'node shortest'
                }
            }, 50*i)
        }
    }

    animateDfsMazeGenerator(visitedNode, grid) {
        let previousNode;
        for (let i=0; i <= visitedNode.length; i++) {
            setTimeout(() => {
                if(i > 0){
                    previousNode = visitedNode[i-1]
                    document.getElementById(`node-${previousNode[0]}-${previousNode[1]}`).className = 'node   node-visited-maze'
                    
                }
                const node = visitedNode[i];
                const nodeElement = document.getElementById(`node-${node[0]}-${node[1]}`);
                nodeElement.className = 'node node-current';
                // nodeElement.style.border = '1px solid black'
                const currentNode  = grid[node[0]][node[1]];
                const borders = currentNode.borders;
                for(let d=0; d < borders.length; d++) {
                    switch(d) {
                        case 0:
                            if(!borders[0]) {
                                nodeElement.style.borderTop = 'none';
                            }
                            break
                        case 1:
                            if (!borders[1]) {
                                nodeElement.style.borderRight = 'none';
                            }
                        case 2:
                            if (!borders[2]) {
                                nodeElement.style.borderBottom = 'none';
                            }
                        case 3:
                            if (!borders[3]) {
                                nodeElement.style.borderLeft = 'none';
                            }
                    }
                }
                
            }, 50*i);
           
        }
        return true

    }

    bfsShortestPath() {
        const grid = this.state.grid;
        const start = this.state.startNode
        const startNode = grid[start[0]][start[1]]
        const [visitedNode, shortestPath] = bfs(grid, startNode);
        this.animateVisitedNode(visitedNode, shortestPath);
    }

    dfsShortestPath() {
        const grid = this.state.grid;
        const start = this.state.startNode;
        const startNode = grid[start[0]][start[1]]
        const nodes = dfs(grid, startNode);
        const visitedNode = nodes.slice()
        const shortestPath = nodes.reverse()
        this.animateVisitedNode(visitedNode, shortestPath)
    }

    dfsMazeGenerator() {
        const grid = this.state.grid
        const visitedNode = dfsMazeGenerator(grid);
        console.log(grid)
        this.animateDfsMazeGenerator(visitedNode, grid);
    }

    recursiveDivisionMazeGenrator() {
        const grid = this.state.grid
        recursiveDivision(grid);
    }
    
    dijkstraAlgorithm() {
        const grid = this.state.grid;
        const start = this.state.startNode;
        const startNode = grid[start[0]][start[1]]
        const [visitedNode, shortestPath] = dijkstra(grid, startNode);
        this.animateVisitedNode(visitedNode, shortestPath)

    }

    render() {
        const {grid} = this.state;
        return (
            <div className="container">
                <button className="bfs-btn"
                        onClick={() => this.bfsShortestPath()}>Visualize BFS</button>
                <button className="bfs-btn" 
                        style={{backgroundColor: 'red', marginLeft: '2rem'}}
                        onClick={() => this.dfsShortestPath()}>Visualize Dfs</button>
                <button className="bfs-btn" 
                        style={{backgroundColor: 'red', marginLeft: '2rem'}}
                        onClick={() => this.clearBoard()}>Clear Board</button>
                <button className="bfs-btn" 
                        style={{backgroundColor: 'red', marginLeft: '2rem'}}
                        onClick={() => this.dfsMazeGenerator()}
                        >Generate Maze</button>
                <button className="bfs-btn" 
                        style={{backgroundColor: 'red', marginLeft: '2rem'}}
                        onClick={() => this.recursiveDivisionMazeGenrator()}
                        >Recursive Devision</button>
                <button className="bfs-btn" 
                        style={{backgroundColor: 'red', marginLeft: '2rem'}}
                        onClick={() => this.dijkstraAlgorithm()}
            >dijkstraAlgorithm</button>
                <div className="grid">
                    {grid.map((row, rowIdx) => (
                        <div key={rowIdx} className="row">
                            {row.map((node, nodeIndx) => {
                            const {row, col, visited, wall, startNode, endNode,weight} = node;
                            
                            return(
                                <Node
                                    key={nodeIndx}
                                    row={row}
                                    col={col}
                                    visited = {visited}
                                    wall = {wall}
                                    startNode = {startNode}
                                    endNode = {endNode}
                                    weight = {weight}
                                    onMouseDown = {(row, col, e) => this.handleMouseDown(row, col,e)}
                                    onMouseEnter = {(row, col, e) => this.handleMouseEnter(row, col,e)}
                                    onMouseUp = {() => this.handleMouseUp()}          
                                >
                                </Node>
                            )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}


function getInitialGrid() {
    const grid = []
    for (let row=0; row < 25; row++) {
        const rowArray = [];
        for (let col=0; col < 65; col++) {
            const node = createNode(row, col)
            rowArray.push(node)
        }
        grid.push(rowArray)
    }
    return grid
}

const createNode = (row, col) => {
    let startNode = false
    let endNode = false
    if(row===START_NODE[0] && col==START_NODE[1]) {
        startNode = true
    }
    else if (row===END_NODE[0] && col===END_NODE[1]) {
        endNode = true
    }
    return {
        row,
        col,
        visited: false,
        wall: false,
        startNode: startNode,
        endNode: endNode,
        parent: null,
        distance:Infinity,
        weight:1,
        borders: [true, true, true, true] //Top Right Bottom Left borders(walls)
    }
}


function getNewGridWithWallToggled(grid, row, col, shift) {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    if(shift) {
        node.weight = 5;
    }
    else{
        node.wall = !node.wall;
    }
    newGrid[row][col] = node;
    return newGrid
}

function changeStartNode(grid, row, col) {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    node.startNode = true;
    newGrid[row][col] = node;
    return newGrid
}

function changeEndNode(grid, row, col) {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    node.endNode = true;
    newGrid[row][col] = node;
    return newGrid
}

function getStartNode(grid) {
    grid
}