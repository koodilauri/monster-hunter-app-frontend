import React from "react";

class SubmissionForm extends React.Component {
  state={
    Hei:"hei",
    newSubmission:{
      name: "",
      quest: "",
      questTime: "",
      weapon: "",
      type: ""
    }
  }

  handleChange = (field, event) => {
    const newValue = event.target.value;
    const patt = /[^0-9:0-9]/;
    console.log(patt.test(newValue), newValue, field);
    if (field === "questTime" && !patt.test(newValue)){
      this.state.newSubmission[field] = event.target.value;
      this.setState({});      
    }
    if (field != "questTime"){
      this.state.newSubmission[field] = event.target.value;
      this.setState({});
    }
  }

  renderCreateSubmission(){
    const {newSubmission} = this.state;
    return(
    <form>
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
            <select className="create-input" name="weapon">
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
            <select className="create-input" name="style">
              <option value="Guild">Guild</option>
              <option value="Striker">Striker</option>
              <option value="Adept">Adept</option>
              <option value="Aerial">Aerial</option>
            </select>
          </td>
          <td><button type="submit" className="nord-button">Submit</button></td>
          
        </tr>
    </form>
    )  
}

  render(){
    return(
      <div>
        <p>{this.state.newSubmission.name}</p>
        {this.renderCreateSubmission()}
      </div>
    )
  }
}

export default SubmissionForm;