import React, {Component} from 'react'
import Graph from './Graph'
import './Home.scss'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: [
                {
                    name: "Me"
                },
                {
                    name: "Jeff"
                },
                {
                    name: "Person1"
                }
            ]
        }
    }
    render() {
        return (
            <div className="home">
                <Graph nodes={this.state.nodes} />
            </div>
        )
    }
}

export default Home