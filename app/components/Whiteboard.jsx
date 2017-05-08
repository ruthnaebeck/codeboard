/* global SpeechSynthesisUtterance */

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
      colEditor: 'col-sm-6'
    }
  }

  componentDidMount() {
    const textInput = document.getElementById('textInput')
    // console.log('TEXT INPUT: ', textInput)
    textInput.addEventListener('myscript-text-web-result', function(e) {
      const inputTextPath = _.get(e, 'detail.result.textSegmentResult.candidates[0].label', 'not found, default')
      // console.log('IS THIS OUR RESULT???', inputTextPath)
    })
  }

  render() {
    const voice = window.speechSynthesis
    const words = new SpeechSynthesisUtterance(this.props.question.text)
    const arrowStyle = {
      height: '18px',
      width: '18px'
    }
    return (
      <div>
        <div>
          { /* voice.speak(words) */}
        </div>
        <div className="row">
          <div className={this.state.colEditor}>
            <Paper className="ace" zDepth={3}>
              <SvgIcon className="left-arrow">
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
              </SvgIcon>
              <SvgIcon className="right-arrow">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
              </SvgIcon>
              <AceEditor
                mode="text"
                theme="github"
                name="editor"
                width="94%"
                height="90%"
                editorProps={{ $blockScrolling: true }}
              />
            </Paper>
          </div>
          <div className={this.state.colWB}>
            <Paper className="ace" zDepth={3}>
              <SvgIcon className="left-arrow">
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
              </SvgIcon>
              <SvgIcon className="right-arrow">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
              </SvgIcon>
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

const mapState = ({ question }) => ({ question })

export default connect(mapState, null)(Whiteboard)
