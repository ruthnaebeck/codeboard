/* global SpeechSynthesisUtterance Event */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import SvgIcon from 'material-ui/SvgIcon'

import Paper from 'material-ui/Paper'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/text'
import 'brace/theme/github'

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

  render() {
    const voice = window.speechSynthesis
    const words = new SpeechSynthesisUtterance(this.props.question.text)
    // this.speak(voice, words)
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
                <Play />
              </span>
              <span
                className="span-arrow">
                <Save />
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

const Play = () => (
  <SvgIcon>
    <path d="M8 5v14l11-7z" />
  </SvgIcon>
)

const Save = () => (
  <SvgIcon>
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
  </SvgIcon>
)

const mapStateToProps = ({ question }) => ({ question })
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard)
