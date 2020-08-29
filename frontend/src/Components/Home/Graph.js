import React, {Component} from 'react'
import './Graph.scss'
const shortid = require("shortid")

class Node extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const mystyle = {
            position: "absolute",
            height: "10rem",
            width: "10rem",
            backgroundColor: "#51eb22",
            transform: `translate(${this.props.x}px, ${this.props.y}px)`
        }
        return (
            <div id={this.props.id} className="box" style={mystyle}
                onMouseDown={(e) => { this.props.handleMouseDown(e, this.props.id) }}
                onMouseUp={(e) => { this.props.handleMouseUp(e, this.props.id) }}
            >
                <input
                    className="name-input"
                    type="text"
                    value={this.props.name}
                    onChange={(e) => { this.props.handleInputChange(e, this.props.id) }}
                    placeholder="name"
                />
                <button className="delete-node-button"
                    onClick={(e) => { this.props.handleDeleteButtonClick(e, this.props.id) }}>delete</button>
                <div className="anchor anchor-1"></div>
                {/*
                <div className="anchor anchor-2"></div>
                <div className="anchor anchor-3"></div>
                <div className="anchor anchor-4"></div>
                */}
            </div>
        )
    }
}

class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idCurrentlyMoving: null,
            boxes: [],
            edgeList: []
        }
        this.canvasRef = React.createRef()
    }
    componentWillUnmount() {
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }
    connectTwoNodes = (nodeId1, nodeId2) => {
        // find the coordinates of node1 and node2
        // use the indices to find the right box and then find the coordinates of these boxes
        let index1 = this.state.boxes.findIndex((box) => box.id == nodeId1)
        let index2 = this.state.boxes.findIndex((box) => box.id == nodeId2)
        console.log("indices:", index1, index2)
        let firstNodeCoords = [this.state.boxes[index1].x, this.state.boxes[index1].y]
        let secondNodeCoords = [this.state.boxes[index2].x, this.state.boxes[index2].y]
        // use these coordinates to draw a line between the nodes
        // create a div line with coordinates at the first node
        const canvas = this.canvasRef.current
        var context = canvas.getContext("2d")
        context.lineWidth = 3
        context.shadowBlur = 1
        context.strokeStyle = "red"
        context.beginPath()
        context.moveTo(200, 0)
        context.lineTo(200, 300)
        context.stroke()

        /*
        context.beginPath()
        console.log("move to:", firstNodeCoords[0], firstNodeCoords[1])
        context.moveTo(firstNodeCoords[0], firstNodeCoords[1])
        console.log("line to:", secondNodeCoords[0], secondNodeCoords[1])
        context.lineTo(secondNodeCoords[0], secondNodeCoords[1])
        context.stroke()
        */
        console.log("line drawn")
    }
    drawLines = () => {
        for(let i = 0; i < this.state.edgeList.length; i++) {
            console.log("loop output:", this.state.edgeList[i])
            this.connectTwoNodes(this.state.edgeList[i][0], this.state.edgeList[i][1])
        }
    }
    // when a node is clicked and added to the edge list, remove it after 3 seconds to reset edgeList
    cleanup = () => {

    }
    handleMouseDown = (event, id) => {
        // prepare for mouse move
        let index = this.state.boxes.findIndex((box) => box.id == id)
        console.log("mouse down", index)

        window.addEventListener('mousemove', this.handleMouseMove);
        let node = event.target
        let boxesCopy = this.state.boxes.slice()
        boxesCopy[index].shiftX = event.clientX - node.getBoundingClientRect().left
        boxesCopy[index].shiftY = event.clientY - node.getBoundingClientRect().top
        boxesCopy[index].isDragging = true
        this.setState({
            boxes: boxesCopy,
            idCurrentlyMoving: id
        })

        // Handle click event when user wants to link nodes
        let edgeListLength = this.state.edgeList.length
        // handle the click of the first node; add new array to edgeList with length 1:
        if(edgeListLength < 1 || this.state.edgeList[edgeListLength - 1].length == 2) {
            console.log("adding first node")
            // eg. [[1,2]] -> [[1,2], [3]]
            let newArray = [id]
            // add new array to edgeList
            this.setState(prevState => ({
                edgeList: [...prevState.edgeList, newArray]
            }))
        } else {
            // handle the click of the second node; take the last element of the array which of length 1 and
            // complete it so that its length is 2
            // eg. [[1,2], [3]] -> [[1,2], [3,4]]
            let edgeListCopy = this.state.edgeList.slice()
            let newPair = edgeListCopy[edgeListLength - 1].concat(id)

            let isDifferentNode = edgeListCopy[edgeListLength - 1][0] != id
            let pairAlreadyExists = edgeListCopy.filter(pair => JSON.stringify(pair.sort()) == JSON.stringify(newPair.sort()))
            // make sure the second element is different to the first element and the newPair is not already in edgeList:
            if(isDifferentNode && !pairAlreadyExists.length) {
                edgeListCopy[edgeListLength - 1] = newPair
                console.log("adding second node", edgeListCopy)
                this.setState({
                    edgeList: edgeListCopy
                }, () => {
                    // draw new lines for new graph connection
                    console.log("state:", this.state.edgeList)
                    this.drawLines()
                })

            } else {
                // otherwise, delete the element of length 1
                this.setState(prevState => ({
                    edgeList: this.state.edgeList.slice(0, -1)
                }))
            }
        }
        console.log("boxes:", this.state.boxes, "edgeList:", this.state.edgeList)
    }
    handleMouseMove = (event) => {
        console.log("move")
        console.log("edgeList:", this.state.edgeList)
        console.log("edgeListLength:", this.state.edgeList.length)

        // check edge list for a single node and delete it if there is one
        let edgeListLength = this.state.edgeList.length
        if(edgeListLength > 0 && this.state.edgeList[edgeListLength - 1].length < 2) {
            this.setState({
                edgeList: this.state.edgeList.slice(0, -1)
            })
        }
        let boxesCopy = this.state.boxes.slice()
        let movingId = this.state.idCurrentlyMoving
        let movingIndex = this.state.boxes.findIndex((box) => box.id == movingId)
        boxesCopy[movingIndex].x = event.clientX - boxesCopy[movingIndex].shiftX
        boxesCopy[movingIndex].y = event.clientY - boxesCopy[movingIndex].shiftY
        this.setState({
            boxes: boxesCopy
        })
    }
    handleMouseUp = (event, id) => {
        let index = this.state.boxes.findIndex((box) => box.id == id)
        console.log("edgeList:", this.state.edgeList)
        console.log("mouse up", index)
        window.removeEventListener('mousemove', this.handleMouseMove)
        let node = event.target
        let boxesCopy = this.state.boxes.slice()
        boxesCopy[index].isDragging = false
        this.setState({
            boxes: boxesCopy
        })
    }
    handleInputChange = (e, id) => {
        let index = this.state.boxes.findIndex((box) => box.id == id)
        let boxesCopy = this.state.boxes.slice()
        boxesCopy[index].name = e.target.value
        this.setState({
            boxes: boxesCopy
        })
    }
    addBox = () => {
        let boxesLength = this.state.boxes.length
        let newId = boxesLength > 0 ? boxesLength + 1 : 0
        // new box is randomly placed within 400px of the center of the screen
        let newBoxCoordinates = [600 + (Math.random() * 400), 200 + (Math.random() * 400)]
        var newBox = {
            id: shortid.generate(),
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
    handleDeleteButtonClick = (event, id) => {
        let index = this.state.boxes.findIndex((box) => box.id == id) // TODO: get rid of these repeating lines
        let edgeListCopy = this.state.edgeList.slice()
        for(let i = 0; i < edgeListCopy.length; i++) {
            // delete pair from edgeList if it got removed from the screen
            if(edgeListCopy[i][0] == index || edgeListCopy[i][1] == index) {
                console.log("will delete")
                edgeListCopy.splice(index, 1)
            }
        }
        let boxesCopy = this.state.boxes.slice()
        boxesCopy.splice(index, 1)
        this.setState({
            boxes: boxesCopy,
            edgeList: edgeListCopy
        })
        console.log("edgeList:", this.state.edgeList)
    }
    render() {
        const boxes = this.state.boxes.map((box) =>
                <Node
                    key={box.id}
                    id={box.id}
                    name={box.name}
                    x={box.x}
                    y={box.y}
                    boxes={this.state.boxes}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseMove={this.handleMouseMove}
                    handleMouseUp={this.handleMouseUp}
                    handleInputChange={this.handleInputChange}
                    handleDeleteButtonClick={this.handleDeleteButtonClick}
                />
            )
        //console.log(this.state.boxes)
        return (
            <div id="container">
                <canvas id="canvas" ref={this.canvasRef}>Your browser does not support canvas</canvas>
                {boxes}
                <div id="button-container">
                    <button onClick={this.addBox} id="add-node-button">&#x2B;</button>
                </div>
            </div>
        )
    }
}

export default Graph