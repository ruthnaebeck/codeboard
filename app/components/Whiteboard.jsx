import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

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
      inputText: ''
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
        
    return (
      <div>
        <div>
          {voice.speak(words)}
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Paper className="ace" zDepth={3}>
              <AceEditor
                mode="text"
                theme="github"
                name="editor"
                width="94%"
                height="94%"
                editorProps={{ $blockScrolling: true }}
              />
            </Paper>
          </div>
          <div className="col-sm-6" id="myScript">
            <Paper className="ace" zDepth={3}>
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

const mapState = ({question}) => ({question})

export default connect(mapState, null)(Whiteboard)
