import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Login from './Login'
import WhoAmI from './WhoAmI'

const App = ({ children, user }) => (
  <div>
  <AppBar
    className="App"
    title={<a href="/">Code Board</a>}
    iconElementLeft={<span/>}
    iconElementRight={ user
      ? <a href="/myaccount">My Account</a> : <LoginButton />}
    />
    {children}
  </div>
)

class LoginButton extends React.Component {
  static muiName = 'FlatButton'
  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    )
  }
}

export default connect(({ auth }) => ({ user: auth }))(App)
