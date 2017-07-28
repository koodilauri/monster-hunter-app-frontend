import React from "react"
import { connect } from "react-redux"
import SearchSelectionInput from "../ui/SearchSelectionInput"
import image from "../../images/"
import "./ArmorSetForm.css"

class ArmorSetForm extends React.Component {
  state = {
    setName: "",
    selectedWeapon: {
      slots: "---",
      class: "greatsword"
    },
    selectedHead: {
      slots: "---"
    },
    selectedTorso: {
      slots: "---"
    },
    selectedArms: {
      slots: "---"
    },
    selectedWaist: {
      slots: "---"
    },
    selectedFeet: {
      slots: "---"
    },
    heads: [],
    torsos: [],
    arms: [],
    waists: [],
    feet: []
  }

  componentDidMount() {
    this.setLists()
  }

  handleChange(field, e) {
    const newValue = e.target.value
    this.setState({
      [field]: newValue
    })
  }

  selectItem = (type, item) => {
    console.log("valittu item ", type)
    this.setState({
      [type]: item
    })
    console.log(this.state)
    this.setLists()
  }

  armorFilter = part =>
    this.props.armors.filter((armor) => {
      return (armor.part.toLowerCase() === part && (armor.type === "Blademaster" || armor.type === "Both"))
    })

  setLists() {
    this.setState({
      heads: this.armorFilter("head"),
      torsos: this.armorFilter("torso"),
      arms: this.armorFilter("arms"),
      waists: this.armorFilter("waist"),
      feet: this.armorFilter("feet")
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

  render() {
    const { weapons } = this.props
    const { heads, torsos, arms, waists, feet } = this.state
    return (
      <div>
        <table className="table-armorset">
          <thead>
            <tr>
              <th>
                Equipment
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
                {this.decorationIcon(this.state.selectedHead.slots)}
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
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ArmorSetForm)