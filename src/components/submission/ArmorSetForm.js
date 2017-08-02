import React from "react"
import { connect } from "react-redux"
import SearchSelectionInput from "../ui/SearchSelectionInput"
import DecorationsMenu from "../ui/DecorationsMenu"
import SelectCharm from "../ui/SelectCharm"
import image from "../../images/"
import "./ArmorSetForm.css"
import { initialValues } from "./armorset.schema"

class ArmorSetForm extends React.Component {
  state = initialValues

  handleChange(field, e) {
    const newValue = e.target.value
    this.setState({
      [field]: newValue
    })
  }

  selectItem = (type, item) => {
    this.setState({
      [type]: Object.assign({}, this.state[type], { equipment: item })

    })
    console.log(this.state)
  }

  selectDecoration = (part, decoration, size, id, decorations) => {
    let usedSlots = 0
    const sizes = decorations.map((deco) => deco.size)
    for (let i = 0; i < decorations.length; i++) {
      if (i !== id) usedSlots += sizes[i]
      else usedSlots += decoration.size
    }
    console.log("used slots: ", usedSlots)
    this.setState({
      [part]: Object.assign({}, this.state[part], {
        decorations: decorations
          .slice(0, id)
          .concat(Object.assign({}, decorations[id], decoration))
          .concat(decorations.slice(id + 1))
      }, {
          usedSlots: usedSlots
        })
    })
  }

  availableDecorations = (part, decorations) =>
    this.props.decorations.filter((decoration) =>
      decoration.size <= this.state[part].equipment.slots
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
    this.setState({ armorType: type })
    console.log("change armortype to " + type)
    this.setArmorLists(type)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.armors !== prevProps.armors) {
      console.log("updating...")
      this.setArmorLists(this.state.armorType)
    }
  }

  render() {
    const { weapons, decorations } = this.props
    const { heads, torsos, arms, waists, feet } = this.state
    return (
      <div className="armor-set-form--container">
        <table className="table-armorset">
          <thead>
            <tr>
              <th>
                Equipment |
                Blademaster <input type="radio" name="armorType" value="Blademaster" defaultChecked
                  onClick={this.changeArmorType.bind(this, "Blademaster")} />
                Gunner <input type="radio" name="armorType" value="Gunner"
                  onClick={this.changeArmorType.bind(this, "Gunner")} />
              </th>
            </tr>
            <tr>
              <td className="table-armorset--single">
                <input
                  value={this.state.setName}
                  placeholder="Set name"
                  onChange={this.handleChange.bind(this, "setName")} />
              </td>
            </tr>
            <tr>
              <th className="table-armorset--long-column">
                Name
              </th>
              <th>
                Slots
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={image.greatSword} alt="weapon" width="30" height="30" />
                <SearchSelectionInput items={weapons} selectItem={this.selectItem} item="selectedWeapon" />
              </td>
              <td>
                {this.decorationIcon(this.state.selectedWeapon.slots)}
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.head} alt="head" width="30" height="30" />
                <SearchSelectionInput items={heads} selectItem={this.selectItem} item="selectedHead" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={this.state.selectedHead.usedSlots} slots={this.state.selectedHead.equipment.slots} decorations={this.availableDecorations("selectedHead", decorations)} part="selectedHead" />
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.torso} alt="torso" width="30" height="30" />
                <SearchSelectionInput items={torsos} selectItem={this.selectItem} item="selectedTorso" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={this.state.selectedTorso.usedSlots} slots={this.state.selectedTorso.equipment.slots} decorations={this.availableDecorations("selectedTorso", decorations)} part="selectedTorso" />

              </td>
            </tr>
            <tr>
              <td>
                <img src={image.arms} alt="arms" width="30" height="30" />
                <SearchSelectionInput items={arms} selectItem={this.selectItem} item="selectedArms" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={this.state.selectedArms.usedSlots} slots={this.state.selectedArms.equipment.slots} decorations={this.availableDecorations("selectedArms", decorations)} part="selectedArms" />

              </td>
            </tr>
            <tr>
              <td>
                <img src={image.waist} alt="waist" width="30" height="30" />
                <SearchSelectionInput items={waists} selectItem={this.selectItem} item="selectedWaist" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={this.state.selectedWaist.usedSlots} slots={this.state.selectedWaist.equipment.slots} decorations={this.availableDecorations("selectedWaist", decorations)} part="selectedWaist" />

              </td>
            </tr>
            <tr>
              <td>
                <img src={image.feet} alt="feet" width="30" height="30" />
                <SearchSelectionInput items={feet} selectItem={this.selectItem} item="selectedFeet" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={this.state.selectedFeet.usedSlots} slots={this.state.selectedFeet.equipment.slots} decorations={this.availableDecorations("selectedFeet", decorations)} part="selectedFeet" />

              </td>
            </tr>
            <tr>
              <td>
                <SelectCharm selectItem={this.selectItem} item="selectedCharm" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} usedSlots={this.state.selectedCharm.usedSlots} slots={this.state.selectedCharm.equipment.slots} decorations={this.availableDecorations("selectedCharm", decorations)} part="selectedCharm" />

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  weapons: state.weapon.weapons,
  armors: state.armor.armors,
  decorations: state.decoration.decorations,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ArmorSetForm)