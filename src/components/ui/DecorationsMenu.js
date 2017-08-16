import React from "react"
import { updateFormField } from "../../actions/form"
import { connect } from "react-redux"

import "./DecorationsMenu.css"

class DecorationsMenu extends React.Component {
  state = {
    decorations: [],
    usedSlots: 0,
    selectedDecorations: [
      {
        id: -1,
        size: 0,
        name: "---",
        skill1_id: 149,
        skill2_id: 149,
        bonus1: 0,
        bonus2: 0,
        skill_name: "---"
      }
    ],
    decolist0: [],
    decolist1: [],
    decolist2: [],
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      decorations: newProps.decorations,
      usedSlots: newProps.usedSlots
    })
    switch (newProps.slots) {
      case 3:
        this.changeDecorations(3)
        break
      case 2:
        this.changeDecorations(2)
        break
      case 1:
        this.changeDecorations(1)
        break
      default:
        this.changeDecorations(0)

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.decorations.length !== this.props.decorations.length) {
      // console.log("new decos for component ", prevProps.decorations.length)
      this.setState({
        decolist0: this.props.decorations,
        decolist1: this.props.decorations,
        decolist2: this.props.decorations
      })
      this.props.updateFormField("armorSet", this.props.part, { equipment: this.props.armorSetForm.values[this.props.part].equipment, decorations: [], usedSlots: 0 })
    }
    if (prevProps.usedSlots !== this.props.usedSlots) {
      //shiet happns. elä updeittaa sen decon listaa joka muuttuu
      // const prevDecos = prevProps.armorSetForm.values[prevProps.part].decorations
      // const newDecos = this.props.armorSetForm.values[this.props.part].decorations
      const availableSlots = this.props.slots - this.state.usedSlots
      let newLists = [undefined, undefined, undefined]
      for (let i = 0; i < 3; i++) {
        // if (prevDecos[i] !== newDecos) {
          newLists[i] = this.availableDecorations(this.state.selectedDecorations[i] || { size: 0 }, availableSlots)
        // }
      }
      this.setState({
        decolist0: newLists[0] || this.state.decolist0,
        decolist1: newLists[1] || this.state.decolist1,
        decolist2: newLists[2] || this.state.decolist2
      })
    }
  }

  availableDecorations = (selectedDecoration, max) =>
    this.state.decorations.filter((decoration) =>
      decoration.size <= selectedDecoration.size || decoration.size <= max) /// shiet

  changeDecorations(amount) {
    const { selectedDecorations } = this.state
    let l = selectedDecorations.length
    if (l !== amount) this.addDecoration(amount)
  }

  addDecoration(length) {
    // const { selectedDecorations } = this.state
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push({
        id: -1,
        size: 0,
        name: "---",
        skill1_id: 149,
        skill2_id: 149,
        bonus1: 0,
        bonus2: 0,
        skill_name: "---"
      });
    }
    this.setState({
      selectedDecorations: data
    })
  }

  removeDecoration(index) {
    const { selectedDecorations } = this.state
    this.setState({
      selectedDecorations: selectedDecorations
        .slice(0, index)
    })
  }

  handleChange = (id, list, e) => {
    e.preventDefault()
    const { selectedDecorations } = this.state

    const newValue = this.state[list].find(x => x.id === Number(e.target.value)) || {
      id: 1,
      size: 0,
      name: "---",
      skill1_id: 149,
      skill2_id: 149,
      bonus1: 0,
      bonus2: 0,
      skill_name: "---"
    }

    this.setState({
      selectedDecorations: selectedDecorations
        .slice(0, id)
        .concat(Object.assign({}, selectedDecorations[id], newValue))
        .concat(this.state.selectedDecorations.slice(id + 1))
    })
    this.props.selectDecoration(this.props.part, newValue, this.props.slots, id, selectedDecorations)
  }

  renderDecorationOptions(list) {
    return this.state[list].map((decoration, id) =>
      <option key={id} value={decoration.id}>{decoration.skill_name} +{decoration.bonus1}, size: {decoration.size}</option>
    )
  }

  renderDecorations(id) {
    return <select
      className="form-control table__input--decoration"
      onChange={this.handleChange.bind(this, id, "decolist" + id)}
      value={this.state.selectedDecorations[id].id}
    >
      {this.renderDecorationOptions("decolist" + id)}
    </select>
  }

  render() {
    const { selectedDecorations } = this.state
    return (
      <div className="decoration-container">
        {selectedDecorations[0] && this.state.decolist0[0] ?
          <div>{this.renderDecorations(0)}</div>
          : <div>-</div>}
        {selectedDecorations[1] && this.state.decolist1[0] ?
          <div>{this.renderDecorations(1)}</div>
          : <div>-</div>}
        {selectedDecorations[2] && this.state.decolist2[0] ?
          <div>{this.renderDecorations(2)}</div>
          : <div>-</div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  armorSetForm: state.form.armorSet,
})
const mapDispatchToProps = dispatch => ({
  updateFormField(form, field, value) {
    dispatch(updateFormField(form, field, value))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(DecorationsMenu)