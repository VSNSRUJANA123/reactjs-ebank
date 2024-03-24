import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './component/Login'
import Home from './component/Home'
import NotFound from './component/NotFound'
// import ProtectedRoute from './component/ProtectedRoute'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/ebank/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
        {/* <Redirect to="not-found" /> */}
      </Switch>
    )
  }
}
export default App
