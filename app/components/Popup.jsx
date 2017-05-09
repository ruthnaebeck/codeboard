import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { set } from '../reducers/drawer'

class DialogExampleAlert extends React.Component {
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
          onTouchTap={this.props.set}
        />
      </Link>,
      <Link to='/whiteboard'>
        <FlatButton
          label="I'm Ready"
          primary={true}
          onTouchTap={this.handleReady}
        />
      </Link>
      ,
    ]

    return (
      <div>
        <Dialog
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          When you're ready to start, make sure that your volume is on, then click I'm Ready.
        </Dialog>
      </div>
    )
  }
}

const mapDispatch = ({ set })

export default connect(null, mapDispatch)(DialogExampleAlert)
