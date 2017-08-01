import React from "react"
import { connect } from "react-redux"
import "./StyleAndArt.css"
import SearchSelectionInput from "../ui/SearchSelectionInput"

class StyleAndArts extends React.Component {
  state = {
    selectedStyle: "Guild",
    styles: ["Guild", "Striker", "Adept", "Aerial"],
    selectedHunterArts: [{
      id: -1,
      name: "art1",
      gaugesize: 0,
      description: "",
      weapon: "General"
    },
    {
      id: -1,
      name: "art2",
      gaugesize: 0,
      description: "",
      weapon: "General"
    }]
  }

  handleChange(field, e) {
    const newValue = e.target.value
    let stateChange = Object.assign({}, this.state)
    stateChange[field] = newValue
    this.setState(stateChange)

    switch (newValue) {
      case "Guild":
        this.changeHunterArt(2)
        break
      case "Striker":
        this.changeHunterArt(3)
        break
      case "Adept":
        this.changeHunterArt(1)
        break
      case "Aerial":
        this.changeHunterArt(1)
        break
      default:
        break
    }
  }

  selectItem = (id, item) => {
    this.setState({
      selectedHunterArts: this.state.selectedHunterArts
        .slice(0, id)
        .concat(Object.assign({}, { id: item.id, name: item.name, gaugesize: item.gaugesize, description: item.description, weapon: item.weapon }))
        .concat(this.state.selectedHunterArts.slice(Number(id) + 1))
    })
  }

  changeHunterArt(amount) {
    const { selectedHunterArts } = this.state
    let l = selectedHunterArts.length
    if (l < amount) this.addHunterArt(amount - l)
    if (l > amount) this.removeHunterArt(amount)
  }

  addHunterArt(length) {
    const { selectedHunterArts } = this.state
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push({ id: -1, name: "", gaugesize: 0, description: "", weapon: "General" });
    }
    this.setState({
      selectedHunterArts: selectedHunterArts.concat(data)
    })
  }

  removeHunterArt(index) {
    const { selectedHunterArts } = this.state
    this.setState({
      selectedHunterArts: selectedHunterArts
        .slice(0, index)
    })
  }

  render() {
    const { hunterArts } = this.props
    const { selectedHunterArts } = this.state
    return (
      <div className="style-and-arts--container">
        <table className="table-style-art">
          <thead>
            <tr>
              <th>
                Style and Hunter Arts
            </th>
            </tr>
            <tr>
              <th>
                Style
            </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  name="selectedStyle"
                  onChange={this.handleChange.bind(this, "selectedStyle")}
                >
                  {this.state.styles.map(style => <option key={style} value={style}>{style}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <th>
                Hunter Arts
            </th>
            </tr>
            <tr>
              <td>
                <SearchSelectionInput items={hunterArts} selectItem={this.selectItem} item="0" />
              </td>
            </tr>
            <tr>
              <td>
                {selectedHunterArts[0].gaugesize}
              </td>
            </tr>
            <tr>
              <td>
                {selectedHunterArts[1] ?
                  <SearchSelectionInput items={hunterArts} selectItem={this.selectItem} item="1" />
                  : "---"}
              </td>
            </tr>
            <tr>
              <td>
                {selectedHunterArts[1] ? selectedHunterArts[1].gaugesize : "---"}
              </td>
            </tr>
            <tr>
              <td>
                {selectedHunterArts[2] ?
                  <SearchSelectionInput items={hunterArts} selectItem={this.selectItem} item="2" />
                  : "---"}

              </td>
            </tr>
            <tr>
              <td>
                {selectedHunterArts[2] ? selectedHunterArts[2].gaugesize : "---"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hunterArts: state.hunterArt.hunterArts,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(StyleAndArts)