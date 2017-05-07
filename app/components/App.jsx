import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import Login from './Login'
import Logout from './Logout'

const App = ({ children, user }) => (
  <div>
    <AppBar
      className="App"
      title={<a href="/">Code Board</a>}
      iconElementLeft={<span />}
      iconElementRight={user
        ? <Logout /> : <Login />}
    />
    {children}
  </div>
)

export default connect(({ auth }) => ({ user: auth }))(App)
