import React from "react"
import { connect } from "react-redux"

import { updateFormField } from "../../actions/form"

import SearchSelectionInput from "../ui/SearchSelectionInput"

import "./StyleAndArt.css"

class StyleAndArts extends React.Component {
  state = {
    selectedHunterArts: [
      {
        id: -1,
        name: "art1",
        gaugesize: 0,
        description: "",
        weapon: "General"
      },
      {
        id: -1,
        name: "",
        gaugesize: 0,
        description: "",
        weapon: "General"
      }
    ],
    hunterArts: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hunterArts !== this.props.hunterArts) {
      this.setState({
        hunterArts: this.props.hunterArts
      })
    }
    if (prevProps.weapon.class !== this.props.weapon.class) {
      console.log("new weapon class chosen, filtering arts...")
      const arts = this.filterHunterArts(this.props.weapon.class)
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
    this.props.updateFormField("styleAndArts", field, e.target.value)

    // const newValue = e.target.value
    // let stateChange = Object.assign({}, this.state)
    // stateChange[field] = newValue
    // this.setState(stateChange)
    // // this.props.updateStyleAndArts({ selectedStyle: stateChange.selectedStyle })
    // this.props.updateFormField("armorSet", "field", "value")
    switch (e.target.value) {
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
    const { selectedHunterArts } = this.props.styleAndArtsForm.values
    const newState = Object.assign({}, this.state, {
      selectedHunterArts: selectedHunterArts
        .slice(0, id)
        .concat(Object.assign({}, { id: item.id, name: item.name, gaugesize: item.gaugesize, description: item.description, weapon: item.weapon }))
        .concat(selectedHunterArts.slice(Number(id) + 1))
    })
    // this.props.updateStyleAndArts({ selectedHunterArts: newState.selectedHunterArts })
    this.props.updateFormField("styleAndArts", "selectedHunterArts", newState.selectedHunterArts)
    this.setState(newState)
  }

  changeHunterArt(amount) {
    const { selectedHunterArts } = this.props.styleAndArtsForm.values
    let l = selectedHunterArts.length
    if (l < amount) this.addHunterArt(amount - l)
    if (l > amount) this.removeHunterArt(amount)
  }

  addHunterArt(length) {
    const { selectedHunterArts } = this.props.styleAndArtsForm.values
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push({ id: -1, name: "", gaugesize: 0, description: "", weapon: "General" });
    }
    const newValue = selectedHunterArts.concat(data)

    // this.props.updateStyleAndArts({ selectedHunterArts: newState.selectedHunterArts })
    this.props.updateFormField("styleAndArts", "selectedHunterArts", newValue)
    this.setState({
      selectedHunterArts: newValue
    })
  }

  removeHunterArt(index) {
    const { selectedHunterArts } = this.props.styleAndArtsForm.values
    const newValue = selectedHunterArts.slice(0, index)

    // this.props.updateStyleAndArts({ selectedHunterArts: newState.selectedHunterArts })
    this.props.updateFormField("styleAndArts", "selectedHunterArts", newValue)
    this.setState({
      selectedHunterArts: newValue
    })
  }

  render() {
    // const { selectedHunterArts } = styleAndArtsForm.values
    const { hunterArts, selectedHunterArts } = this.state
    const { errors } = this.props.styleAndArtsForm
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
          {errors.selectedStyle.map((error, i) =>
            <div key={i}>{error.message}</div>
          )}
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
      { errors.selectedHunterArts.map((error, i) =>
      <div key={i}>{error.message}</div>
    )
    }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  styleAndArtsForm: state.form.styleAndArts,
  hunterArts: state.hunterArt.hunterArts,
  weapon: state.form.armorSet.values.selectedWeapon.equipment
})

const mapDispatchToProps = dispatch => ({
  updateFormField(form, field, value) {
    dispatch(updateFormField(form, field, value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StyleAndArts)