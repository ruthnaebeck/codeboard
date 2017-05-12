/* global SpeechSynthesisUtterance Event */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { saveQuestion } from '../reducers/userQuestions'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import Save from 'material-ui/svg-icons/content/save'
import Play from 'material-ui/svg-icons/av/play-arrow'
import Hints from 'material-ui/svg-icons/action/help'
import Repeat from 'material-ui/svg-icons/action/record-voice-over'
import Solutions from 'material-ui/svg-icons/action/lock-open'

const save = <Save />
const play = <Play />
const hints = <Hints />
const repeat = <Repeat />
const solutions = <Solutions />

class BottomNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      prompt: '',
      questionStatus: 'pending',
      spoken: false,
      currentHintIdx: 0,
      snackbar: false
    }
  }
  repeatQuestion = (voice, words) => {
    this.select(0)
    if (!this.state.spoken) {
      this.speak(voice, words)
      this.setState({
        spoken: true
      })
    }
  }

  giveHint = (voice, hint) => {
    this.select(1)
    this.speak(voice, hint)
    this.setState({
      currentHintIdx: this.state.currentHintIdx + 1
    })
  }

  speak = (voice, words) => voice.speak(words)

  select = (index) => this.setState({selectedIndex: index})
  reset = () => this.setState({ prompt: '' })

  handlePlay = () => {
    const code = this.props.wbState.inputText
    const test = this.props.question.tests
    try {
      const func = eval(`(${code})`)
      for (let i=0; i<test.length; i++) {
        if (func(test[i].input) !== test[i].output) {
          this.setState({ prompt: `Your function failed with the input ${test[i].input}` }, this.reset)
          return
        }
      }
      this.setState({
        prompt: 'Congrats, your function passed all of the tests',
        questionStatus: 'complete'
      }, this.reset)
    } catch (err) {
      this.setState({ prompt: 'Please write a valid function' }, this.reset)
    }
  }

  handleSave = () => {
    const uId = this.props.auth.id
    const qId = this.props.question.id
    const question = {
      user_id: uId,
      question_id: qId,
      user_answer: this.props.inputText,
      status: this.state.questionStatus
    }
    this.props.saveQuestion(uId, qId, question)
    this.setState({ snackbar: true })
  }

  handleClose = () => this.setState({ snackbar: false })

  showSolutions = () => {
    document.getElementById('edit').className = 'col-sm-6 colEdit'
    document.getElementById('wb').className = 'col-hide colWB'
    document.getElementById('sol').className = 'col-sm-6 colSol'
  }

  render() {
    const voice = window.speechSynthesis
    const currentHintIdx = this.state.currentHintIdx
    const words = new SpeechSynthesisUtterance(this.props.question.text)
    const currentHint = !this.props.question.hints ? '' : (this.props.question.hints[currentHintIdx] ? this.props.question.hints[currentHintIdx].text : 'You are out of hints')
    const hint = new SpeechSynthesisUtterance(currentHint)
    const prompt = new SpeechSynthesisUtterance(this.state.prompt)
    voice.speak(prompt)
    const user = this.props.auth
    if (user) {
      return (
        <div>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Repeat Question"
                icon={repeat}
                onTouchTap={() => this.repeatQuestion(voice, words)}
              />
              <BottomNavigationItem
                label="Hints"
                icon={hints}
                onTouchTap={() => this.giveHint(voice, hint) }
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
                onClick={this.handleSave}
                onTouchTap={() => this.select(3) }
                />
              <BottomNavigationItem
                label="Show Solutions"
                icon={solutions}
                onClick={this.showSolutions}
                onTouchTap={() => this.select(4) }
                />
            </BottomNavigation>
          </Paper>
          <Snackbar
            className="snackbar"
            open={this.state.snackbar}
            message="Code Saved"
            autoHideDuration={2000}
            onRequestClose={this.handleClose}
          />
      </div>
      )
    } else {
      return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Repeat Question"
            icon={repeat}
            onTouchTap={() => this.repeatQuestion(voice, words)}
          />
          <BottomNavigationItem
            label="Hints"
            icon={hints}
            onTouchTap={() => this.giveHint(voice, hint)}
          />
          <BottomNavigationItem
            label="Run Code"
            icon={play}
            onClick={this.handlePlay}
            onTouchTap={() => this.select(2)}
          />
          <BottomNavigationItem
            label="Show Solutions"
            icon={solutions}
            onClick={this.showSolutions}
            onTouchTap={() => this.select(3) }
          />
        </BottomNavigation>
      </Paper>
      )
    }
  }
}

const mapStateToProps = ({ question, auth, userQuestions }) =>
  ({ question, auth, userQuestions })
const mapDispatchToProps = ({ saveQuestion })

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar)
