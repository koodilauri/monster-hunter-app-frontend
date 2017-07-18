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
        weapon: "Great Sword",
        style: "Guild",
        min: 0,
        sec: 0,

      },
      action: "",
      armorSet: {
        setName: "",
        head: "",
        torso: "",
        arms: "",
        waist: "",
        feet: "",
        charm: {
          slots: 0,
          skill1: "",
          amount1: 0,
          skill2: "",
          amount2: 0
        },
        decorations: [{ decorationAmount: "1", decorationName: "placeholder" }]
      },
      shownQuests: [],
      shownArmor: [],
      shownSkills: [],
      shouldHide: true,
      skills: [
        { name: "Ammo Saver" },
        { name: "Anti-Theft" },
        { name: "Artillery" },
        { name: "Attack" },
        { name: "Bherna" },
        { name: "Bind Res" },
        { name: "Biology" },
        { name: "Blast C+" },
        { name: "Bleeding" },
        { name: "Blight Res" },
        { name: "Blunt" },
        { name: "Bomb Boost" },
        { name: "Botany" },
        { name: "Bubble" },
        { name: "C.beard" },
        { name: "C.Range C+" },
        { name: "Capturer" },
        { name: "Carnivore" },
        { name: "Carving" },
        { name: "Chain Crit" },
        { name: "Chance" },
        { name: "Charmer" },
        { name: "Clust S+" },
        { name: "Cold Res" },
        { name: "ColdBlooded" },
        { name: "Combo Plus" },
        { name: "Combo Rate" },
        { name: "Constitution" },
        { name: "Crag S+" },
        { name: "Crisis" },
        { name: "Crit Draw" },
        { name: "Crit Element" },
        { name: "Crit Status" },
        { name: "Critical Up" },
        { name: "D. Fencing" },
        { name: "Dead Eye" },
        { name: "Deadeye" },
        { name: "Def Lock" },
        { name: "Defense" },
        { name: "Destroyer" },
        { name: "Dragon Atk" },
        { name: "Dragon Res" },
        { name: "Dreadking" },
        { name: "Dreadqueen" },
        { name: "Drilltusk" },
        { name: "Eating" },
        { name: "Elem C+" },
        { name: "Elemental" },
        { name: "Evade Dist" },
        { name: "Evasion" },
        { name: "Exhaust C+" },
        { name: "Expert" },
        { name: "FastCharge" },
        { name: "Fate" },
        { name: "Fencing" },
        { name: "Fire Atk" },
        { name: "Fire Res" },
        { name: "Frenzy Res" },
        { name: "Furor" },
        { name: "Gathering" },
        { name: "Gloves Off" },
        { name: "Gluttony" },
        { name: "Grimclaw" },
        { name: "Grinder" },
        { name: "Guard" },
        { name: "Guard Up" },
        { name: "Guts" },
        { name: "Handicraft" },
        { name: "Haphazard" },
        { name: "Health" },
        { name: "Hearing" },
        { name: "Heat Res" },
        { name: "Heavy Up" },
        { name: "Hellblade" },
        { name: "Hero Shield" },
        { name: "Honey" },
        { name: "HotBlooded" },
        { name: "Hunger" },
        { name: "Ice Atk" },
        { name: "Ice Res" },
        { name: "Insight" },
        { name: "KO" },
        { name: "Kokoto" },
        { name: "Lasting Pwr" },
        { name: "Light Eater" },
        { name: "Loading" },
        { name: "Maestro" },
        { name: "Mounting" },
        { name: "Mycology" },
        { name: "Normal S+" },
        { name: "Normal Up" },
        { name: "Para C+" },
        { name: "Paralysis" },
        { name: "Pellet S+" },
        { name: "Pellet Up" },
        { name: "Perception" },
        { name: "Pierce S+" },
        { name: "Pierce Up" },
        { name: "Poison" },
        { name: "Poison C+" },
        { name: "Pokke" },
        { name: "Potential" },
        { name: "Power C+" },
        { name: "Precision" },
        { name: "Protection" },
        { name: "Psychic" },
        { name: "Punish Draw" },
        { name: "Ranger" },
        { name: "Rapid Fire" },
        { name: "Rec Level" },
        { name: "Rec Speed" },
        { name: "Recoil" },
        { name: "Redhelm" },
        { name: "Reload Spd" },
        { name: "Sense" },
        { name: "Sharpener" },
        { name: "Sharpness" },
        { name: "Sheathing" },
        { name: "Silverwind" },
        { name: "Sleep" },
        { name: "Sleep C+" },
        { name: "Snowbaron" },
        { name: "Speed Setup" },
        { name: "Spirit" },
        { name: "Stam Drain" },
        { name: "Stam Recov" },
        { name: "Stamina" },
        { name: "Status" },
        { name: "Stonefist" },
        { name: "Stun" },
        { name: "Survivor" },
        { name: "Team Player" },
        { name: "TeamLeader" },
        { name: "Tenderizer" },
        { name: "Thunder Atk" },
        { name: "Thunder Res" },
        { name: "Thunderlord" },
        { name: "Torso Up" },
        { name: "Transporter" },
        { name: "Tremor Res" },
        { name: "Unscathed" },
        { name: "Vault" },
        { name: "Water Atk" },
        { name: "Water Res" },
        { name: "Whim" },
        { name: "Wide-Range" },
        { name: "Wind Res" },
        { name: "Yukumo" }
      ]
    }
  }

  validateInput = (field, value) => {
    const patt1 = /^([a-zA-Z0-9"]+(-| )?)*$/i
    const patt2 = /^([0-4]{0,1}[0-9]{0,1})$/i
    const patt3 = /^([0-5]{0,1}[0-9]{0,1})$/i
    const patt4 = /^[1-9]{0,1}/
    const patt5 = /^(-{0,1}[0-9]{0,2})$/i

    if ((field === "name" || field === "questName" || field === "weapon" || field === "style" || field === "head" || field === "torso" || field === "arms" || field === "waist" || field === "feet" || field === "decorationName") && patt1.test(value)) {
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
          this.setState({
            armorSet: Object.assign({}, this.state.armorSet, { [field]: newValue })
          })
          if (field === "head" || field === "torso" || field === "arms" || field === "waist" || field === "feet") {
            this.searchInput("armor", newValue, field)
          }
          break
        case "charm":
          this.setState({
            armorSet: Object.assign({}, this.state.armorSet, { charm: Object.assign({}, this.state.armorSet.charm, { [field]: newValue }) })
          })
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
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [field]: newValue })
          })
          if (field === "questName") {
            this.searchInput("quest", newValue)
            this.setState({ shouldHide: false })
          }
      }
    }
  }

  handleSubmit = (newSubmission, event) => {
    const { armorSet } = this.state
    event.preventDefault()
    this.props.submitSubmission(newSubmission, armorSet)
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
      <option value={decoration.id}>{decoration.name}, size: {decoration.size}, skill: {decoration.skillname} +{decoration.bonus1}</option>
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
    return this.state.skills.map((skill, id) =>
      <option value={skill.name}
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
                  name="head"
                  placeholder="Head"
                  value={armorSet.head}
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
                  value={armorSet.torso}
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
                  value={armorSet.arms}
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
                  value={armorSet.waist}
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
                  value={armorSet.feet}
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
                  <select name="amount"
                    onChange={this.handleChange.bind(this, "skill1", "charm", 0)}
                    value={this.state.armorSet.charm.skill1}>
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
                  <select name="amount"
                    onChange={this.handleChange.bind(this, "skill2", "charm", 0)}
                    value={this.state.armorSet.charm.skill2}>
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
        this.setState({
          shownQuests: list.slice(0, 5)
        })
        break
      case "armor":
        list = this.props.armor.filter((armor) => {
          return (armor.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 && armor.part.toLowerCase() === part)
        })
        this.setState({
          shownArmor: list.slice(0, 5)
        })
        break
      // case "skill":
      //   list = this.props.skills.filter((skill) => {
      //     return (skill.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      //   })
      //   this.setState({
      //     shownSkills: list.slice(0, 5)
      //   })
      //   break
      default:
        console.log("searchInput field not found: ", field)
    }

  }

  handleSelect(select, field, event) {
    switch (field) {
      case "quest":
        this.setState({
          newSubmission: Object.assign({}, this.state.newSubmission, { questName: select.name, questId: select.value }),
          shownQuests: []
        })
        this.setState({
          shouldHide: true
        })
        break;
      case "armor":
        this.setState({
          armorSet: Object.assign({}, this.state.armorSet, { [select.part.toLowerCase()]: select.name }),
          shownArmor: []
        })
        break;
      default:
        console.log("handleSelect field not found: ", field)
    }


  }

  renderQuests(quests) {
    return quests.map((quest = [], id) =>
      <li key={id}
        className="form__li--questname"
        onClick={this.handleSelect.bind(this, quest, "quest")}>
        [{quest.questgiver}{quest.stars ? "★" + quest.stars : ""}] {quest.name}
      </li>
    )
  }

  renderArmor(armor) {
    return armor.map((armor = [], id) =>
      <li key={id}
        onClick={this.handleSelect.bind(this, armor, "armor")}>
        {armor.name}
      </li>
    )
  }

  renderCreateSubmission() {
    const { newSubmission, shownQuests } = this.state
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
                  <div className={this.state.shouldHide ? "hidden" : "form__div--result"}>
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
                  <select className="form__input form__select--style green semi-square" name="weapon"
                    onChange={this.handleChange.bind(this, "weapon", "submission", 0)}>
                    <option value="Great Sword">Great Sword</option>
                    <option value="Long Sword">Long Sword</option>
                    <option value="Sword & Shield">Sword & Shield</option>
                    <option value="Dual Blades">Dual Blades</option>
                    <option value="Hammer">Hammer</option>
                    <option value="Hunting Horn">Hunting Horn</option>
                    <option value="Lance">Lance</option>
                    <option value="Gunlance">Gunlance</option>
                    <option value="Switch Axe">Switch Axe</option>
                    <option value="Insect Glaive">Insect Glaive</option>
                    <option value="Charge Blade">Charge Blade</option>
                    <option value="Light Bowgun">Light Bowgun</option>
                    <option value="Heavy Bowgun">Heavy Bowgun</option>
                    <option value="Bow">Bow</option>
                  </select>
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
        {this.renderCreateSubmission()}
        <SubmissionList submissions={this.props.submissions} />
      </div>
    )
  }
}

export default SubmissionForm