import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userInput: '',
    userPin: '',
    errorMsg: '',
    errorStatus: false,
  }

  userInputChange = e => {
    this.setState({userInput: e.target.value})
  }

  userPinChange = e => {
    this.setState({userPin: e.target.value})
  }

  homePage = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({errorStatus: false})
    const {history} = this.props
    history.replace('/')
  }

  failure = errorMsg => {
    this.setState({errorStatus: true, errorMsg})
  }

  submit = async e => {
    e.preventDefault()
    const {userInput, userPin} = this.state
    const userDetails = {user_id: userInput, pin: userPin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.homePage(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {userInput, userPin, errorMsg, errorStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-div-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.submit}>
            <h1>Welcome Back!</h1>
            <label htmlFor="user-id">User ID</label>
            <input
              id="user-id"
              placeholder="Enter User ID"
              onChange={this.userInputChange}
              value={userInput}
            />
            <label htmlFor="pin">PIN</label>
            <input
              type="password"
              id="pin"
              placeholder="Enter PIN"
              onChange={this.userPinChange}
              value={userPin}
            />
            <button type="submit">Login</button>
            {errorStatus && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
