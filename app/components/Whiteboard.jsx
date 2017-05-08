import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Paper from 'material-ui/Paper'

const _ = require('lodash')
const fp = require('lodash/fp')
const object = require('lodash/fp/object')

export default class Whiteboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: ''
    }
  }

  componentDidMount() {
    const textInput = document.getElementById('textInput')
    console.log('TEXT INPUT: ', textInput)
    textInput.addEventListener('myscript-text-web-result', function(e) {
      const inputTextPath = _.get(e, 'detail.result.textSegmentResult.candidates[0].label', 'not found, default')
      console.log('IS THIS OUR RESULT???', inputTextPath)
    })
  }

  render() {
    const style = {
      height: '100vh',
      width: '48vw',
      margin: '10px 0px 10px 0px',
      textAlign: 'center',
      display: 'inline-block'
    }
    return (
      <div className="row">
        <div className="col-sm-6">
          <Paper style={style} zDepth={3} />
        </div>
        <div className="col-sm-6" id="myScript">
          <Paper style={style} zDepth={3}>
          <myscript-text-web id="textInput"
            applicationkey="b3eb3c07-12df-4809-8bc5-18715cf3b24e"
            hmackey="bc9ba480-0640-44bc-b9e5-8480e9954577"
            language="en_US"
            recognitioncandidates="1"></myscript-text-web>
          </Paper>
        </div>
      </div>
    )
  }
}
