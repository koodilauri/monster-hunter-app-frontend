import React from "react"
import { connect } from 'react-redux'
import { getSubmissions, saveSubmission } from '../../actions/submission'
import SubmissionList from "./SubmissionList"
import './Submission.css'

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newSubmission: {
        name: "",
        questName: "",
        questId: "",
        questTime: "",
        weapon: "Great Sword",
        style: "Guild",
        min: 0,
        sec: 0,

      },
      action: "",
      armorSet: {
        head: "",
        torso: "",
        arms: "",
        waist: "",
        feet: "",
        charm: "",
        decorations: [{ decorationAmount: "1", decorationName: "placeholder" }]
      },
      shownQuests: [],
      shouldHide: true
    }
  }

  validateInput = (field, value) => {
    const patt1 = /^([a-zA-Z0-9']+(-| )?)*$/i
    const patt2 = /^([0-4]{0,1}[0-9]{0,1})$/i
    const patt3 = /^([0-5]{0,1}[0-9]{0,1})$/i
    const patt4 = /^[1-9]/i
    if ((field === "name" || field === "questName" || field === "weapon" || field === "style" || field === "head" || field === "torso" || field === "arms" || field === "waist" || field === "feet" || field === "charm" || field === "decorationName") && patt1.test(value)) {
      return true
    }
    if (field === "min" && patt2.test(value)) {
      return true
    }
    if (field === "sec" && patt3.test(value)) {
      return true
    }
    if ((field === "decorationAmount" && patt4.test(value)) || field === "deleteDecoration") {
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
            this.searchQuest(newValue)
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
                  <input
                    className="table__input--decoration"
                    placeholder="Decoration"
                    onChange={this.handleChange.bind(this, "decorationName", "decoration", index)}
                    value={this.state.armorSet.decorations[index].decorationName}
                  />
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

  renderCreateArmorset() {
    const { armorSet } = this.state
    return (
      <div className="div div--armorset">
        <table>
          <thead>
            <tr>
              <td className="form__htd">
                <p>Armorset</p>
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
                  onChange={this.handleChange.bind(this, 'head', "armorset", 0)}
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
                  onChange={this.handleChange.bind(this, 'torso', "armorset", 0)}
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
                  onChange={this.handleChange.bind(this, 'arms', "armorset", 0)}
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
                  onChange={this.handleChange.bind(this, 'waist', "armorset", 0)}
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
                  onChange={this.handleChange.bind(this, 'feet', "armorset", 0)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  autoComplete="off"
                  placeholder="Charm"
                  value={armorSet.charm}
                  onChange={this.handleChange.bind(this, 'charm', "armorset", 0)}
                />
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

  searchQuest(search) {
    const list = this.props.quest.filter((quest) => {
      return (quest.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    })
    this.setState({
      shownQuests: list
    })
  }

  handleSelect(quest, event) {
    this.setState({
      newSubmission: Object.assign({}, this.state.newSubmission, { questName: quest.name, questId: quest.value }),
      shownQuests: []
    })
    this.setState({
      shouldHide: true
    })

  }

  renderQuests(quests) {
    return quests.map((quest = [], id) =>
      <li key={id}
        className="form__li--questname"
        onClick={this.handleSelect.bind(this, quest)}>
        [{quest.questgiver}<span className="star">{quest.stars}</span>] {quest.name}
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
                    onChange={this.handleChange.bind(this, 'name', "submission", 0)}
                  />
                </td>
                <td className="form__htd form__td form__td--padding">
                  <input className="form__input form__input--quest"
                    type="text"
                    autoComplete="off"
                    name="questName"
                    placeholder="Quest"
                    value={newSubmission.questName}
                    onChange={this.handleChange.bind(this, 'questName', "submission", 0)}
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
                    onChange={this.handleChange.bind(this, 'weapon', "submission", 0)}>
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
                    onChange={this.handleChange.bind(this, 'style', "submission", 0)}>
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
        <SubmissionList submission={this.props.submission} findSubmissions={this.props.findSubmissions} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submission: state.submission.submissions
})

const mapDispatchToProps = dispatch => ({
  findSubmissions() {
    dispatch(getSubmissions())
  },
  submitSubmission(newSubmission, armorSet) {
    dispatch(saveSubmission({
      newSubmission,
      armorSet
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm)