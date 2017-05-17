import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import Login from './Login'
import Logout from './Logout'
import Timer from './Timer'

const App = ({ children, user, timer }) => (
  <div>
    <AppBar
      className="App"
      title={timer ? <span style={{display: 'inline-block', width: '760px'}}><Link to="/">Code Board</Link><Timer /></span> : <Link to="/">Code Board</Link>}
      iconElementRight={user ? <Logout /> : <Login />}
      iconElementLeft={<span/>}
      iconStyleLeft={{textAlign: 'center'}}
    />
    {children}
  </div>
)

export default connect(({ auth, timer }) => ({ user: auth, timer: timer }))(App)
