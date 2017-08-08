import React from "react"
import { connect } from "react-redux"
import { updateStyleAndArts } from "../../actions/form"
import "./StyleAndArt.css"
import SearchSelectionInput from "../ui/SearchSelectionInput"
import { initialValues } from "./styleAndArts.schema"

class StyleAndArts extends React.Component {
  state = {
    selectedStyle: initialValues.selectedStyle,
    selectedHunterArts:initialValues.selectedHunterArts,
    hunterArts: [],
    weapon: {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hunterArts !== this.props.hunterArts){
      this.setState({
        hunterArts: this.props.hunterArts
      })
    }
    if (prevProps.weapon.class !== this.props.weapon.class) {
      const arts = this.filterHunterArts(this.props.weapon.class)
      console.log("new weapon class chosen...", arts, this.props.weapon)
      this.setState({
        weapon: this.props.weapon,
        hunterArts: arts 
      })
    }
  }

  filterHunterArts = (type) =>
    this.props.hunterArts.filter((art) =>
      (art.weapon === type || art.weapon === "General")
    )

  handleChange(field, e) {
    const newValue = e.target.value
    let stateChange = Object.assign({}, this.state)
    stateChange[field] = newValue
    this.setState(stateChange)
    this.props.updateStyleAndArts({ selectedStyle: stateChange.selectedStyle })
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
    const newState = Object.assign({}, this.state, {
      selectedHunterArts: this.state.selectedHunterArts
        .slice(0, id)
        .concat(Object.assign({}, { id: item.id, name: item.name, gaugesize: item.gaugesize, description: item.description, weapon: item.weapon }))
        .concat(this.state.selectedHunterArts.slice(Number(id) + 1))
    })
    this.setState(newState)
    this.props.updateStyleAndArts({ selectedHunterArts: newState.selectedHunterArts })
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
    const newState = Object.assign({}, this.state, {
      selectedHunterArts: selectedHunterArts.concat(data)
    })
    this.setState(newState)
    this.props.updateStyleAndArts({ selectedHunterArts: newState.selectedHunterArts })
  }

  removeHunterArt(index) {
    const { selectedHunterArts } = this.state
    const newState = Object.assign({}, this.state, {
      selectedHunterArts: selectedHunterArts
        .slice(0, index)
    })
    this.setState(newState)
    this.props.updateStyleAndArts({ selectedHunterArts: newState.selectedHunterArts })
  }

  render() {
    const { hunterArts } = this.state
    const { selectedHunterArts } = this.state
    return (
      <div className="style-and-arts--container">
        <div className="style-and-arts--row style-and-arts--head">
          Style and Hunter Arts
        </div>
        <div className="style-and-arts--row  style-and-arts--head">
          Style
        </div>
        <div className="style-and-arts--row">
          <select
            name="selectedStyle"
            className="form-control"
            onChange={this.handleChange.bind(this, "selectedStyle")}
          >
            <option value="Guild">Guild</option>
            <option value="Striker">Striker</option>
            <option value="Adept">Adept</option>
            <option value="Aerial">Aerial</option>
          </select>
        </div>
        <div className="style-and-arts--row  style-and-arts--head">
          Hunter Arts
        </div>
        <div className="style-and-arts--row">
          <SearchSelectionInput items={hunterArts} selectItem={this.selectItem} item="0" />
        </div>
        <div className="style-and-arts--row">
          {selectedHunterArts[0].gaugesize}
        </div>
        <div className="style-and-arts--row">
          {selectedHunterArts[1] ?
            <SearchSelectionInput items={hunterArts} selectItem={this.selectItem} item="1" />
            : "---"}
        </div>
        <div className="style-and-arts--row">
          {selectedHunterArts[1] ? selectedHunterArts[1].gaugesize : "---"}
        </div>
        <div className="style-and-arts--row">
          {selectedHunterArts[2] ?
            <SearchSelectionInput items={hunterArts} selectItem={this.selectItem} item="2" />
            : "---"}
        </div>
        <div className="style-and-arts--row">
          {selectedHunterArts[2] ? selectedHunterArts[2].gaugesize : "---"}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hunterArts: state.hunterArt.hunterArts,
  weapon: state.form.armorSet.selectedWeapon.equipment
})

const mapDispatchToProps = dispatch => ({
  updateStyleAndArts(state) {
    dispatch(updateStyleAndArts(state))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StyleAndArts)