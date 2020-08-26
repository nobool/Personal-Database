import React, {Component} from 'react'
import './App.scss'
import './Containers/navigation.scss'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Index from './Components/Index/Index'
import Home from './Components/Home/Home'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Temp from './Components/Home/Temp'

/*
Index: the landing page
Home: the user's dashboard
*/

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Index} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/draggable" component={Temp} />
      </Router>
    )
  }
}

export default App
