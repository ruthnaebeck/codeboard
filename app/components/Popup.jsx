/* global SpeechSynthesisUtterance Event */
import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { set } from '../reducers/drawer'
import { startTimer } from '../reducers/timer'

class Popup extends React.Component {
  state = {
    open: true,
    speak: false
  }

  handleReady = () => {
    this.setState(
      {
        open: false,
        speak: true
      })
    this.props.startTimer()
  }

  speak = (voice, words) => {
    if (this.state.speak) {
      voice.speak(words)
    }
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
      <FlatButton
          label="I'm Ready"
          primary={true}
          onTouchTap={this.handleReady}
      />
    ]
    const voice = window.speechSynthesis
    const words = new SpeechSynthesisUtterance(this.props.question.text)
    this.speak(voice, words)
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

const mapStateToProps = ({ question }) => ({ question })
const mapDispatchToProps = ({ set, startTimer })

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
