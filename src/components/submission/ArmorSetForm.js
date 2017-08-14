import React from "react"
import { connect } from "react-redux"

import { updateFormField } from "../../actions/form"

import SearchSelectionInput from "../ui/SearchSelectionInput"
import DecorationsMenu from "../ui/DecorationsMenu"
import SelectCharm from "../ui/SelectCharm"

import image from "../../images/"

import "./ArmorSetForm.css"

class ArmorSetForm extends React.Component {

  state = {
    heads: [],
    torsos: [],
    arms: [],
    waists: [],
    feet: []
  }

  handleChange(field, e) {
    const newValue = e.target.value
    // const newState = Object.assign({}, this.state, { [field]: newValue })
    // this.setState(newState)
    // this.props.updateArmorSetForm({ [field]: newValue })
    this.props.updateFormField("armorSet", field, newValue)
  }

  selectItem = (type, item) => {
    const newValue = Object.assign({}, this.props.armorSetForm.values[type], {
      equipment: item
    })

    // this.setState(Object.assign({}, this.state, newValue))
    // this.props.updateArmorSetForm(newValue)
    this.props.updateFormField("armorSet", type, newValue)
  }

  selectDecoration = (part, decoration, size, id, decorations) => {
    let usedSlots = 0
    const sizes = decorations.map((deco) => deco.size)
    for (let i = 0; i < decorations.length; i++) {
      if (i !== id) usedSlots += sizes[i]
      else usedSlots += decoration.size
    }
    const newValue = {
      [part]: Object.assign({}, this.props.armorSetForm.values[part], {
        decorations: decorations
          .slice(0, id)
          .concat(Object.assign({}, decorations[id], decoration))
          .concat(decorations.slice(id + 1))
      }, {
          usedSlots: usedSlots
        })
    }
    // this.setState(Object.assign({}, this.state, newValue))
    // this.props.updateArmorSetForm(newValue)
    this.props.updateFormField("armorSet", part, { equipment: this.props.armorSetForm.values[part].equipment, decorations: newValue[part].decorations, usedSlots: newValue[part].usedSlots })
  }

  availableDecorations = (part, decorations) =>
    this.props.decorations.filter((decoration) =>
      decoration.size <= this.props.armorSetForm.values[part].equipment.slots
    )

  armorFilter = (part, type) =>
    this.props.armors.filter((armor) => {
      return (armor.part.toLowerCase() === part && (armor.type === type || armor.type === "Both"))
    })

  setArmorLists(type) {
    console.log("setting " + type + " lists... ", this.props.armors.length)
    this.setState({
      heads: this.armorFilter("head", type),
      torsos: this.armorFilter("torso", type),
      arms: this.armorFilter("arms", type),
      waists: this.armorFilter("waist", type),
      feet: this.armorFilter("feet", type)
    })
  }

  decorationIcon(slots) {
    let string = ""
    for (let i = 0; i < 3; i++) {
      if (i < slots) string += "◯"
      else string += "―"
    }
    return string
  }

  changeArmorType(type) {
    const newState = Object.assign({}, this.state, { armorType: type })
    this.setState(newState)
    // this.props.updateArmorSetForm({ armorType: type })
    this.props.updateFormField("armorSet", "armorType", type)
    this.setArmorLists(type)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.armors !== prevProps.armors) {
      console.log("updating armors...")
      this.setArmorLists(this.props.armorSetForm.values.armorType)
    }
  }

  render() {
    const { armorSetForm, weapons, decorations } = this.props
    const { selectedWeapon, selectedHead, selectedTorso, selectedArms, selectedWaist, selectedFeet, selectedCharm } = armorSetForm.values
    const { heads, torsos, arms, waists, feet } = this.state
    return (
      <div className="armor-set-form--container">
        <div className="armor-set-form-row">
          Equipment |
                Blademaster <input type="radio" name="armorType" value="Blademaster" defaultChecked
            onClick={this.changeArmorType.bind(this, "Blademaster")} />
          Gunner <input type="radio" name="armorType" value="Gunner"
            onClick={this.changeArmorType.bind(this, "Gunner")} />
        </div>
        <div className="armor-set-form-row">
          <input
            className="form-control"
            value={this.state.setName}
            placeholder="Set name"
            onChange={this.handleChange.bind(this, "setName")} />
          {armorSetForm.errors.setName.map((error, i) =>
            <div key={i}>{error.message}</div>
          )}
        </div>
        <div className="armor-set-form-row">
          <div>
            Name
          </div>
          <div>
            Slots
          </div>
        </div>
        <div className="armor-set-form-row">
          <img src={image.greatSword} alt="weapon" width="30" height="30" />
          <SearchSelectionInput items={weapons} selectItem={this.selectItem} errors={armorSetForm.errors.selectedWeapon} item="selectedWeapon" className="armor-set-form-col" />
          {this.decorationIcon(selectedWeapon.slots)}
        </div>
        <div className="armor-set-form-row">
          <img src={image.head} alt="head" width="30" height="30" />
          <SearchSelectionInput items={heads} selectItem={this.selectItem} errors={armorSetForm.errors.selectedHead} item="selectedHead" className="armor-set-form-col" />
          <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={selectedHead.usedSlots} slots={selectedHead.equipment.slots} decorations={this.availableDecorations("selectedHead", decorations)} part="selectedHead" />
        </div>
        <div className="armor-set-form-row">
          <img src={image.torso} alt="torso" width="30" height="30" />
          <SearchSelectionInput items={torsos} selectItem={this.selectItem} errors={armorSetForm.errors.selectedTorso} item="selectedTorso" className="armor-set-form-col" />
          <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={selectedTorso.usedSlots} slots={selectedTorso.equipment.slots} decorations={this.availableDecorations("selectedTorso", decorations)} part="selectedTorso" />
        </div>
        <div className="armor-set-form-row">
          <img src={image.arms} alt="arms" width="30" height="30" />
          <SearchSelectionInput items={arms} selectItem={this.selectItem} errors={armorSetForm.errors.selectedArms} item="selectedArms" className="armor-set-form-col" />
          <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={selectedArms.usedSlots} slots={selectedArms.equipment.slots} decorations={this.availableDecorations("selectedArms", decorations)} part="selectedArms" />
        </div>
        <div className="armor-set-form-row">
          <img src={image.waist} alt="waist" width="30" height="30" />
          <SearchSelectionInput items={waists} selectItem={this.selectItem} errors={armorSetForm.errors.selectedWaist} item="selectedWaist" className="armor-set-form-col" />
          <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={selectedWaist.usedSlots} slots={selectedWaist.equipment.slots} decorations={this.availableDecorations("selectedWaist", decorations)} part="selectedWaist" />
        </div>
        <div className="armor-set-form-row">
          <img src={image.feet} alt="feet" width="30" height="30" />
          <SearchSelectionInput items={feet} selectItem={this.selectItem} errors={armorSetForm.errors.selectedFeet} item="selectedFeet" className="armor-set-form-col" />
          <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={selectedFeet.usedSlots} slots={selectedFeet.equipment.slots} decorations={this.availableDecorations("selectedFeet", decorations)} part="selectedFeet" />
        </div>
        <div className="armor-set-form-row">
          <SelectCharm selectItem={this.selectItem} item="selectedCharm" className="armor-set-form-col" />
          <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={selectedCharm.usedSlots} slots={selectedCharm.equipment.slots} decorations={this.availableDecorations("selectedCharm", decorations)} part="selectedCharm" />
        </div>
      </div >
    )
  }

  // render() {
  //   return(
  //     <div>
  //       i am broken =(
  //     </div>
  //   )
  // }
}

const mapStateToProps = state => ({
  armorSetForm: state.form.armorSet,
  weapons: state.weapon.weapons,
  armors: state.armor.armors,
  decorations: state.decoration.decorations,
})

const mapDispatchToProps = dispatch => ({
  updateFormField(form, field, value) {
    dispatch(updateFormField(form, field, value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArmorSetForm)