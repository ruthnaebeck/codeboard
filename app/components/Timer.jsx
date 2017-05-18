import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { stopTimer, startTimer } from 'APP/app/reducers/timer'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      counter: 0,
      pathname: ''
    }
  }

  componentDidMount() {
    // let timer = setInterval(this.tick, 1000)
    // this.setState({ timer: timer, pathname: browserHistory.getCurrentLocation().pathname })
    this.newTimer()
  }
  newTimer = () => {
    let timer = setInterval(this.tick, 1000)
    this.setState({ timer: timer, pathname: browserHistory.getCurrentLocation().pathname })
  }

  tick = () => {
    if (browserHistory.getCurrentLocation().pathname === this.state.pathname) {
      this.setState({
        counter: this.state.counter + 1
      })
    } else if (browserHistory.getCurrentLocation().pathname.slice(0, 9) === '/question') {
      clearInterval(this.state.timer)
      this.props.stopTimer()
      this.props.startTimer()
    } else {
      clearInterval(this.state.timer)
    }
  }

  render() {
    return (
        <span style={{color: 'white', float: 'right'}}>{`${Math.floor(this.state.counter/60)}:${this.state.counter%60<10 ? '0' + this.state.counter%60 : this.state.counter%60}`}</span>
    )
  }
}

const mapStateToProps = ({ timer, question }) => ({ timer, question })

export default connect(mapStateToProps, {startTimer, stopTimer})(Timer)
