import React from "react"
import { connect } from "react-redux"
import SearchSelectionInput from "../ui/SearchSelectionInput"
import DecorationsMenu from "../ui/DecorationsMenu"
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
    heads: [],
    torsos: [],
    arms: [],
    waists: [],
    feet: []
  }

  handleChange(field, e) {
    const newValue = e.target.value
    this.setState({
      [field]: newValue
    })
  }

  selectItem = (type, item) => {
    if(item.type !== this.state.armorType && item.type !== "Both") console.log("väärä tyypi ", item.type)
    this.setState({
      [type]: item
    })
    console.log(this.state)
  }

  armorFilter = (part, type) =>
    this.props.armors.filter((armor) => {
      return (armor.part.toLowerCase() === part && (armor.type === type || armor.type === "Both"))
    })

  setLists(type) {
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
    this.setLists(type)
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
                <DecorationsMenu slots={this.state.selectedHead.slots} decorations={decorations} />
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.torso} alt="torso" width="30" height="30" />
                <SearchSelectionInput items={torsos} selectItem={this.selectItem} item="selectedTorso" />
              </td>
              <td>
                {this.decorationIcon(this.state.selectedTorso.slots)}
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.arms} alt="arms" width="30" height="30" />
                <SearchSelectionInput items={arms} selectItem={this.selectItem} item="selectedArms" />
              </td>
              <td>
                {this.decorationIcon(this.state.selectedArms.slots)}
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.waist} alt="waist" width="30" height="30" />
                <SearchSelectionInput items={waists} selectItem={this.selectItem} item="selectedWaist" />
              </td>
              <td>
                {this.decorationIcon(this.state.selectedWaist.slots)}
              </td>
            </tr>
            <tr>
              <td>
                <img src={image.feet} alt="feet" width="30" height="30" />
                <SearchSelectionInput items={feet} selectItem={this.selectItem} item="selectedFeet" />
              </td>
              <td>
                {this.decorationIcon(this.state.selectedFeet.slots)}
              </td>
            </tr>
            <tr>
              <td>
                Charm
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