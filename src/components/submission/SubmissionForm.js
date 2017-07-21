import React from "react"
import SubmissionList from "./SubmissionList"
import "./Submission.css"

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newSubmission: {
        name: "",
        questName: "",
        questId: "",
        weapon: "",
        weaponId: "",
        style: "Guild",
        min: 0,
        sec: 0,

      },
      action: "",
      armorSet: {
        setName: "",
        head: {
          name: "",
          id: 1
        },
        torso: {
          name: "",
          id: 2
        },
        arms: {
          name: "",
          id: 3
        },
        waist: {
          name: "",
          id: 4
        },
        feet: {
          name: "",
          id: 5
        },
        charm: {
          slots: 0,
          skill1: {
            id: 1
          },
          amount1: 0,
          skill2: {
            id: 149
          },
          amount2: 0
        },
        decorations: [{ decorationAmount: "1", decorationName: "placeholder" }]
      },
      armorType: "Blademaster",
      shownQuests: [],
      shownArmor: [],
      shownSkills: [],
      shownWeapons: [],
      hideQuests: true,
      hideArmor: true,
      hideWeapons: true,
      errorMessage: {
        message: "",
        hide: true
      }
    }
  }

  validateInput = (field, value) => {
    const patt1 = /^([a-zA-Z0-9:"!?,.&]+(-| )?)*$/i
    const patt2 = /^([0-4]{0,1}[0-9]{0,1})$/i
    const patt3 = /^([0-5]{0,1}[0-9]{0,1})$/i
    const patt4 = /^[1-9]{0,1}/
    const patt5 = /^(-{0,1}[0-9]{0,2})$/i

    if ((field === "name" || field === "questName" || field === "weapon" || field === "style" || field === "head" || field === "torso" || field === "arms" || field === "waist" || field === "feet" || field === "decorationName" || field === "setName") && patt1.test(value)) {
      return true
    }
    if (field === "min" && patt2.test(value)) {
      return true
    }
    if (field === "sec" && patt3.test(value)) {
      return true
    }
    if (((field === "decorationAmount" || field === "slots") && patt4.test(value)) || field === "deleteDecoration") {
      return true
    }
    if ((field === "amount1" || field === "amount2") && patt5.test(value)) {
      return true
    }
    if (field === "skill1" || field === "skill2") {
      return true
    }
    return false
  }

  handleChange = (field, form, id = 0, event) => {
    event.preventDefault()
    const newValue = event.target.value
    if (this.validateInput(field, newValue)) {
      switch (form) {
        case "armorset":
          if (field === "head" || field === "torso" || field === "arms" || field === "waist" || field === "feet") {
            this.setState({
              hideArmor: false,
              hideQuests: true,
              hideWeapons: true,
              armorSet: Object.assign({}, this.state.armorSet, { [field]: { name: newValue, id: this.state.armorSet[field].id } })
            })
            this.searchInput("armor", newValue, field)
          } else {
            this.setState({
              armorSet: Object.assign({}, this.state.armorSet, { [field]: newValue })
            })
          }
          break
        case "charm":
          if (field === "skill1" || field === "skill2") {
            this.setState({
              armorSet: Object.assign({}, this.state.armorSet, { charm: Object.assign({}, this.state.armorSet.charm, { [field]: { id: newValue } }) })
            })
          }
          if (field === "amount1" || field === "amount2" || field === "slots") {
            this.setState({
              armorSet: Object.assign({}, this.state.armorSet, { charm: Object.assign({}, this.state.armorSet.charm, { [field]: newValue }) })
            })
          }
          break
        case "decoration":
          this.setState({
            armorSet: Object.assign({}, this.state.armorSet, {
              "decorations": this.state.armorSet.decorations
                .slice(0, id)
                .concat(Object.assign({}, this.state.armorSet.decorations[id], { [field]: newValue }))
                .concat(this.state.armorSet.decorations.slice(id + 1))
            })
          })
          break
        case "deleteDecoration":
          this.setState({
            armorSet: Object.assign({}, this.state.armorSet, {
              "decorations": this.state.armorSet.decorations
                .slice(0, id)
                .concat(this.state.armorSet.decorations.slice(id + 1))
            })
          })
          break
        default:
          if (field === "min" || field === "sec") {
            this.setState({
              newSubmission: Object.assign({}, this.state.newSubmission, { [field]: Number(newValue) })
            })
          } else {
            this.setState({
              newSubmission: Object.assign({}, this.state.newSubmission, { [field]: newValue })
            })
          }
          if (field === "questName") {
            this.setState({
              hideQuests: false,
              hideArmor: true,
              hideWeapons: true,
            })
            this.searchInput("quest", newValue)
          }
          if (field === "weapon") {
            this.setState({
              hideWeapons: false,
              hideQuests: true,
              hideArmor: true,
            })
            this.searchInput("weapon", newValue)
          }
      }
    }
  }

  validateForm(newSubmission, armorSet) {
    let valid = ""
    let list
    list = this.props.quests.filter((quest) =>
      (quest.name.toLowerCase().indexOf(newSubmission.questName.toLowerCase()) !== -1 && quest.value === newSubmission.questId)
    )

    if (list.length === 1 && list[0].value === newSubmission.questId) {
      if (list[0].name !== newSubmission.questName) valid += "Quest"
    } else valid += "Quest,"

    list = this.props.weapons.filter((weapon) =>
      (weapon.name.toLowerCase().indexOf(newSubmission.weapon.toLowerCase()) !== -1 && weapon.id === newSubmission.weaponId)
    )

    if (list.length === 1 && list[0].id === newSubmission.weaponId) {
      if (list[0].name !== newSubmission.weapon) valid += " Weapon,"
    } else valid += " Weapon,"

    if (newSubmission.style === "Guild" || newSubmission.style === "Striker" || newSubmission.style === "Adept" || newSubmission.style === "Aerial") { }
    else valid += " Weapon style,"
    if (!this.validateInput("min", newSubmission.min)) { valid += " Min," }
    if (!this.validateInput("sec", newSubmission.sec)) { valid += " Sec," }

    if (!this.validateArmorPiece("head", armorSet.head.name, armorSet.head.id, 1)) valid += " Head,"
    if (!this.validateArmorPiece("torso", armorSet.torso.name, armorSet.torso.id, 2)) valid += " Torso,"
    if (!this.validateArmorPiece("arms", armorSet.arms.name, armorSet.arms.id, 3)) valid += " Arms,"
    if (!this.validateArmorPiece("waist", armorSet.waist.name, armorSet.waist.id, 4)) valid += " Waist,"
    if (!this.validateArmorPiece("feet", armorSet.feet.name, armorSet.feet.id, 5)) valid += " Feet,"
    return valid
  }

  validateArmorPiece(part, name, id, empty_id) {
    if ((name === "" || name === "Empty") && this.state.armorSet[part].id === empty_id) return true
    if (name === "" && this.state.armorSet[part].id !== empty_id) {
      this.setState({
        armorSet: Object.assign({}, this.state.armorSet, { [part]: { name: "Empty", id: empty_id } }),
        shownArmor: [],
        hideArmor: true
      })
      return true
    }
    else {
      let list = this.props.armor.filter((armor) => {
        return (armor.name.toLowerCase() === name.toLowerCase() && armor.part.toLowerCase() === part && (armor.type === this.state.armorType || armor.part === "Head" || armor.type === "Both") && armor.id === id)
      })
      if (list.length === 1 && list[0].id === id && list[0].name === name) {
        return true
      }
    }

    return false
  }

  handleSubmit = (newSubmission, event) => {
    event.preventDefault()
    const msg = this.validateForm(newSubmission, this.state.armorSet)
    if (msg === "") {
      this.setState({
        errorMessage: { message: msg, hide: true }
      })
      this.props.submitSubmission(newSubmission, this.state.armorSet)
    }
    else this.setState({
      errorMessage: { message: msg + " invalid, please check again.", hide: false }
    })
  }

  /**
   * Pressing and holding the [+] or [-] button will start changing the number at
   * 50 ms intervals (either the minutes or the seconds). When th button is no longer
   * being pressed, the action stops with clearInterval(action). changeTime does not
   * return any values.
   * @param {true | false} start - true to start interval, otherwise stop
   * @param {"inc" | "dec"} mode - describes whether to increase or decrease the number
   * @param {49 | 59} limit - max number, starts back from 0 when reached and vice versa
   * (49 for minutes, 59 for seconds)
   * @param {min | sec} unit - describes which newSubmission variable to change
   */
  changeTime = (start, mode, limit, unit, event) => {
    event.preventDefault()
    const { action } = this.state
    if (start && mode === "inc") {
      const act = setInterval(() => {
        if (limit > this.state.newSubmission[unit]) {
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: this.state.newSubmission[unit] + 1 })
          })
        } else {
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: 0 })
          })
        }
      }, 50)
      this.setState({
        action: act
      })
    } else {
      clearInterval(action)
    }
    if (start && mode === "dec") {
      const act = setInterval(() => {
        if (0 < this.state.newSubmission[unit]) {
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: this.state.newSubmission[unit] - 1 })
          })
        } else {
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: limit })
          })
        }
      }, 50)
      this.setState({
        action: act
      })
    } else {
      clearInterval(action)
    }
  }

  addDecoration = (event) => {
    this.setState({
      armorSet: Object.assign({}, this.state.armorSet,
        {
          decorations: [
            ...this.state.armorSet.decorations,
            {
              decorationAmount: "1",
              decorationName: ""
            }
          ]
        })
    })
  }

  renderDecorationList() {
    return this.props.decorations.map((decoration, id) =>
      <option key={id} value={decoration.id}>{decoration.skillname} +{decoration.bonus1}, {decoration.name}, size: {decoration.size}</option>
    )
  }

  renderDecorations() {
    const { decorations } = this.state.armorSet
    return decorations.map((decorations, index) =>
      <tr key={index} className="div__row--decoration">
        <td>
          <table className="table table--armorset">
            <tbody>
              <tr>
                <td>
                  <select name="amount"
                    onChange={this.handleChange.bind(this, "decorationAmount", "decoration", index)}
                    value={this.state.armorSet.decorations[index].decorationAmount}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </td>
                <td>
                  <select
                    className="table__input--decoration"
                    onChange={this.handleChange.bind(this, "decorationName", "decoration", index)}
                    value={this.state.armorSet.decorations[index].decorationName}
                  >
                    {this.renderDecorationList()}
                  </select>
                </td>
                <td>
                  <button className="green semi-square button--delete button"
                    onClick={this.handleChange.bind(this, "deleteDecoration", "deleteDecoration", index)}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    )
  }
  renderSkills() {
    return this.props.skills.map((skill, id) =>
      <option value={skill.id}
        key={id}>
        {skill.name}
      </option>)
  }

  renderCreateArmorset() {
    const { armorSet, shownArmor } = this.state
    return (
      <div className="div div--armorset">
        <table>
          <thead>
            <tr>
              <td className="form__htd">
                <p>Armorset</p>
                <div>
                  <label>Blademaster</label>
                  <input type="radio" name="armortype" value="blademaster"
                    onClick={this.handleSelect.bind(this, "Blademaster", "armortype")} />
                </div>
                <div>
                  <label>Gunner</label>
                  <input type="radio" name="armortype" value="gunner"
                    onClick={this.handleSelect.bind(this, "Gunner", "armortype")} />
                </div>
              </td>
              <td>
                <div className={this.state.hideArmor ? "hidden form__div--result form__div--narrow" : "form__div--result form__div--narrow"}>
                  <ul>
                    {this.renderArmor(shownArmor)}
                  </ul>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  autoComplete="off"
                  name="setName"
                  placeholder="Set name"
                  value={armorSet.setName}
                  onChange={this.handleChange.bind(this, "setName", "armorset", 0)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  autoComplete="off"
                  name="head"
                  placeholder="Head"
                  value={armorSet.head.name}
                  onChange={this.handleChange.bind(this, "head", "armorset", 0)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  autoComplete="off"
                  name="torso"
                  placeholder="Torso"
                  value={armorSet.torso.name}
                  onChange={this.handleChange.bind(this, "torso", "armorset", 0)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  autoComplete="off"
                  name="arms"
                  placeholder="Arms"
                  value={armorSet.arms.name}
                  onChange={this.handleChange.bind(this, "arms", "armorset", 0)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  autoComplete="off"
                  name="waist"
                  placeholder="Waist"
                  value={armorSet.waist.name}
                  onChange={this.handleChange.bind(this, "waist", "armorset", 0)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  autoComplete="off"
                  name="feet"
                  placeholder="Feet"
                  value={armorSet.feet.name}
                  onChange={this.handleChange.bind(this, "feet", "armorset", 0)}
                />
              </td>
            </tr>
            <tr>
              <td>
                Slots:<select name="amount"
                  onChange={this.handleChange.bind(this, "slots", "charm", 0)}
                  value={this.state.armorSet.charm.slots}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <div>
                  Skill 1:<input
                    className="table__input--amount"
                    autoComplete="off"
                    value={armorSet.charm.amount1}
                    onChange={this.handleChange.bind(this, "amount1", "charm", 0)}
                  />
                  <select name="skill1"
                    onChange={this.handleChange.bind(this, "skill1", "charm", 0)}
                    value={this.state.armorSet.charm.skill1.id}>
                    {this.renderSkills()}
                  </select>
                </div>
                <div>
                  Skill 2:<input
                    className="table__input--amount"
                    autoComplete="off"
                    value={armorSet.charm.amount2}
                    onChange={this.handleChange.bind(this, "amount2", "charm", 0)}
                  />
                  <select name="skill2"
                    onChange={this.handleChange.bind(this, "skill2", "charm", 0)}
                    value={this.state.armorSet.charm.skill2.id}>
                    {this.renderSkills()}
                  </select>
                </div>
              </td>
            </tr>
            {this.renderDecorations()}
            <tr>
              <td>
                <button className="green semi-square button"
                  onClick={this.addDecoration}>Add decoration</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  searchInput(field, search, part = "") {
    let list
    switch (field) {
      case "quest":
        list = this.props.quests.filter((quest) => {
          return (quest.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        })
        if (list.length === 1 && list[0].name.toLowerCase() === search.toLowerCase()) this.handleSelect(list[0], "quest")
        else this.setState({
          shownQuests: list.slice(0, 5)
        })
        break
      case "armor":
        list = this.props.armor.filter((armor) => {
          return (armor.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 && armor.part.toLowerCase() === part && (armor.type === this.state.armorType || armor.part === "Head" || armor.type === "Both"))
        })
        if (list.length === 1 && list[0].name.toLowerCase() === search.toLowerCase()) this.handleSelect(list[0], "armor")
        else this.setState({
          shownArmor: list.slice(0, 5)
        })
        break
      case "weapon":
        list = this.props.weapons.filter((weapon) => {
          return (weapon.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        })
        if (list.length === 1 && list[0].name.toLowerCase() === search.toLowerCase()) this.handleSelect(list[0], "weapon")
        else this.setState({
          shownWeapons: list.slice(0, 6)
        })
        break
      default:
        console.log("searchInput field not found: ", field)
    }

  }

  handleSelect(select, field, event) {
    switch (field) {
      case "quest":
        this.setState({
          newSubmission: Object.assign({}, this.state.newSubmission, { questName: select.name, questId: select.value }),
          hideQuests: true,
          shownQuests: []
        })
        break;
      case "armor":
        this.setState({
          armorSet: Object.assign({}, this.state.armorSet, { [select.part.toLowerCase()]: { name: select.name, id: select.id } }),
          shownArmor: [],
          hideArmor: true
        })
        break
      case "armortype":
        this.setState({
          armorType: select
        })
        break
      case "weapon":
        this.setState({
          newSubmission: Object.assign({}, this.state.newSubmission, { weapon: select.name, weaponId: select.id }),
          hideWeapons: true,
          shownWeapons: []
        })
        break
      default:
        console.log("handleSelect field not found: ", field)
    }


  }

  renderQuests(quests) {
    return quests.map((quest = [], id) =>
      <li key={id}
        className="form__li"
        onClick={this.handleSelect.bind(this, quest, "quest")}>
        [{quest.questgiver}{quest.stars ? "★" + quest.stars : ""}] {quest.name}
      </li>
    )
  }

  renderWeapons(weapons) {
    return weapons.map((weapon = [], id) =>
      <li key={id}
        className="form__li"
        onClick={this.handleSelect.bind(this, weapon, "weapon")}>
        {weapon.name}
      </li>
    )
  }

  renderArmor(armor) {
    return armor.map((armor = [], id) =>
      <li key={id}
        className="form__li"
        title={armor.defense}
        onClick={this.handleSelect.bind(this, armor, "armor")}>
        {armor.name}, Rarity:{armor.rarity}
      </li>
    )
  }

  renderCreateSubmission() {
    const { newSubmission, shownQuests, shownWeapons } = this.state
    return (
      <div>
        <form className="form form--submission" onSubmit={this.handleSubmit.bind(this, newSubmission)}>
          <table className="form__table">
            <thead className="form__thead">
              <tr className="form__row">
                <td className="form__htd form__td">
                  <input className="form__input form__input--name"
                    name="name"
                    placeholder="Name"
                    value={newSubmission.name}
                    onChange={this.handleChange.bind(this, "name", "submission", 0)}
                  />
                </td>
                <td className="form__htd form__td form__td--padding">
                  <input className="form__input form__input--quest"
                    type="text"
                    autoComplete="off"
                    name="questName"
                    placeholder="Quest"
                    value={newSubmission.questName}
                    onChange={this.handleChange.bind(this, "questName", "submission", 0)}
                  />
                  <div className={this.state.hideQuests ? "hidden form__div--result" : "form__div--result"}>
                    <ul>
                      {this.renderQuests(shownQuests)}
                    </ul>
                  </div>
                </td>
                <td className="form__htd form__td form__td--padding form__min-counter">
                  {this.renderCounter(49, "min")}
                </td>
                <td className="form__htd form__td form__sec-counter">
                  {this.renderCounter(59, "sec")}
                </td>
                <td className="form__htd form__td">
                  <input className="form__input form__input--weapon"
                    type="text"
                    autoComplete="off"
                    name="weapon"
                    placeholder="Weapon"
                    value={newSubmission.weapon}
                    onChange={this.handleChange.bind(this, "weapon", "submission", 0)}
                  />
                  <div className={this.state.hideWeapons ? "hidden form__div--result" : "form__div--result"}>
                    <ul>
                      {this.renderWeapons(shownWeapons)}
                    </ul>
                  </div>
                </td>
                <td className="form__htd form__td">
                  <select className="form__input form__select--style green semi-square" name="style"
                    onChange={this.handleChange.bind(this, "style", "submission", 0)}>
                    <option value="Guild">Guild</option>
                    <option value="Striker">Striker</option>
                    <option value="Adept">Adept</option>
                    <option value="Aerial">Aerial</option>
                  </select>
                </td>
                <td className="form__htd form__td form__td--last"><button type="submit" className="form__input button-submit button semi-square green">Submit</button></td>

              </tr>
            </thead>
          </table>
        </form>
      </div>
    )
  }

  renderCounter(limit, unit) {
    const { newSubmission } = this.state
    return (
      <div className="form__div--timer-group">
        <div className="form__div--timer">
          <button className="button--counter button button--plus green semi-square"
            form="noForm"
            onMouseDown={this.changeTime.bind(this, true, "inc", limit, unit)}
            onMouseUp={this.changeTime.bind(this, false, "inc", limit, unit)}>+</button>
        </div>
        <div className="form__div--timer">
          <p className="form__p--timer">{unit}</p>
          <input className="form__input--timer"
            value={newSubmission[unit]}
            onChange={this.handleChange.bind(this, unit, "submission", 0)}
          />
        </div>
        <div className="form__div--timer">
          <button className="button--counter button button--minus green semi-square"
            form="noForm"
            onMouseDown={this.changeTime.bind(this, true, "dec", limit, unit)}
            onMouseUp={this.changeTime.bind(this, false, "dec", limit, unit)}>-</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          {this.renderCreateArmorset()}
        </div>
        <div className={this.state.errorMessage.hide ? "hidden block-error" : "block-error"}>{this.state.errorMessage.message}</div>
        {this.renderCreateSubmission()}
        <SubmissionList submissions={this.props.submissions} />
      </div>
    )
  }
}

export default SubmissionForm