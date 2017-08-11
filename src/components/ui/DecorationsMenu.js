import React from "react"
import { updateFormField } from "../../actions/form"
import { connect } from "react-redux"

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
      console.log("new decos for component ",prevProps.decorations.length)
      this.setState({
        decolist0: this.props.decorations,
        decolist1: this.props.decorations,
        decolist2: this.props.decorations
      })
      this.props.updateFormField("armorSet", this.props.part, { equipment: this.props.armorSetForm.values[this.props.part].equipment, decorations: [], usedSlots: 0 })
      //to do: initialize decos for the armor piece so old ones dont linger
    }
    if (prevProps.usedSlots !== this.props.usedSlots) {
      // console.log("updated: free slots ", this.props.slots - this.state.usedSlots, this.state)
      this.setState({
        decolist0: this.availableDecorations(this.state.selectedDecorations[0] || { size: 0 }, this.props.slots - this.state.usedSlots),
        decolist1: this.availableDecorations(this.state.selectedDecorations[1] || { size: 0 }, this.props.slots - this.state.usedSlots),
        decolist2: this.availableDecorations(this.state.selectedDecorations[2] || { size: 0 }, this.props.slots - this.state.usedSlots)
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

  handleChange = (id, e) => {
    e.preventDefault()
    const { decorations, selectedDecorations } = this.state
    // const { slots } = this.props
    const newValue = decorations[e.target.value - 1] || {
      id: -1,
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
    // if (newValue.size === 3) {
    //   id = 0
    //   this.setState({
    //     selectedDecorations: selectedDecorations
    //       .slice(0, id)
    //       .concat(Object.assign({}, selectedDecorations[id], newValue))
    //       .concat(this.state.selectedDecorations.slice(id + 1))
    //   })
    // }
    // else if (newValue.size === 2 && slots === 2) {
    //   id = 0
    //   this.setState({
    //     selectedDecorations: selectedDecorations
    //       .slice(0, id)
    //       .concat(Object.assign({}, selectedDecorations[id], newValue))
    //       .concat(this.state.selectedDecorations.slice(id + 1))
    //   })
    // }
    // else if (newValue.size === 2 && id === 2) {
    //   id--
    //   this.setState({
    //     selectedDecorations: selectedDecorations
    //       .slice(0, id)
    //       .concat(Object.assign({}, selectedDecorations[id], newValue))
    //       .concat(this.state.selectedDecorations.slice(id + 1))
    //   })
    // }
    // else

    // if (newValue.size === 3) {
    //   this.changeDecorations(1)
    // }
    // if (newValue.size === 2 && this.props.slots === 2) this.changeDecorations(1)
    // if (newValue.size === 2 && this.props.slots === 3) this.changeDecorations(2)
    // if (newValue.size === 1 && this.props.slots >= 1) this.changeDecorations(this.props.slots)
  }

  renderDecorationOptions(list) {
    return this.state[list].map((decoration, id) =>
      <option key={id} value={decoration.id}>{decoration.skill_name} +{decoration.bonus1}, size: {decoration.size}</option>
    )
  }

  renderDecorations(id) {
    return <select
      className="table__input--decoration"
      onChange={this.handleChange.bind(this, id)}
      value={this.state.selectedDecorations[id].id}
    >
      {this.renderDecorationOptions("decolist" + id)}
    </select>
  }

  render() {
    const { selectedDecorations } = this.state
    return (
      <div>
        {selectedDecorations[0] && this.state.decolist0[0] ?
          <div>{this.renderDecorations(0)}</div>
          : "-"}
        {selectedDecorations[1] && this.state.decolist1[0] ?
          <div>{this.renderDecorations(1)}</div>
          : "-"}
        {selectedDecorations[2] && this.state.decolist2[0] ?
          <div>{this.renderDecorations(2)}</div>
          : "-"}
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