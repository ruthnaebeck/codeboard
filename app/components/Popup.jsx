import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class DialogExampleAlert extends React.Component {
  state = {
    open: true,
  }

  handleReady = () => {
    this.setState({open: false})
  }

  render() {
    const actions = [
      <Link to='/'>
        <FlatButton
          label="Change Question"
          primary={true}
        />
      </Link>,
      <FlatButton
        label="I'm Ready"
        primary={true}
        onTouchTap={this.handleReady}
      />,
    ]

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          When you're ready to start, make sure that your volume is on, then click I'm Ready.
        </Dialog>
      </div>
    )
  }
}
