import React, {Component} from 'react'
import './Graph.scss'

function Node(props) {
    return (
        <div className="node center">
            <h2>{props.data.name}</h2>
        </div>
    )
}

class Graph extends Component {
    render() {
        return (
            <div className="graph center">
                <Node data={this.props.nodes[0]} />
                <Node data={this.props.nodes[1]} />
                <Node data={this.props.nodes[2]} />
            </div>
        )
    }
}

export default Graph