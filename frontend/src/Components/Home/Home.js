import React, {Component} from 'react'
import Graph from './Graph'
import './Home.scss'

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Graph />
            </div>
        )
    }
}


export default Home