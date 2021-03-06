/* global SpeechSynthesisUtterance Event draws whiteboard mocha */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchUserQuestions } from 'APP/app/reducers/userQuestions'
import { stopTimer } from 'APP/app/reducers/timer'
import { fetchUserQuestion } from 'APP/app/reducers/userQuestion'
import { saveQuestion } from '../reducers/userQuestion'
import SvgIcon from 'material-ui/SvgIcon'
import Paper from 'material-ui/Paper'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/text'
import 'brace/theme/github'

import BottomNavBar from './BottomNavBar'
import Popup from './Popup'
import Canvas from './Canvas'

class Whiteboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
      wbText: '',
      colWB: 'col-sm-6 colWB',
      colEdit: 'col-sm-6 colEdit',
    }
  }

  componentDidMount() {
    if (window.whiteboard) window.whiteboard.clear()
    const scriptc = document.createElement('script')
    scriptc.src = '/js/canvas.js'
    scriptc.async = true
    document.body.appendChild(scriptc)
  }

  componentWillReceiveProps(nextProps) {
    if (window.whiteboard) window.whiteboard.clear()
    if (nextProps.userQuestion) {
      this.setState({
        inputText: nextProps.userQuestion.user_answer,
      })
      setTimeout(this.drawWB, 200)
    } else {
      this.setState({ inputText: nextProps.question.start_function })
    }
    const tests = nextProps.question.tests
    if (tests) {
      mocha.suite.suites = []
      const testSpecs = document.getElementById('testSpecs')
      if (testSpecs) testSpecs.remove()
      const script = document.createElement('script')
      script.src = `/questions-specs/${tests}`
      script.async = true
      script.id = 'testSpecs'
      document.body.appendChild(script)
    }
  }

  componentWillUnmount() {
    this.props.stopTimer()
  }
  drawWB = () => {
    const userQuestion = this.props.userQuestion
    if (userQuestion) {
      userQuestion.user_drawing.forEach(draw => {
        window.whiteboard.draw(draw.start, draw.end, draw.color)
      })
    }
  }

  resize = () => window.dispatchEvent(new Event('resize'))

  handleEdit = (arrow) => {
    document.getElementById('sol').className = 'col-hide colSol'
    const colEdit = this.state.colEdit
    if (arrow === 'left') {
      if (colEdit === 'col-sm-6 colEdit') {
        this.setState({
          colEdit: 'col-hide',
          colWB: 'col-sm-12'
        }, this.resize)
      } else {
        this.setState({
          colEdit: 'col-sm-6 colEdit',
          colWB: 'col-sm-6 colWB'
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
      if (colWB === 'col-sm-6 colWB') {
        this.setState({
          colWB: 'col-hide',
          colEdit: 'col-sm-12'
        }, this.resize)
      } else {
        this.setState({
          colEdit: 'col-sm-6 colEdit',
          colWB: 'col-sm-6 colWB'
        }, this.resize)
      }
    } else {
      this.setState({
        colEdit: 'col-hide',
        colWB: 'col-sm-12'
      }, this.resize)
    }
  }

  handleChange = (code) => {
    this.setState({ inputText: code })
  }

  handleSave = (questionStatus) => {
    const uId = this.props.auth.id
    const qId = this.props.question.id
    const question = {
      user_id: uId,
      question_id: qId,
      user_answer: this.state.inputText,
      user_drawing: draws,
      status: questionStatus
    }
    this.props.saveQuestion(uId, qId, question)
  }

  userCode = () => {
    var codeScript = document.getElementById('runTests')
    const code = this.state.inputText
    if (codeScript) codeScript.remove()
    codeScript = document.createElement('script')
    codeScript.id = 'runTests'
    codeScript.appendChild(document.createTextNode(code))
    document.body.appendChild(codeScript)
  }

  render() {
    return (
      <div>
        <Popup />
        <div className="row">
          <div id="edit" className={this.state.colEdit}>
            <Paper className="wbPaper" zDepth={3}>
            {this.state.colWB === 'col-hide'
              ? <div><span
                  className="span-arrow"
                  onClick={() => this.handleEdit('left')}>
                  <LeftArrow />
                </span></div>
              : <div><span
                  className="span-arrow"
                  onClick={() => this.handleEdit('left')}>
                  <LeftArrow />
                  </span>
                  <span
                  className="span-arrow"
                  onClick={this.handleEdit}>
                  <RightArrow />
                </span></div>}
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
          <div id="wb" className={this.state.colWB}>
            <Paper className="wbPaper" zDepth={3}>
              {this.state.colEdit === 'col-hide'
              ? <div><span
                  className="span-arrow"
                  onClick={() => this.handleWB('right')}>
                  <RightArrow />
                </span></div>
              : <div><span
                  className="span-arrow"
                  onClick={this.handleWB}>
                  <LeftArrow />
                  </span>
                  <span
                  className="span-arrow"
                  onClick={() => this.handleWB('right')}>
                  <RightArrow />
                </span></div>}
              <Canvas />
            </Paper>
          </div>
          <div id="sol" className={`col-hide colSol`}>
            <Paper className="wbPaper" zDepth={3}>
            <h4>Solutions</h4>
              <iframe
                src={`/questions-specs/${this.props.question.solution}`}
                width="95%"
                height="90%"
                frameBorder="0"
              />
            </Paper>
          </div>
          <div className='col-sm-12'>
            <BottomNavBar
              handleSave={this.handleSave}
              userCode={this.userCode} />
          </div>
          <div id="mocha" className="col-hide" />
        </div>
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

const mapStateToProps = ({ question, auth, userQuestion, drawer }) =>
  ({ question, auth, userQuestion, drawer })
const mapDispatchToProps = ({ fetchUserQuestion, stopTimer, saveQuestion })

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard)
