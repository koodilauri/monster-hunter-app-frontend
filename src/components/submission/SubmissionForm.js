import React from "react";
import axios from 'axios';
import store from '../../store';
import { connect } from 'react-redux';
import doStuff from '../../actions/doStuff';

class SubmissionForm extends React.Component {
  state = {
    stuff: [],
    newSubmission: {
      name: "",
      quest: "",
      questTime: "",
      weapon: "Great Sword",
      style: "Guild"
    }
  }

  handleChange = (field, event) => {
    event.preventDefault();
    const newValue = event.target.value;
    const patt1 = /^([a-zA-Z0-9']+(-| )?)+$/i;
    const patt2 = /^([0-4]{0,1}[0-9]{0,1}(:){0,1}[0-5]{0,1}[0-9]{0,1}){1}$/i;
    if (field === "questTime" && patt2.test(newValue)) {
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

  handleSubmit = (event) => {
    const { newSubmission } = this.state;
    event.preventDefault()
    axios.post("http://localhost:8081/submission", newSubmission)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderCreateSubmission() {
    const { newSubmission } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <table>
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
                <input className="create-input"
                  name="questTime"
                  placeholder="00:00"
                  value={newSubmission.questTime}
                  onChange={this.handleChange.bind(this, 'questTime')}
                />
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
              <td><button type="submit" className="nord-button">Submit</button></td>

            </tr>
          </thead>
        </table>
      </form>
    )
  }

  renderStuff() {
    return this.props.stuff.map((stuff, index) =>
      <li key={index}>{stuff}</li>)
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
          console.log(this.props.onStuffClick(input.value))
          input.value = ''
          console.log(store.getState())
          console.log(this.state)
        }}>
          <input ref={node => {
            input = node
          }} />
          <button type="submit">
            Add Stuff
        </button>
        </form>
        <div>
          <ul>
            {this.renderStuff()}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderButton()}
        {this.renderCreateSubmission()}
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