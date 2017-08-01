import React from "react"

class DecorationsMenu extends React.Component {
  state = {
    decorations: [],
    freeSlots: 0,
    selectedDecorations: [
      {
        id: -1,
        size: 0,
        name: "---",
        skill1id: 149,
        skill2id: 149,
        bonus1: 0,
        bonus2: 0,
        skillname: "---"
      }
    ]
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      decorations: newProps.decorations,
      freeSlots: newProps.slots
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

  changeDecorations(amount) {
    const { selectedDecorations } = this.state
    let l = selectedDecorations.length
    if (l < amount) this.addDecoration(amount - l)
    if (l > amount) this.removeDecoration(amount)
  }

  addDecoration(length) {
    const { selectedDecorations } = this.state
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push({
        id: -1,
        size: 0,
        name: "---",
        skill1id: 149,
        skill2id: 149,
        bonus1: 0,
        bonus2: 0,
        skillname: "---"
      });
    }
    this.setState({
      selectedDecorations: selectedDecorations.concat(data)
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
    const { slots } = this.props
    const newValue = decorations[e.target.value - 1] || {
      id: -1,
      size: 0,
      name: "---",
      skill1id: 149,
      skill2id: 149,
      bonus1: 0,
      bonus2: 0,
      skillname: "---"
    }
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
      this.setState({
      selectedDecorations: selectedDecorations
        .slice(0, id)
        .concat(Object.assign({}, selectedDecorations[id], newValue))
        .concat(this.state.selectedDecorations.slice(id + 1))
    })

        this.props.selectDecoration(this.props.part, newValue)

    // if (newValue.size === 3) {
    //   this.changeDecorations(1)
    // }
    // if (newValue.size === 2 && this.props.slots === 2) this.changeDecorations(1)
    // if (newValue.size === 2 && this.props.slots === 3) this.changeDecorations(2)
    // if (newValue.size === 1 && this.props.slots >= 1) this.changeDecorations(this.props.slots)


    console.log(this.state)
  }

  renderDecorationsList() {
    return this.state.decorations.map((decoration, id) =>
      <option key={id} value={decoration.id}>{decoration.skillname} +{decoration.bonus1}, {decoration.name}, size: {decoration.size}</option>
    )
  }

  renderDecorations(id) {
    return <select
      className="table__input--decoration"
      onChange={this.handleChange.bind(this, id)}
      value={this.state.selectedDecorations[id].id}
    >
      <option value="-1">---</option>
      {this.renderDecorationsList()}
    </select>
  }

  render() {
    const { selectedDecorations } = this.state
    return (
      <div>
        {selectedDecorations[0] ?
          <div>{this.renderDecorations(0)}</div>
          : "-"}
        {selectedDecorations[1] ?
          <div>{this.renderDecorations(1)}</div>
          : "-"}
        {selectedDecorations[2] ?
          <div>{this.renderDecorations(2)}</div>
          : "-"}
      </div>
    )
  }
}

export default DecorationsMenu