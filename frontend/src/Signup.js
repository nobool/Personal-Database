import React, { Component } from 'react'
import axios from 'axios'
import AppBar from 'material-ui/AppBar'
import { MuiThemeProvider } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Tabs from 'material-ui/Tabs'
import Tab from '@material-ui/core/Tab'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }
  handleSubmitButton = (event) => {
    // when the submit button is pressed, send information to the database using axios
  }
  handleLoginButton = (event) => {
    // change to the login page

  }
  render() {
    return(
        <MuiThemeProvider>
          <div>
            <TextField
              floatingLabelText="Full Name"
              // when something is typed in the input, change this.state using the unnamed function below
              onChange={(event, newValue) => this.setState({name: newValue})}
            />
            <br />
            <TextField
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({email: newValue})}
            />
            <br />
            <TextField
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({password: newValue})}
            />
            <br />
            <RaisedButton label="sign up" primary={true} style={style} onClick={(event) => this.handleSubmitButton(event)}/>
          </div>
        </MuiThemeProvider>
    )
  }
}

const style = {
  margin: 15
}

export default Signup