import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', errorStatus: false}

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSuccessfulLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  checkingLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, errorStatus: true})
    }
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="username" className="label-element">
          Username
        </label>
        <br />
        <input
          type="text"
          id="username"
          className="input-element"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <div>
        <label htmlFor="password" className="label-element">
          Password
        </label>
        <br />
        <input
          type="password"
          id="password"
          className="input-element"
          placeholder="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, errorStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-log"
          />
          <form onSubmit={this.checkingLoginDetails}>
            {this.renderUsernameInput()}
            {this.renderPasswordInput()}

            <button type="submit" className="btn-login">
              Login
            </button>
            {errorStatus && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
