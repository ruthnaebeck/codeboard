import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import Login from './Login'
import Logout from './Logout'
import Timer from './Timer'

const App = ({ children, user, timer }) => (
  <div>
    <AppBar
      className="App"
      title={<a href="/">Code Board</a>}
      children={timer ? <div><Chip><Timer/></Chip></div> : <span />}
      iconElementLeft={<span />}
      iconElementRight={user ? <Logout /> : <Login />}
    />
    {children}
  </div>
)

export default connect(({ auth, timer }) => ({ user: auth, timer: timer }))(App)
