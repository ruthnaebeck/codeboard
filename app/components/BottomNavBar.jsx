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
      selectedIndex: 0
    }
  }

  select = (index) => this.setState({selectedIndex: index})

  handlePlay = () => {
    const code = this.props.inputText
    const test = this.props.question.tests
    const func = eval(`(${code})`)
    for (let i=0; i<test.length; i++) {
      console.log('INPUT', test[i].input)
      if (func(test[i].input) !== test[i].output) {
        console.log('Test failed')
        return
      }
    }
    console.log('All tests pass')
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Repeat Question"
            icon={repeat}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Hints"
            icon={hints}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Run Code"
            icon={play}
            onClick={this.handlePlay}
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
