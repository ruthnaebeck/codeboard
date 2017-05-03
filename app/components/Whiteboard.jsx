import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
    textInput.addEventListener('myscript-text-web-result', function (e) {
      console.log('IS THIS OUR RESULT???', e.detail.result.textSegmentResult.candidates[0].label)
    })
  }

  render() {
    return (
      <div id="myScript">
        <myscript-text-web id="textInput"
          applicationkey="94c6ca22-7b13-45c7-8373-3646a965968a"
          hmackey="9210ab3c-5e61-4a0e-8bd0-f0ef912c7208"
          language="en_US"
          recognitioncandidates="1"></myscript-text-web>
      </div>
    )
  }
}


