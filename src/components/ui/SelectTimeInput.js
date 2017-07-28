import React, { Component } from "react"

class SelectTimeInput extends Component {

  state = {
    minutes: 0,
    seconds: 0,
    limit: {
      minutes: 49,
      seconds: 59,
    },
    timeInterval: undefined,
  }

  /**
   * Pressing and holding the [+] or [-] button will start changing the number at
   * 50 ms intervals (either the minutes or the seconds). When the button is no longer
   * being pressed, the action stops with clearInterval(action).
   * @param {String} unit - Either "minutes" or "seconds"
   * @param {Boolean} increment - True if incrementing, false otherwise
   */
  startTimeInterval(unit, increment) {
    this.setState({
      timeInterval: setInterval(() => {
        let stateChange = {}
        let nextValue = increment ? this.state[unit] + 1 : this.state[unit] - 1
        if (nextValue === this.state.limit[unit] + 1) {
          nextValue = 0
        } else if (nextValue === -1) {
          nextValue = this.state.limit[unit]
        }
        stateChange[unit] = nextValue
        this.setState(stateChange)
        this.props.setTime(unit, nextValue)
      }, 60)
    })
  }

  stopTimeInterval = () => {
    clearInterval(this.state.timeInterval)
    this.setState({
      timeInterval: undefined,
    })
  }

  handleChange(unit, e) {
    // TODO validate input here
    let nextValue = parseInt(e.target.value, 10)
    if (nextValue > this.state.limit[unit]) {
      // too high
    } else if (nextValue < 0) {
      // too low
    } else {
      let stateChange = Object.assign({}, this.state)
      stateChange[unit] = nextValue
      this.setState(stateChange)
      this.props.setTime(unit, nextValue)
    }
  }

  renderTime(unit) {
    const value = this.state[unit]
    return (
      <div className="form-group select-time--container">
        <div className="form-group">
          <button
            type="button"
            className="btn btn-default button-timer"
            onMouseDown={this.startTimeInterval.bind(this, unit, true)}
            onMouseUp={this.stopTimeInterval}>+</button>
        </div>
        <div className="form-group select-time">
          <input
            type="number"
            className="select-time__input"
            value={value}
            onChange={this.handleChange.bind(this, unit)}
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-default button-timer"
            onMouseDown={this.startTimeInterval.bind(this, unit, false)}
            onMouseUp={this.stopTimeInterval}>-</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="select-time--container">
        {this.renderTime("minutes")}
        {this.renderTime("seconds")}
      </div>
    )
  }
}

export default SelectTimeInput