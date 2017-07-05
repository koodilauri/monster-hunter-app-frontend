import React from "react";
import axios from 'axios';
import store from '../../store';
import { connect } from 'react-redux';
import doStuff from '../../actions/doStuff';
import SubmissionList from "./SubmissionList";

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuff: [],
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
      submissions: [],
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
      this.getItemsAsync(event);
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
    const url = () => {
      if (process.env.NODE_ENV !== "production") {
        return process.env.REACT_APP_API_URL_DEV + '/submission'
      } else {
        return process.env.REACT_APP_API_URL + '/submission'
      }
    }
    axios.post(url(), { newSubmission, armorSet })
      .then((response) => {
        console.log("response: ", response.data)
        store.dispatch(this.props.onStuffClick(response.data.newSubmission))
      })
      .catch(function (error) {
        console.log(error);
      });
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
    console.log(this.state.armorSet.decorations)
  }

  renderDecorations() {
    const { decorations } = this.state.armorSet;
    return decorations.map((decorations, index) => {
      return (
        <tr key={index} className="decoration-row">
          <td>
            <table className="tableception">
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
                      placeholder="Decoration"
                      onChange={this.handleChange.bind(this, "decorationName", index)}
                      value={this.state.armorSet.decorations[index].decorationName}
                    />
                  </td>
                  <td>
                    <button className="green semi-square delete-button"
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
      <div className="armor-input">
        <table>
          <thead>
            <tr>
              <td>
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
                <button className="green semi-square"
                  onClick={this.addDecoration}>Add decoration</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  getItemsAsync(event) {
    const search = event.target.value
    let url
    if (process.env.NODE_ENV !== "production") {
      url = process.env.REACT_APP_API_URL_DEV
    } else {
      url = process.env.REACT_APP_API_URL
    }
    url = url + `/questlist?q=${search}&language=javascript`
    fetch(url).then((response) => {
      return response.json();
    }).then((results) => {
      if (results.items !== undefined) {
        let items = results.items.map((res, i) => { return { id: i, value: res.value, name: res.name, giver: res.questgiver, star: res.stars } })
        this.setState({ questList: items })
      }
    });
  }

  handleSelect(quest, event) {
    this.setState({
      newSubmission: Object.assign({}, this.state.newSubmission, { questName: quest.name, questId: quest.value }),
      questList: []
    });
    this.changeVisibility('hidden', 'results')
    console.log(this.state.newSubmission)

  }

  renderQuest(quest) {
    return (
      <li key={quest.id}
        className="questname"
        onClick={this.handleSelect.bind(this, quest)}>
        [{quest.giver}<span className="star">{quest.star}</span>] {quest.name}
      </li>
    )
  }

  changeVisibility(action, element) {
    if (action === "hidden") {
      this.setState({ questList: [] })
      document.getElementById(element).classList.add('hidden');
      document.getElementById(element).classList.remove('visible');
    } else {
      document.getElementById(element).classList.add('visible');
      document.getElementById(element).classList.remove('hidden');
    }
  }

  renderCreateSubmission() {
    const { newSubmission, questList } = this.state;
    return (
      <div>
        <form id="submissionForm" onSubmit={this.handleSubmit.bind(this, newSubmission)}>
          <table id="form-table">
            <thead>
              <tr className="create-row">
                <td>
                  <input className="create-input"
                    name="name"
                    placeholder="Name"
                    value={newSubmission.name}
                    onChange={this.handleChange.bind(this, 'name', 0)}
                  />
                </td>
                <td>
                  <input className="create-input"
                    type="text"
                    autoComplete="off"
                    name="questName"
                    placeholder="Quest"
                    value={newSubmission.questName}
                    onChange={this.handleChange.bind(this, 'questName', 0)}
                    onFocus={this.changeVisibility.bind(this, 'visible', 'results')}
                  />
                  <div id="results" className="hidden">
                    <ul>
                      {questList.map((quest) => {
                        return this.renderQuest(quest)
                      }
                      )}
                    </ul>
                  </div>
                </td>
                <td>
                  {this.renderCounter(49, "Min")}
                </td>
                <td>
                  {this.renderCounter(59, "Sec")}
                </td>
                <td>
                  <select className="create-input styled-select green semi-square" name="weapon"
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
                <td>
                  <select className="create-input styled-select green semi-square" name="style"
                    onChange={this.handleChange.bind(this, 'style', 0)}>
                    <option value="Guild">Guild</option>
                    <option value="Striker">Striker</option>
                    <option value="Adept">Adept</option>
                    <option value="Aerial">Aerial</option>
                  </select>
                </td>
                <td><button type="submit" className="create-input submit-button semi-square green">Submit</button></td>

              </tr>
            </thead>
          </table>
        </form>
      </div>
    )
  }

  renderStuff() {
    // const table = document.getElementById("submissions");

    return this.props.stuff.map((stuff, index) =>
      // $("#submission > tbody").prepend(
      <tr key={index}>
        <td>{stuff.questTime}</td>
        <td>{stuff.name}</td>
        <td>{stuff.questName}</td>
        <td>{stuff.weapon}</td>
        <td>{stuff.style}</td>
      </tr>
    )
  }

  renderButton() {
    let input
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          store.dispatch(this.props.onStuffClick(input.value))
          input.value = ''
        }}>
          <input ref={node => {
            input = node
          }} />
          <button type="submit">
            Add Stuff
        </button>
        </form>
      </div>
    )
  }

  renderCounter(limit, unit) {
    const { newSubmission } = this.state;
    return (
      <div className="timer-group">
        <div>
          <button className="counter-button plus-button green semi-square"
            form="noForm"
            onMouseDown={this.changeTime.bind(this, "START", "inc", limit, unit)}
            onMouseUp={this.changeTime.bind(this, "STOP", "inc", limit, unit)}>+</button>
        </div>
        <div>
          <p className="timer-unit">{unit}</p>
          <input className="timer-input"
            value={newSubmission[unit]}
            onChange={this.handleChange.bind(this, unit, 0)}
          />
        </div>
        <div>
          <button className="counter-button minus-button green semi-square"
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
        <div id="sidebarwrapper">
          {this.renderCreateArmorset()}
        </div>
        {this.renderCreateSubmission()}
        <SubmissionList stuff={this.props.stuff} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stuff: state.stuff
})

const mapDispatchToProps = dispatch => {
  return {
    onStuffClick: doStuff
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm);