import React, {Component} from 'react'
import Draggable from './Draggable'
import './Graph.scss'

function Node(props) {
    const mystyle = {
        position: "absolute",
        height: "10rem",
        width: "10rem",
        backgroundColor: "#51eb22",
        transform: `translate(${props.x}px, ${props.y}px)`
    }
    return (
        <div id="box" style={mystyle} onDragStart={(e) => { e.preventDefault() }}>hello</div>
    )
}

class Graph extends Component {
    constructor(props) {
        super(props)
        // a single node
        this.state = {
            x: 0,
            y: 0,
            shiftX: 0,
            shiftY: 0,
            isDragging: false
        }
        this.ref = React.createRef()
    }
    componentDidMount() {
        console.log("hello")
        console.log(this.ref)
        this.ref.current.addEventListener('mousedown', this.handleMouseDown)
    }
    componentWillUnmount() {
        window.addEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    // prevent HTML drag and drop API from being used to prevent mouse from 'sticking' to div

    handleMouseDown = (event) => {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        console.log("mouse down")
        let node = event.target
        let shiftX = event.clientX - node.getBoundingClientRect().left
        let shiftY = event.clientY - node.getBoundingClientRect().top
        this.setState({
            shiftX: shiftX,
            shiftY: shiftY
        })
    }
    handleMouseMove = ({clientX, clientY}) => {
        console.log("move")
        this.setState({
            x: clientX - this.state.shiftX,
            y: clientY - this.state.shiftY,
            isDragging: true
        })
    }
    handleMouseUp = () => {
        console.log("mouse up")
        window.removeEventListener('mousemove', this.handleMouseMove)
        this.state.isDragging = false
    }
    render() {
        const mystyle = {
            position: "absolute",
            height: "10rem",
            width: "10rem",
            backgroundColor: "#51eb22",
            transform: `translate(${this.state.x}px, ${this.state.y}px)`
        }
        return (
            <div id="container">
                <div id="box" ref={this.ref} style={mystyle}>node</div>
            </div>
        )
    }
}
/*
<Node
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    x={this.state.x}
                    y={this.state.y}
                />
            */

export default Graph