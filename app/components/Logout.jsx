import React from 'react'
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'

export const Logout = ({ logout }) => (
  <FlatButton
    label="Logout"
    style={{color: 'white'}}
    onTouchTap={evt => logout()}
  />
)

export default connect(state => ({}), { logout })(Logout)
