import React, {Component} from 'react'
import Graph from './Graph'
import Node from './Node'
import './Home.scss'

class Home extends Component {
    handleDrag = () => {

    }
    onDragEnd = () => {

    }
    render() {
        return (
            <div className="home">
                <Graph />
            </div>
        )
    }
}


export default Home