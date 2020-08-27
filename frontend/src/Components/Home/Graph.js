import React, {Component} from 'react'
import './Graph.scss'

function Node(props) {
    const mystyle = {
        position: "absolute",
        height: "10rem",
        width: "10rem",
        backgroundColor: "#51eb22",
        transform: `translate(${props.x}px, ${props.y}px)`
    }
    //console.log(props.x, props.y)
    return (
        <div id={props.index} className="box" style={mystyle} onMouseDown={(e) => { props.handleMouseDown(e, props.index) }}
            onMouseUp={(e) => { props.handleMouseUp(e, props.index) }} onClick={(e) => { props.onClick(e) }}
        >
            <input
                className="name-input"
                type="text"
                value={props.name}
                onChange={(e) => { props.handleInputChange(e, props.index) }}
                placeholder="name"
            />
            <div className="anchor anchor-1"></div>
            <div className="anchor anchor-2"></div>
            <div className="anchor anchor-3"></div>
            <div className="anchor anchor-4"></div>
        </div>
    )
}

class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            indexCurrentlyMoving: null,
            boxes: [],
            edgeList: []
        }
    }
    componentWillUnmount() {
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }
    handleClick = (event) => {
        // if click and drag, then ignore handleClick
        console.log("id:", event.target.id)
        let newGraphConnection = [parseInt(event.target.id)]
        let edgeListCopy = this.state.edgeList.slice()
        console.log("output:", edgeListCopy, "--", edgeListCopy[edgeListCopy.length - 1], "--", newGraphConnection)
        if(edgeListCopy.length === 0 || (edgeListCopy[edgeListCopy.length - 1][0] != newGraphConnection[0])) {
            console.log("true", edgeListCopy[edgeListCopy.length - 1] != newGraphConnection)
            edgeListCopy.push(newGraphConnection)
            this.setState({
                edgeList: edgeListCopy
            })
        }
        console.log(this.state.edgeList)
    }
    handleMouseDown = (event, index) => {
        console.log("mouse down")
        window.addEventListener('mousemove', this.handleMouseMove);
        let node = event.target
        //console.log(event.clientX, event.clientY)
        let shiftX = event.clientX - node.getBoundingClientRect().left
        let shiftY = event.clientY - node.getBoundingClientRect().top

        let boxesCopy = this.state.boxes.slice()
        boxesCopy[index].initialX = node.getBoundingClientRect().left
        boxesCopy[index].initialY = node.getBoundingClientRect().top
        boxesCopy[index].shiftX = shiftX
        boxesCopy[index].shiftY = shiftY
        boxesCopy[index].isDragging = true
        this.setState({
            boxes: boxesCopy,
            indexCurrentlyMoving: index
        })
    }
    handleMouseMove = (event) => {
        // check edge list for a single node and delete it if there is one
        console.log("edgeList:", this.state.edgeList)
        console.log("edgeListLength:", this.state.edgeList.length)
        if(this.state.edgeList.length > 0 && this.state.edgeList[-1].length < 2) {
            this.setState({
                edgeList: this.state.edgeList.slice(0, -1)
            })
        }
        let boxesCopy = this.state.boxes.slice()
        let index = this.state.indexCurrentlyMoving
        //console.log(boxesCopy[index].initialX, boxesCopy[index].initialY)
        boxesCopy[index].x = event.clientX - boxesCopy[index].shiftX
        boxesCopy[index].y = event.clientY - boxesCopy[index].shiftY
        this.setState({
            boxes: boxesCopy
        })
    }
    handleMouseUp = (event, index) => {
        console.log("edgeList:", this.state.edgeList)
        console.log("mouse up")
        window.removeEventListener('mousemove', this.handleMouseMove)
        let node = event.target
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
    addBox = () => {
        let boxesLength = this.state.boxes.length
        let newIndex = boxesLength > 0 ? this.state.boxes[boxesLength - 1].index + 1 : 0
        // new box is randomly placed within 400px of the center of the screen
        let newBoxCoordinates = [600 + (Math.random() * 400), 200 + (Math.random() * 400)]
        var newBox = {
            index: newIndex,
            name: "",
            x: newBoxCoordinates[0],
            y: newBoxCoordinates[1],
            initialX: 0,
            initialY: 0,
            shiftX: 0,
            shiftY: 0,
            isDragging: false
        }
        this.setState({
            boxes: this.state.boxes.concat(newBox)
        })
    }
    subtractBox = () => {
        this.setState({
            boxes: this.state.boxes.slice(0, -1)
        })
    }
    render() {
        const boxes = this.state.boxes.map((box) =>
                <Node
                    onClick={this.handleClick}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseMove={this.handleMouseMove}
                    handleMouseUp={this.handleMouseUp}
                    index={box.index}
                    name={box.name}
                    x={box.x}
                    y={box.y}
                    handleInputChange={this.handleInputChange}
                    key={box.index}
                />
            )
        //console.log(this.state.boxes)
        return (
            <div id="container">
                {boxes}
                <div id="button-container">
                    <button onClick={this.addBox} id="add-node-button">&#x2B;</button>
                    <button onClick={this.subtractBox} id="subtract-node-button">&minus;</button>
                </div>
            </div>
        )
    }
}

export default Graph