import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      counter: 0
    }
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000)
    this.setState({ timer })
  }

  tick = () => {
    if (browserHistory.getCurrentLocation().pathname.slice(0, 9) === '/question') {
      this.setState({
        counter: this.state.counter + 1
      })
    } else clearInterval(this.state.timer)
  }

  render() {
    return (
        <span style={{color: 'white', float: 'right'}}>{`${Math.floor(this.state.counter/60)}:${this.state.counter%60<10 ? '0' + this.state.counter%60 : this.state.counter%60}`}</span>
    )
  }
}

const mapStateToProps = ({ timer }) => ({ timer })

export default connect(mapStateToProps, null)(Timer)
