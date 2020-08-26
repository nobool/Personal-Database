import React, {Component} from 'react'
import './Graph.scss'

function Node(props) {
    const mystyle = {
        position: "relative",
        height: "10rem",
        width: "10rem",
        backgroundColor: "#51eb22",
        transform: `translate(${props.x}px, ${props.y}px)`
    }
    //console.log(props.x, props.y)
    return (
        <div className="box" style={mystyle} onMouseDown={(e) => { props.handleMouseDown(e, props.index) }}
            onMouseMove={(e) => { props.handleMouseMove(e, props.index) }}
            onMouseUp={(e) => { props.handleMouseUp(e, props.index) }}>
            <input
                className="name-input"
                type="text"
                value={props.name}
                onChange={(e) => { props.handleInputChange(e, props.index) }}
                placeholder="name"
            />
        </div>
    )
}

class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boxes: [
                {
                    index: 0,
                    name: "",
                    x: 0,
                    y: 0,
                    shiftX: 0,
                    shiftY: 0,
                    isDragging: false
                },
                {
                    index: 1,
                    name: "",
                    x: 0,
                    y: 0,
                    shiftX: 0,
                    shiftY: 0,
                    isDragging: false
                }
            ]
        }
    }
    componentWillUnmount() {
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }
    handleMouseDown = (event, index) => {
        console.log("mouse down", index)
        let node = event.target
        //console.log(event.clientX, event.clientY)
        let shiftX = event.clientX - node.getBoundingClientRect().left
        let shiftY = event.clientY - node.getBoundingClientRect().top

        let boxesCopy = this.state.boxes.slice()
        boxesCopy[index].shiftX = shiftX
        boxesCopy[index].shiftY = shiftY
        boxesCopy[index].isDragging = true
        this.setState({
            boxes: boxesCopy
        })
    }
    handleMouseMove = (event, index) => {
        let boxesCopy = this.state.boxes.slice()
        if(boxesCopy[index].isDragging === true) {
            boxesCopy[index].x = event.clientX - boxesCopy[index].shiftX
            boxesCopy[index].y = event.clientY - boxesCopy[index].shiftY
            this.setState({
                boxes: boxesCopy
            })
        } else {
            console.log("no")
        }
    }
    handleMouseUp = (event, index) => {
        console.log("mouse up")
        window.removeEventListener('mousemove', this.handleMouseMove)
        let boxesCopy = this.state.boxes.slice()
        boxesCopy[index].isDragging = false
        this.setState({
            boxes: boxesCopy
        })
    }
    handleInputChange = (e, index) => {
        let boxesCopy = this.state.boxes.slice()
        boxesCopy[index].name = e.target.value
        this.setState({
            boxes: boxesCopy
        })
    }
    render() {
        const boxes = this.state.boxes.map((box) =>
                <Node
                    handleMouseDown={this.handleMouseDown}
                    handleMouseMove={this.handleMouseMove}
                    handleMouseUp={this.handleMouseUp}
                    index={box.index}
                    name={box.name}
                    x={box.x}
                    y={box.y}
                    handleInputChange={this.handleInputChange}
                />
            )
        //console.log(this.state.boxes)
        return (
            <div id="container">
                {boxes}
            </div>
        )
    }
}
/*
<div className="box" style={mystyle} onMouseDown={this.handleMouseDown}>
                    <input
                        className="name-input"
                        type="text"
                        value={this.state.name}
                        onChange={(e) => { this.setState({name: e.target.value}) }}
                        placeholder="name"
                    />
                </div>
*/

export default Graph