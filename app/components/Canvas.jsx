import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <canvas id='paint'></canvas>
        <div id="color-selector">
            <div className="marker selected" id="black"></div>
            <div className="marker" id="red"></div>
            <div className="marker" id="blue"></div>
            <div className="marker" id="green"></div>
            <div className="marker" id="white"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = null
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
