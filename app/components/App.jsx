import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Login from './Login'
import Logout from './Logout'

const App = ({ children, user }) => (
  <div>
    <AppBar
      className="App"
      title={<a href="/">Code Board</a>}
      iconElementLeft={<span />}
      iconElementRight={user ? <Logout /> : <Login />}
    />
    {children}
  </div>
)

export default connect(({ auth }) => ({ user: auth }))(App)
