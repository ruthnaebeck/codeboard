import React from 'react'
import { logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

export const Logout = (props) => {
  const myAccountLink =`/users/${props.auth.id}`
  return (
    <div>
      <Link to={myAccountLink}>
      <FlatButton
          label="My Account"
          style={{color: 'white'}}
        />
      </Link>
      <FlatButton
        label="Logout"
        style={{color: 'white'}}
        onTouchTap={evt => props.logout()}
      />
    </div>
  )
}

const mapStateToProps = ({auth}) => ({auth})
const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(Logout)

