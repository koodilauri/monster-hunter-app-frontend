import React from "react"
import { connect } from "react-redux"

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
      <div>
        <select onChange={this.handleChange.bind(this, "slots")}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select onChange={this.handleChange.bind(this, "skill1")}>
          {this.renderSkills(skills)}
        </select>
        <input onChange={this.handleChange.bind(this, "amount1")} type="number" placeholder="skill 1 amount" />
        <select onChange={this.handleChange.bind(this, "skill2")}>
          {this.renderSkills(skills)}
        </select>
        <input onChange={this.handleChange.bind(this, "amount2")} type="number" placeholder="skill 2 amount" />
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