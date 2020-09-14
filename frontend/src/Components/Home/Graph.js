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

function Line(props) {
    // convert node1 and node2 indices into boxes
    const boxIndex1 = props.boxes.findIndex((box) => box.id == props.nodeId1)
    const boxIndex2 = props.boxes.findIndex((box) => box.id == props.nodeId2)

    const x1 = props.boxes[boxIndex1].x
    const x2 = props.boxes[boxIndex2].x
    const y1 = props.boxes[boxIndex1].y
    const y2 = props.boxes[boxIndex2].y

    if(x1 + y1 <= x2 + y2) {
        var startX = x1
        var startY = y1
    } else {
        var startX = x2
        var startY = y2
    }
    const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    // how do I convert coordinates to an angle of rotation?
    // find the gradient and then convert the gradient to an angle
    const gradient = (y2 - y1) / (x2 - x1)
    console.log("gradient:", gradient)
    // use inverse tan to convert gradient (eg. 1.5) into degrees:
    const rotateAngle = (Math.atan(gradient) / Math.PI) * 180

    console.log("rotateAngle:", rotateAngle)
    const lineStyle = {
        position: "absolute",
        transformOrigin: "0% 0%",
        transform: `translate(${startX + 76}px, ${startY - 15}px) rotate(${rotateAngle}deg)`,
        height: "1rem",
        width: `${lineLength}px`,
        backgroundColor: "black"
    }
    console.log(startX, startY, x1, y1)
    return (
        <div style={lineStyle}></div>
    )
}

// transform: `rotate(${rotateAngle}deg)`,

class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idCurrentlyMoving: null,
            boxes: [],
            edgeList: [],
            lines: []
        }
    }
    componentWillUnmount() {
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }
    // when a node is clicked and added to the edge list, remove it after 3 seconds to reset edgeList
    cleanup = () => {

    }
    renderEdgeList = () => {
        const newLines = this.state.edgeList.map((edge) =>
            <Line
                key={edge[0] + edge[1]}
                nodeId1={edge[0]}
                nodeId2={edge[1]}
                boxes={this.state.boxes}
            />
        )
        this.setState({
            lines: newLines
        })
        console.log("lines:", newLines)
    }
    handleMouseDown = (event, id) => {
        // prepare for mouse move
        let index = this.state.boxes.findIndex((box) => box.id == id)

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
        var renderEdgeList = true
        for(let i = 0; i < this.state.edgeList.length; i++) {
            if(this.state.edgeList[i].length < 2) {
                renderEdgeList = false
            }
        }
        if(renderEdgeList) {
            // only render if edgeList has all pairs
            // [[1,2], [1]]
            // [[1,2], [1,3]]
            var lines = this.state.edgeList.map((edge) =>
                <Line
                    key={edge[0] + edge[1]}
                    nodeId1={edge[0]}
                    nodeId2={edge[1]}
                    boxes={this.state.boxes}
                />
            )
        }

        // convert edge list into a list of boxes
        // [[0,1], [0,2], [1,2]]
        // for each pair, get the coordinates of each number in the pair, then draw a div between the two coordinates
        // for example, if the coordinates are [0,0] and [100,100], how would I draw a div between these two
        // pairs of coordinates?



        // 0. create a new div
        // 1. use the first pair of coordinates to position the top left corner of the div at the start node.
        // 2. then use the second pair of coordinates to find the gradient of the line.
        // 3. then rotate the div so that it's gradient is correct
        console.log("state lines", this.state.lines)
        return (
            <div id="container">
                {boxes}
                {lines}
                <div id="button-container">
                    <button onClick={this.addBox} id="add-node-button">&#x2B;</button>
                </div>
            </div>
        )
    }
}

export default Graph