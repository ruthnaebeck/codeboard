/* global SpeechSynthesisUtterance Event */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { saveQuestion } from '../reducers/userQuestions'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import Save from 'material-ui/svg-icons/content/save'
import Play from 'material-ui/svg-icons/av/play-arrow'
import Help from 'material-ui/svg-icons/action/help'
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import Repeat from 'material-ui/svg-icons/action/record-voice-over'
import Solutions from 'material-ui/svg-icons/action/lock-open'
import Hint from 'material-ui/svg-icons/action/lightbulb-outline'
import FlatButton from 'material-ui/FlatButton'
import {List, ListItem} from 'material-ui/List'

const save = <Save />
const play = <Play />
const help = <Help />
const repeat = <Repeat />
const solutions = <Solutions />
const hints = <Hint />
const arrow = <RightArrow />
const helpTopics = [
    {topic: 'Click on the arrows at the top of the page to expand or hide the text editor and whiteboard', icon: arrow},
    {topic: 'Click "Repeat Question" to hear the prompt again. You can have the question repeated only once.', icon: repeat},
    {topic: 'Click "Hints" to hear a hint. There are three hints per question.', icon: hints},
    {topic: 'Click "Run Code" to test your solution.', icon: play},
    {topic: 'If you are logged in, you can click "Save Code" to save your solution.', icon: save},
    {topic: 'Click "Show Solutions" to see a set of possible solutions and their space/time complexity.', icon: solutions}
]

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
      solutionText: 'Show Solutions',
      helpDialog: false
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
          this.setState({ prompt: `Your function failed with an input ${test[i].description}` }, this.reset)
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
      user_answer: this.props.wbState.inputText,
      status: this.state.questionStatus
    }
    this.props.saveQuestion(uId, qId, question)
    this.setState({ snackbar: true })
  }

  handleClose = () => this.setState({ snackbar: false })
  handleHelp = () => this.setState({ helpDialog: !this.state.helpDialog })

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
    const actions = [
      <FlatButton
        label="Exit"
        primary={true}
        onTouchTap={this.handleHelp}
      />
    ]
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
              <BottomNavigationItem
                label='Help'
                icon={help}
                onClick={this.handleHelp}
                onTouchTap={() => this.select(5) }
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
          <Dialog
            title="Help"
            actions={actions}
            onRequestClose={this.handleHelp}
            open={this.state.helpDialog}
            autoScrollBodyContent={true}
          >
            <List>
            {helpTopics.map(topic =>
              <ListItem key={topic.topic} primaryText={topic.topic} leftIcon={topic.icon} />
            )}
            </List>
          </Dialog>
      </div>
      )
    } else {
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
            <BottomNavigationItem
              label='Help'
              icon={help}
              onClick={this.handleHelp}
              onTouchTap={() => this.select(4) }
            />
          </BottomNavigation>
        </Paper>
        <Dialog
          title="Help"
          actions={actions}
          onRequestClose={this.handleHelp}
          open={this.state.helpDialog}
          autoScrollBodyContent={true}
        >
          <List>
          {helpTopics.map(topic =>
            <ListItem key={topic.topic} primaryText={topic.topic} leftIcon={topic.icon} />
          )}
          </List>
        </Dialog>
      </div>
      )
    }
  }
}

const mapStateToProps = ({ question, auth, userQuestions }) =>
  ({ question, auth, userQuestions })
const mapDispatchToProps = ({ saveQuestion })

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar)
