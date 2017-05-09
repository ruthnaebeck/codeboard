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
      colEdit: 'col-sm-6'
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
    const leftArrow = 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z'
    const rightArrow = 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z'
    return (
      <div>
        <div>
          { /* voice.speak(words) */}
        </div>
        <div className="row">
          <div className={`${this.state.colEdit} colEdit`}>
            <Paper className="ace" zDepth={3}>
              <span onClick={() => console.log('span clicked')}>
                <SvgIcon><path d={leftArrow}/></SvgIcon>
              </span>
              <button
                className="btn-arrow"
                onClick={() => console.log('button click')}>
                <SvgIcon><path d={rightArrow}/></SvgIcon>
              </button>
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
          <div className={`${this.state.colWB} colWB`}>
            <Paper className="ace" zDepth={3}>
              <button className="btn-arrow">
                <SvgIcon><path d={leftArrow}/></SvgIcon>
              </button>
              <button className="btn-arrow">
                <SvgIcon><path d={rightArrow}/></SvgIcon>
              </button>
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

const mapStateToProps = ({ question }) => ({ question })
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard)
