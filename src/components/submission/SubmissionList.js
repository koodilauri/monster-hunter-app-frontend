import React from "react";
import axios from 'axios';

class SubmissionList extends React.Component{
  state={
    submissions:[]
  };
  

  componentDidMount() {
    axios.get("https://monster-hunter-app-api.herokuapp.com/submission").then(res => {
        const submissions = res.data.submissions;
        this.setState({submissions});
        
        // window.localStorage.setItem('submissions', this.state.submissions);
        // console.log(window.localStorage.getItem('submission'), "hei");
      }).catch(err => {
        console.log('Request failed :(')
      });
  }

  renderSubmission(submission){
    return (            
      <tr id={submission.name.toString()}>
        <td className="name">{ submission.name }</td>
        <td className="quest">{ submission.quest }</td>
        <td className="time">{ submission.questtime }</td>
        <td className="weapon">{ submission.weapon }</td>  
        <td className="style">{ submission.style }</td>            
      </tr>
      
    )
  }

  renderList(){
    const {submissions} =this.state;
    // const submissions = window.localStorage.getItem('submission');
    return(
      <div>
        <table id="submissions">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>              
              <th>Time</th>
              <th>Weapon</th>              
              <th>Style</th>
            </tr>            
          </thead>
          <tbody>
            { submissions.map( (submission) => {
              return this.renderSubmission(submission)
              }
            )}
          </tbody>
        </table>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.renderList()}
      </div>
    )
  }  
}

export default SubmissionList;