import React from "react"
import { connect } from "react-redux"
import "./SelectCharm.css"

class SelectCharm extends React.Component {
  state = {
    charm: {
      slots: 0,
      skill1: 149,
      skill2: 149,
      amount1: 0,
      amount2: 0
    }
  }

  handleChange = (type, e) => {
    e.preventDefault()
    const newValue = Number(e.target.value)
    const newCharm = Object.assign({}, this.state.charm, { [type]: newValue })
    this.setState({
      charm: newCharm
    })
    this.props.selectItem(this.props.item, newCharm)
  }

  renderSkills = (skills) =>
    skills.map((skill, id) =>
      <option key={id} value={skill.id}>{skill.name}</option>
    )

  render() {
    const { skills } = this.props
    return (
      <div className="charm-container">
        <div className="charm--row">
          <p>Slots:</p>
          <select
            className="form-control charm--slots"
            onChange={this.handleChange.bind(this, "slots")}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="charm--row">
          <select
            className="form-control charm--skill"
            value={this.state.charm.skill1}
            onChange={this.handleChange.bind(this, "skill1")}>
            {this.renderSkills(skills)}
          </select>
          <input
            className="form-control charm--input"
            onChange={this.handleChange.bind(this, "amount1")}
            type="number"
            placeholder="Amount" />
        </div>
        <div className="charm--row">
          <select
            className="form-control charm--skill"
            value={this.state.charm.skill2}
            onChange={this.handleChange.bind(this, "skill2")}>
            {this.renderSkills(skills)}
          </select>
          <input
            className="form-control charm--input"
            onChange={this.handleChange.bind(this, "amount2")}
            type="number"
            placeholder="Amount" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  skills: state.skill.skills,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCharm)