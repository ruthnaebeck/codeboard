import React from 'react'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class Login extends React.Component {
  state = {
    open: false,
    emailError: '',
    passError: ''
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({
      open: false,
      emailError: '',
      passError: ''
    })
  }
  handleSubmit = (evt) => {
    evt.preventDefault()
    const email = evt.target.email.value
    const password = evt.target.password.value
    const emailTrue = email.indexOf('@') > -1 && email.indexOf('.') > -1
    const passTrue = password.length > 0
    if (emailTrue) {
      if (passTrue) {
        this.props.login(email, password)
        this.setState({ open: false })
      } else {
        this.setState({
          emailError: '',
          passError: 'Enter Password'
        })
      }
    } else {
      this.setState({ emailError: 'Enter Valid Email Address' })
    }
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
        label="Login / Signup"
        type="submit"
        form="login"
        primary={true}
        keyboardFocused={true}
      />,
    ]
    return (
      <div>
        <FlatButton
          label="Login / Signup"
          onTouchTap={this.handleOpen}
          style={buttonStyle} />
        <Dialog
          title="Login / Signup"
          actions={actions}
          modal={false}
          contentStyle={dialogStyle}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <form id="login" onSubmit={this.handleSubmit}>
            <TextField
              name="email"
              hintText="Email Address"
              errorText={this.state.emailError}
            /><br />
            <br />
            <TextField
              name="password"
              type="password"
              hintText="Password"
              errorText={this.state.passError}
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
