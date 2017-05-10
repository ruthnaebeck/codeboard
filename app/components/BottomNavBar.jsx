/* global SpeechSynthesisUtterance Event */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import Save from 'material-ui/svg-icons/content/save'
import Play from 'material-ui/svg-icons/av/play-arrow'
import Hints from 'material-ui/svg-icons/action/help'
import Repeat from 'material-ui/svg-icons/action/record-voice-over'

const save = <Save />
const play = <Play />
const hints = <Hints />
const repeat = <Repeat />

class BottomNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      spoken: false,
      hints: this.props.question.hints || []// an array of hints
    }
  }

  speak = (voice, words) => {
    const hintsArr = this.state.hints
    if (!this.state.spoken) {
      voice.speak(words)
      this.setState({
        spoken: true,
        hints: hintsArr.shift()
      })
    }
  }

  select = (index) => this.setState({selectedIndex: index});

  render() {
    console.log('PROPS: ', this.props)
    const voice = window.speechSynthesis
    const words = new SpeechSynthesisUtterance(this.props.question.text)
    const currentHint = this.props.question.hints ? this.props.question.hints[0] : 'You are out of hints'
    const hint = new SpeechSynthesisUtterance(currentHint)


    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Repeat Question"
            icon={repeat}
            onTouchTap={
              () => {
                this.select(0)
                this.speak(voice, words)
              }
            }
          />
          <BottomNavigationItem
            label="Hints"
            icon={hints}
            onTouchTap={() => {
              this.select(1)
              this.speak(voice, hint)
            }
          }
          />
          <BottomNavigationItem
            label="Run Code"
            icon={play}
            onTouchTap={() => this.select(2)}
          />
          <BottomNavigationItem
            label="Save Code"
            icon={save}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

const mapStateToProps = ({ question }) => ({ question })
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar)
