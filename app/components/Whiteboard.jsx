/* global SpeechSynthesisUtterance test Event */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchUserQuestions } from 'APP/app/reducers/userQuestions'
import SvgIcon from 'material-ui/SvgIcon'
import Paper from 'material-ui/Paper'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/text'
import 'brace/theme/github'

import BottomNavBar from './BottomNavBar'

const _ = require('lodash')
const fp = require('lodash/fp')
const object = require('lodash/fp/object')

class Whiteboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
      colWB: 'col-sm-6',
      colEdit: 'col-sm-6',
      spoken: false
    }
  }

  componentDidMount() {
    const textInput = document.getElementById('textInput')
    const wbThis = this
    textInput.addEventListener('myscript-text-web-result', function(e) {
      // Can you do this outside the listener? -- LOW PRIORITY
      const inputTextPath = _.get(e, 'detail.result.textSegmentResult.candidates[0].label', '')
      wbThis.setState({ inputText: inputTextPath })
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   const script = document.createElement('script')
  //   script.src = `/questions-specs/${nextProps.question.tests}`
  //   script.async = true
  //   document.body.appendChild(script)
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      const userQuestions = (data) => {
        const userQuestion =
          data.filter(question =>
            question.question_id === this.props.question.id
          )
        if (userQuestion.length) this.setState({ inputText: userQuestion[0].user_answer })
      }
      this.props.fetchUserQuestions(nextProps.auth.id, userQuestions)
    }
  }

  componentDidUpdate() {
    if (!this.state.spoken) this.setState({ spoken: true })
  }

  resize = () => window.dispatchEvent(new Event('resize'))

  handleEdit = (arrow) => {
    const colEdit = this.state.colEdit
    if (arrow === 'left') {
      if (colEdit === 'col-sm-6') {
        this.setState({
          colEdit: 'col-hide',
          colWB: 'col-sm-12'
        }, this.resize)
      } else {
        this.setState({
          colEdit: 'col-sm-6',
          colWB: 'col-sm-6'
        }, this.resize)
      }
    } else {
      this.setState({
        colWB: 'col-hide',
        colEdit: 'col-sm-12'
      }, this.resize)
    }
  }

  handleWB = (arrow) => {
    const colWB = this.state.colWB
    if (arrow === 'right') {
      if (colWB === 'col-sm-6') {
        this.setState({
          colWB: 'col-hide',
          colEdit: 'col-sm-12'
        }, this.resize)
      } else {
        this.setState({
          colEdit: 'col-sm-6',
          colWB: 'col-sm-6'
        }, this.resize)
      }
    } else {
      this.setState({
        colEdit: 'col-hide',
        colWB: 'col-sm-12'
      }, this.resize)
    }
  }

  speak = (voice, words) => {
    if (!this.state.spoken) {
      voice.speak(words)
    }
  }

  handleChange = (code) => {
    this.setState({ inputText: code })
  }

  render() {
    const voice = window.speechSynthesis
    const words = new SpeechSynthesisUtterance(this.props.question.text)
    this.speak(voice, words)
    return (
      <div>
        <div className="row">
          <div className={`${this.state.colEdit} colEdit`}>
            <Paper className="ace" zDepth={3}>
              <span
                className="span-arrow"
                onClick={() => this.handleEdit('left')}>
                <LeftArrow />
              </span>
              <span
                className="span-arrow">
              </span>
              <span
                className="span-arrow"
                onClick={this.handleEdit}>
                <RightArrow />
              </span>
              <AceEditor
                className="ace-editor"
                mode="text"
                theme="github"
                name="editor"
                width="94%"
                height="90%"
                wrapEnabled={true}
                editorProps={{ $blockScrolling: true }}
                value={this.state.inputText}
                onChange={this.handleChange}
              />
            </Paper>
          </div>
          <div className={`${this.state.colWB} colWB`}>
            <Paper className="ace" zDepth={3}>
              <span
                className="span-arrow"
                onClick={this.handleWB}>
                <LeftArrow />
              </span>
              <span
                className="span-arrow"
                onClick={() => this.handleWB('right')}>
                <RightArrow />
              </span>
              <myscript-text-web id="textInput"
                applicationkey="b3eb3c07-12df-4809-8bc5-18715cf3b24e"
                hmackey="bc9ba480-0640-44bc-b9e5-8480e9954577"
                language="en_US"
                recognitioncandidates="1"></myscript-text-web>
            </Paper>
          </div>
        </div>
        <BottomNavBar wbState={this.state} />
      </div>
    )
  }
}

const LeftArrow = () => (
  <SvgIcon>
    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
  </SvgIcon>
)

const RightArrow = () => (
  <SvgIcon>
    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
  </SvgIcon>
)

const mapStateToProps = ({ question, auth }) => ({ question, auth })
const mapDispatchToProps = ({ fetchUserQuestions })

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard)
