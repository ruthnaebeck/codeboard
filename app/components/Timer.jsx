import React, { Component } from 'react'
import { connect } from 'react-redux'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      counter: 0,
      running: false
    }
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000)
    this.setState({ timer })
  }

  componentWillReceiveProps() {
    this.setState({ running: this.props.timer })
  }

  tick = () => {
    if (this.state.running) {
      this.setState({
        counter: this.state.counter + 1
      })
    }
  }

  render() {
    return (
      <div>
        <h4>{`${Math.floor(this.state.counter/60)}:${this.state.counter%60<10 ? '0' + this.state.counter%60 : this.state.counter%60}`}</h4>
      </div>
    )
  }
}

const mapStateToProps = ({ timer }) => ({ timer })

export default connect(mapStateToProps, null)(Timer)
