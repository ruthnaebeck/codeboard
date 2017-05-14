/* global SpeechSynthesisUtterance Event mocha isUnique */
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
      snackbar: false,
      solutionText: 'Show Solutions'
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

  runTests = () => mocha.run()

  checkTests = () => {
    const mochaTests = mocha.suite.suites[0].tests
    for (let i = 0; i < mochaTests.length; i++) {
      if (mochaTests[i].state === 'failed') {
        this.setState({
          prompt: `Your function failed ${mochaTests[i].title}`
        }, this.reset)
        return
      }
    }
    this.setState({
      prompt: 'Congrats, you passed all of the tests',
      questionStatus: 'complete'
    }, this.reset)
  }

  resetTests = () => {
    mocha.suite.suites = []
    let testSpecs = document.getElementById('testSpecs')
    if (testSpecs) testSpecs.remove()
    const tests = this.props.question.tests
    testSpecs = document.createElement('script')
    testSpecs.src = `/questions-specs/${tests}`
    testSpecs.async = true
    testSpecs.id = 'testSpecs'
    document.body.appendChild(testSpecs)
  }

  handlePlay = () => {
    try {
      // Delete previous mocha stats / reports if they exist
      const mochaDiv = document.getElementById('mocha')
      const mochaStats = document.getElementById('mocha-stats')
      const mochaReport = document.getElementById('mocha-report')
      if (mochaStats) mochaDiv.removeChild(mochaStats)
      if (mochaReport) mochaDiv.removeChild(mochaReport)
      // Create or Update the user's code on the DOM
      var codeScript = document.getElementById('runTests')
      const code = this.props.wbState.inputText
      if (codeScript) codeScript.remove()
      codeScript = document.createElement('script')
      codeScript.id = 'runTests'
      codeScript.appendChild(document.createTextNode(code))
      document.body.appendChild(codeScript)
      // Run the mocha / chai tests
      this.runTests()
      // Check the tests
      setTimeout(this.checkTests, 300)
      // Reset the tests
      setTimeout(this.resetTests, 1000)
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
      user_answer: this.props.wbState.inputText,
      status: this.state.questionStatus
    }
    this.props.saveQuestion(uId, qId, question)
    this.setState({ snackbar: true })
  }

  handleClose = () => this.setState({ snackbar: false })

  handleSolutions = () => {
    const solutionText = this.state.solutionText
    if (solutionText === 'Show Solutions') {
      this.setState({ solutionText: 'Hide Solutions' })
      document.getElementById('edit').className = 'col-sm-6 colEdit'
      document.getElementById('wb').className = 'col-hide colWB'
      document.getElementById('sol').className = 'col-sm-6 colSol'
      // const arrows = document.getElementsByClassName('span-arrow')
      // for (let i = 0; i < arrows.length; i++) {
      //   arrows[i].className = 'span-arrow col-hide'
      // }
    } else {
      this.setState({ solutionText: 'Show Solutions' })
      document.getElementById('edit').className = 'col-sm-6 colEdit'
      document.getElementById('wb').className = 'col-sm-6 colWB'
      document.getElementById('sol').className = 'col-hide colSol'
      // const arrows = document.getElementsByClassName('span-arrow')
      // for (let i = 0; i < arrows.length; i++) {
      //   arrows[i].className = 'span-arrow'
      // }
    }
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
                label={this.state.solutionText}
                icon={solutions}
                onClick={this.handleSolutions}
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
            label={this.state.solutionText}
            icon={solutions}
            onClick={this.handleSolutions}
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
