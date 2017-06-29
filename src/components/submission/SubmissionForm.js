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
        quest: "",
        questTime: "",
        weapon: "Great Sword",
        style: "Guild",
        minutes: 0,
        seconds: 0
      },
      action: "",
      submissions: []
    }
  };


  handleChange = (field, event) => {
    event.preventDefault();
    const newValue = event.target.value;
    const patt1 = /^([a-zA-Z0-9']+(-| )?)+$/i;
    // const patt2 = /^([0-4]{0,1}[0-9]{0,1}(:){0,1}[0-5]{0,1}[0-9]{0,1}){1}$/i;
    const patt3 = /^([0-4]{0,1}[0-9]{0,1})$/i;
    const patt4 = /^([0-5]{0,1}[0-9]{0,1})$/i;
    if (field === "minutes" && patt3.test(newValue)) {
      this.setState({
        newSubmission: Object.assign({}, this.state.newSubmission, { [field]: event.target.value })
      });
    }
    if (field === "seconds" && patt4.test(newValue)) {
      this.setState({
        newSubmission: Object.assign({}, this.state.newSubmission, { [field]: event.target.value })
      });
    }
    if (((field === "name" || field === "quest") && patt1.test(newValue)) || (field === "weapon" || field === "style")) {
      this.setState({
        newSubmission: Object.assign({}, this.state.newSubmission, { [field]: event.target.value })
      });
    }

  }

  handleSubmit = (newSubmission, event) => {
    event.preventDefault()
    const url = () => {
      if (process.env.NODE_ENV !== "production") {
        return process.env.REACT_APP_API_URL_DEV
      } else {
        return process.env.REACT_APP_API_URL
      }
    }
    axios.post(url(), newSubmission)
      .then((response) => {
        store.dispatch(this.props.onStuffClick(response.data))
        console.log("response: ", response.data)
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
          console.log(limit > this.state.newSubmission[unit])
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: this.state.newSubmission[unit] + 1 })
          })
        } else {
          this.setState({
            action: act
          })
        }
      }, 50);
      this.setState({
        action: act
      })

    } if (type === "START" && mod === "dec") {
      act = setInterval(() => {
        if (0 < this.state.newSubmission[unit]) {
          console.log(limit > this.state.newSubmission[unit])
          this.setState({
            newSubmission: Object.assign({}, this.state.newSubmission, { [unit]: this.state.newSubmission[unit] - 1 })
          })
        } else {
          this.setState({
            action: act
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

  renderCreateSubmission() {
    const { newSubmission } = this.state;
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
                    onChange={this.handleChange.bind(this, 'name')}
                  />
                </td>
                <td>
                  <input className="create-input"
                    name="quest"
                    placeholder="Quest"
                    value={newSubmission.quest}
                    onChange={this.handleChange.bind(this, 'quest')}
                  />
                </td>
                <td>
                  {this.renderCounter(49, "minutes")}
                </td>
                <td>
                  {this.renderCounter(59, "seconds")}
                </td>
                <td>
                  <select className="create-input" name="weapon"
                    onChange={this.handleChange.bind(this, 'weapon')}>
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
                  <select className="create-input" name="style"
                    onChange={this.handleChange.bind(this, 'style')}>
                    <option value="Guild">Guild</option>
                    <option value="Striker">Striker</option>
                    <option value="Adept">Adept</option>
                    <option value="Aerial">Aerial</option>
                  </select>
                </td>
                <td><button type="submit" className="create-input submit-button">Submit</button></td>

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
        <td>{stuff.quest}</td>
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
          <button className="counter-button plus-button"
            form="noForm"
            onMouseDown={this.changeTime.bind(this, "START", "inc", limit, unit)}
            onMouseUp={this.changeTime.bind(this, "STOP", "inc", limit, unit)}>+</button>
        </div>
        <div>
          <input className="timer-input"
            value={newSubmission[unit]}
            onChange={this.handleChange.bind(this, unit)}
          />
        </div>
        <div>
          <button className="counter-button minus-button"
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