import React from "react";
import axios from 'axios';

class SubmissionForm extends React.Component {
  state={
    newSubmission:{
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
    if (field === "questTime" && patt2.test(newValue)){
      this.state.newSubmission[field] = event.target.value;
      this.setState({});      
    }
    if (((field === "name" || field === "quest") && patt1.test(newValue)) || (field === "weapon" || field === "style")){
      this.state.newSubmission[field] = event.target.value;
      this.setState({});
    }

  }

  handleSubmit = (event) => {
    const {newSubmission} = this.state;
    event.preventDefault()
    axios.post("https://monster-hunter-app-api.herokuapp.com/submission", newSubmission)
      .then(function (response) {     
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    newSubmission.quest="";
    newSubmission.questTime="";
    this.setState({});   
  }

  renderCreateSubmission(){
    const {newSubmission} = this.state;
    return(
    <form onSubmit={this.handleSubmit}>
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
    </form>
    )  
}

  render(){
    return(
      <div>
        {this.renderCreateSubmission()}        
      </div>
    )
  }
}

export default SubmissionForm;