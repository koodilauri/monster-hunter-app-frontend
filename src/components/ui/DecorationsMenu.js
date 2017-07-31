import React from "react"

class DecorationsMenu extends React.Component {
  state = {
    decorations: [],
    freeSlots: 0,
    selectedDecorations: [
      {
        id: -1,
        size: 0
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
      data.push({ id: -1, size: 0 });
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
    const index = e.target.value - 1
    this.setState({
      selectedDecorations: selectedDecorations
        .slice(0, id)
        .concat(Object.assign({}, selectedDecorations[id], decorations[index] ))
        .concat(this.state.selectedDecorations.slice(id + 1))
    })
    console.log(this.state, index)
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