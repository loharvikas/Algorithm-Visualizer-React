import React, {Component} from 'react';
import './Node.css'

export default class Node extends Component {
    render() {
        const {row, col, visited, wall, startNode, endNode, weight, onMouseDown, onMouseEnter, onMouseUp} = this.props;
        let className = 
                startNode ? 'node-start': 
                endNode ? 'node-end':
                visited ? 'node-visited':
                wall ? 'node-wall' : '';
        if(weight > 1) {
            className = 'node-weight'
        }
        return (
            <div className={`node ${className}`} 
                id={`node-${row}-${col}`}
                onMouseDown={(e) => onMouseDown(row, col, e)}
                onMouseEnter={(e) => onMouseEnter(row, col, e)}
                onMouseUp={() => onMouseUp()}>
            </div>
        )
    }
}