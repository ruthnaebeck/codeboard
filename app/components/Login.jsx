import React from 'react'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class Login extends React.Component {
  state = {
    open: false
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.login(evt.target.email.value, evt.target.password.value)
    this.setState({ open: false })
  }
  render() {
    const dialogStyle = { width: '325px' }
    const buttonStyle = { color: 'white' }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Login"
        type="submit"
        form="login"
        primary={true}
        keyboardFocused={true}
      />,
    ]
    return (
      <div>
        <FlatButton
          label="Login"
          onTouchTap={this.handleOpen}
          style={buttonStyle} />
        <Dialog
          title="Login"
          actions={actions}
          modal={false}
          contentStyle={dialogStyle}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <form id="login" onSubmit={this.handleSubmit}>
            <TextField
              name="email"
              hintText="Email Address"
            /><br />
            <br />
            <TextField
              name="password"
              hintText="Password"
            /><br />
            <br />
          </form>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
