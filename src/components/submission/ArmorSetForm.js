import React from "react"
import { connect } from "react-redux"
import SearchSelectionInput from "../ui/SearchSelectionInput"
import DecorationsMenu from "../ui/DecorationsMenu"
import SelectCharm from "../ui/SelectCharm"
import image from "../../images/"
import "./ArmorSetForm.css"

class ArmorSetForm extends React.Component {
  state = {
    armorType: "Blademaster",
    setName: "",
    selectedWeapon: {
      slots: 0,
      class: "greatsword"
    },
    selectedHead: {
      slots: 0
    },
    selectedTorso: {
      slots: 0
    },
    selectedArms: {
      slots: 0
    },
    selectedWaist: {
      slots: 0
    },
    selectedFeet: {
      slots: 0
    },
    selectedCharm: {
      slots: 0,
      skill1: {
        id: 149
      },
      amount1: 0,
      skill2: {
        id: 149
      },
      amount2: 0
    },
    heads: [],
    torsos: [],
    arms: [],
    waists: [],
    feet: [],
    weaponDecorations: [],
    headDecorations: [],
    torsoDecorations: [],
    armsDecorations: [],
    waistDecorations: [],
    feetDecorations: []
  }

  handleChange(field, e) {
    const newValue = e.target.value
    this.setState({
      [field]: newValue
    })
  }

  selectItem = (type, item) => {
    this.setState({
      [type]: item
    })
    console.log(this.state)
  }

  selectDecoration = (part, decoration, size, id, decorations) => {
    this.setState({
      [part]: decorations
        .slice(0, id)
        .concat(Object.assign({}, decorations[id], decoration))
        .concat(decorations.slice(id + 1))
    })
  }

  availibleDecorations = (part, decos, decorations) =>
    this.props.decorations.filter((decoration) =>
      decoration.size <= this.state[part].slots
    )

  armorFilter = (part, type) =>
    this.props.armors.filter((armor) => {
      return (armor.part.toLowerCase() === part && (armor.type === type || armor.type === "Both"))
    })

  setArmorLists(type) {
    console.log("setting lists...")
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
                Blademaster <input type="radio" name="armorType" value="Blademaster"
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
                <DecorationsMenu selectDecoration={this.selectDecoration} slots={this.state.selectedHead.slots} decorations={this.availibleDecorations("selectedHead", "headDecorations", decorations)} part="headDecorations" />
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.torso} alt="torso" width="30" height="30" />
                <SearchSelectionInput items={torsos} selectItem={this.selectItem} item="selectedTorso" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} slots={this.state.selectedTorso.slots} decorations={this.availibleDecorations("selectedTorso", "torsoDecorations", decorations)} part="torsoDecorations" />

              </td>
            </tr>
            <tr>
              <td>
                <img src={image.arms} alt="arms" width="30" height="30" />
                <SearchSelectionInput items={arms} selectItem={this.selectItem} item="selectedArms" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} slots={this.state.selectedArms.slots} decorations={this.availibleDecorations("selectedArms", "armsDecorations", decorations)} part="armsDecorations" />
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.waist} alt="waist" width="30" height="30" />
                <SearchSelectionInput items={waists} selectItem={this.selectItem} item="selectedWaist" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} slots={this.state.selectedWaist.slots} decorations={this.availibleDecorations("selectedWaist", "waistDecorations", decorations)} part="waistDecorations" />
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.feet} alt="feet" width="30" height="30" />
                <SearchSelectionInput items={feet} selectItem={this.selectItem} item="selectedFeet" />
              </td>
              <td>
                <DecorationsMenu selectDecoration={this.selectDecoration} slots={this.state.selectedFeet.slots} decorations={this.availibleDecorations("selectedFeet", "feetDecorations", decorations)} part="feetDecorations" />
              </td>
            </tr>
            <tr>
              <td>
                <SelectCharm />
              </td>
              <td>
                ---
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