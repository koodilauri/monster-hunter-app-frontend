import React from "react";
import { connect } from 'react-redux';
import { getSubmissions, saveSubmission } from '../../actions/submission';
import { getQuestList } from '../../actions/questList';
import SubmissionList from "./SubmissionList";
import './Submission.css';

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSubmission: {
        name: "",
        questName: "",
        questId: "",
        questTime: "",
        weapon: "Great Sword",
        style: "Guild",
        Min: 0,
        Sec: 0,

      },
      action: "",
      armorSet: {
        head: "",
        torso: "",
        arms: "",
        waist: "",
        feet: "",
        charm: "",
        decorations: [{ decorationAmount: 1, decorationName: "placeholder" }]
      },
      submission: [],
      questList: []
    }
  };

  handleChange = (field, id = 0, event) => {
    event.preventDefault();
    const newValue = event.target.value;
    const patt1 = /^([a-zA-Z0-9']+(-| )?)*$/i;
    const patt3 = /^([0-4]{0,1}[0-9]{0,1})$/i;
    const patt4 = /^([0-5]{0,1}[0-9]{0,1})$/i;
    if (field === "Min" && patt3.test(newValue)) {
      this.setState({
        newSubmission: Object.assign({}, this.state.newSubmission, { [field]: event.target.value })
      });
    }
    if (field === "Sec" && patt4.test(newValue)) {
      this.setState({
        newSubmission: Object.assign({}, this.state.newSubmission, { [field]: event.target.value })
      });
    }
    if (((field === "name") && patt1.test(newValue)) || (field === "weapon" || field === "style")) {
      this.setState({
        newSubmission: Object.assign({}, this.state.newSubmission, { [field]: event.target.value })
      });
    }
    if (field === "questName" && patt1.test(newValue)) {
      this.setState({
        newSubmission: Object.assign({}, this.state.newSubmission, { [field]: event.target.value })
      });
      this.props.onQuestInput(event.target.value)
    }
    if ((field === "head" || field === "torso" || field === "arms" || field === "waist" || field === "feet" || field === "charm") && patt1.test(newValue)) {
      this.setState({
        armorSet: Object.assign({}, this.state.armorSet, { [field]: event.target.value })
      })
    }
    if ((field === "decorationName" && patt1.test(newValue)) || (field === "decorationAmount")) {
      this.setState({
        armorSet: Object.assign({}, this.state.armorSet, {
          "decorations": this.state.armorSet.decorations
            .slice(0, id)
            .concat(Object.assign({}, this.state.armorSet.decorations[id], { [field]: event.target.value }))
            .concat(this.state.armorSet.decorations.slice(id + 1))
        })
      })
    }
    if (field === "deleteDecoration") {
      this.setState({
        armorSet: Object.assign({}, this.state.armorSet, {
          "decorations": this.state.armorSet.decorations
            .slice(0, id)
            .concat(this.state.armorSet.decorations.slice(id + 1))
        })
      })
    }

  }

  handleSubmit = (newSubmission, event) => {
    const { armorSet } = this.state;
    event.preventDefault()
    this.props.onSubmissionSubmit(newSubmission, armorSet)
  }

  changeTime = (type, mod, limit, unit, event) => {
    event.preventDefault()
    const { action } = this.state;
    let act;
    if (type === "START" && mod === "inc") {
      act = setInterval(() => {
        if (limit > this.state.newSubmission[unit]) {
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: this.state.newSubmission[unit] + 1 })
          })
        } else {
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: 0 })
          })
        }
      }, 50);
      this.setState({
        action: act
      })
    } else {
      clearInterval(action);
    }
    if (type === "START" && mod === "dec") {
      act = setInterval(() => {
        if (0 < this.state.newSubmission[unit]) {
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: this.state.newSubmission[unit] - 1 })
          })
        } else {
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: limit })
          })
        }
      }, 50);
      this.setState({
        action: act
      })
    } else {
      clearInterval(action);
    }
  }

  addDecoration = (event) => {
    this.setState({
      armorSet: Object.assign({}, this.state.armorSet,
        {
          decorations: [
            ...this.state.armorSet.decorations,
            {
              decorationAmount: 1,
              decorationName: ""
            }
          ]
        })
    })
  }

  renderDecorations() {
    const { decorations } = this.state.armorSet;
    return decorations.map((decorations, index) => {
      return (
        <tr key={index} className="div__row--decoration">
          <td>
            <table className="table table--armorset">
              <tbody>
                <tr>
                  <td>
                    <select name="amount"
                      onChange={this.handleChange.bind(this, "decorationAmount", index)}
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
                      onChange={this.handleChange.bind(this, "decorationName", index)}
                      value={this.state.armorSet.decorations[index].decorationName}
                    />
                  </td>
                  <td>
                    <button className="green semi-square button--delete button"
                      onClick={this.handleChange.bind(this, "deleteDecoration", index)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      )
    }
    )
  }

  renderCreateArmorset() {
    const { armorSet } = this.state;
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
                  onChange={this.handleChange.bind(this, 'head', 0)}
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
                  onChange={this.handleChange.bind(this, 'torso', 0)}
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
                  onChange={this.handleChange.bind(this, 'arms', 0)}
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
                  onChange={this.handleChange.bind(this, 'waist', 0)}
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
                  onChange={this.handleChange.bind(this, 'feet', 0)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  autoComplete="off"
                  placeholder="Charm"
                  value={armorSet.charm}
                  onChange={this.handleChange.bind(this, 'charm', 0)}
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

  handleSelect(quest, event) {
    this.setState({
      newSubmission: Object.assign({}, this.state.newSubmission, { questName: quest.name, questId: quest.value }),
      questList: []
    });
    this.changeVisibility('hidden', 'form__div--result')

  }

  renderQuestList(questList) {
    if (questList === undefined) {
      return 0
    } else {
      return questList.questList.map((quest, id) =>
        <li key={id}
          className="form__li--questname"
          onClick={this.handleSelect.bind(this, quest)}>
          [{quest.giver}<span className="star">{quest.star}</span>] {quest.name}
        </li>
      )
    }
  }

  changeVisibility(action, element) {
    if (action === "hidden") {
      this.setState({ questList: [] })
      document.getElementsByClassName(element)[0].classList.add('hidden');
      document.getElementsByClassName(element)[0].classList.remove('visible');
    } else {
      document.getElementsByClassName(element)[0].classList.add('visible');
      document.getElementsByClassName(element)[0].classList.remove('hidden');
    }
  }

  renderCreateSubmission() {
    const { newSubmission } = this.state;
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
                    onChange={this.handleChange.bind(this, 'name', 0)}
                  />
                </td>
                <td className="form__htd form__td form__td--padding">
                  <input className="form__input form__input--quest"
                    type="text"
                    autoComplete="off"
                    name="questName"
                    placeholder="Quest"
                    value={newSubmission.questName}
                    onChange={this.handleChange.bind(this, 'questName', 0)}
                    onFocus={this.changeVisibility.bind(this, 'visible', 'form__div--result')}
                  />
                  <div className="form__div--result hidden">
                    <ul>
                      {this.renderQuestList(this.props.questList)}
                    </ul>
                  </div>
                </td>
                <td className="form__htd form__td form__td--padding form__min-counter">
                  {this.renderCounter(49, "Min")}
                </td>
                <td className="form__htd form__td form__sec-counter">
                  {this.renderCounter(59, "Sec")}
                </td>
                <td className="form__htd form__td">
                  <select className="form__input form__select--style green semi-square" name="weapon"
                    onChange={this.handleChange.bind(this, 'weapon', 0)}>
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
                    onChange={this.handleChange.bind(this, 'style', 0)}>
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
    const { newSubmission } = this.state;
    return (
      <div className="form__div--timer-group">
        <div className="form__div--timer">
          <button className="button--counter button button--plus green semi-square"
            form="noForm"
            onMouseDown={this.changeTime.bind(this, "START", "inc", limit, unit)}
            onMouseUp={this.changeTime.bind(this, "STOP", "inc", limit, unit)}>+</button>
        </div>
        <div className="form__div--timer">
          <p className="form__p--timer">{unit}</p>
          <input className="form__input--timer"
            value={newSubmission[unit]}
            onChange={this.handleChange.bind(this, unit, 0)}
          />
        </div>
        <div className="form__div--timer">
          <button className="button--counter button button--minus green semi-square"
            form="noForm"
            onMouseDown={this.changeTime.bind(this, "START", "dec", limit, unit)}
            onMouseUp={this.changeTime.bind(this, "STOP", "dec", limit, unit)}>-</button>
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
        <SubmissionList submissions={this.props.submissions} findSubmissions={this.props.findSubmissions} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questList: state.questList,
  submissions: state.submissions
})

const mapDispatchToProps = dispatch => ({
  findSubmissions() {
    dispatch(getSubmissions())
  },
  onSubmissionSubmit(newSubmission, armorSet) {
    dispatch(saveSubmission({
      newSubmission,
      armorSet
    }))
  },
  onQuestInput(search) {
    dispatch(getQuestList(
      search
    ))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm);