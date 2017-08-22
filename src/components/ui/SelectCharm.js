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

  handleChange = (type, nr, e) => {
    e.preventDefault()
    let newValue
    if (nr < 0) newValue = Number(e.target.value)
    else newValue = Number(nr)
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
    const { skills, slots } = this.props
    return (
      <div className="charm-container">
        <div className="charm--row">
          <p>Slots:</p>
          <div className="btn-group">
            <div className={slots === 0 ? "btn btn-default disabled" : "btn btn-default"}
              onClick={this.handleChange.bind(this, "slots", 0)}>
              0</div>
            <div className={slots === 1 ? "btn btn-default disabled" : "btn btn-default"}
              onClick={this.handleChange.bind(this, "slots", 1)}>
              1</div>
            <div className={slots === 2 ? "btn btn-default disabled" : "btn btn-default"}
              onClick={this.handleChange.bind(this, "slots", 2)}>
              2</div>
            <div className={slots === 3 ? "btn btn-default disabled" : "btn btn-default"}
              onClick={this.handleChange.bind(this, "slots", 3)}>
              3</div>
          </div>
        </div>
        <div className="charm--row">
          <select
            className="form-control charm--skill"
            value={this.state.charm.skill1}
            onChange={this.handleChange.bind(this, "skill1", -1)}>
            {this.renderSkills(skills)}
          </select>
          <input
            className="form-control charm--input"
            onChange={this.handleChange.bind(this, "amount1", -1)}
            type="number"
            placeholder="Amount" />
        </div>
        <div className="charm--row">
          <select
            className="form-control charm--skill"
            value={this.state.charm.skill2}
            onChange={this.handleChange.bind(this, "skill2", -1)}>
            {this.renderSkills(skills)}
          </select>
          <input
            className="form-control charm--input"
            onChange={this.handleChange.bind(this, "amount2", -1)}
            type="number"
            placeholder="Amount" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  skills: state.skill.skills,
  slots: state.form.armorSet.values.selectedCharm.equipment.slots
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCharm)