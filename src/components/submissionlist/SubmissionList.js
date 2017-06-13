import React from "react";
import axios from 'axios';

class SubmissionList extends React.Component{
  state={
    newData:{
      name: "",
      time: "",
      type: ""
    },
    submissions:[]
  };
  

  componentDidMount() {
    axios.get("https://monster-hunter-app-api.herokuapp.com/submissions").then(res => {
        const submissions = res.data.submissions;
        this.setState({submissions});
      });
  }

  renderSubmission(submission){
    return (            
      <tr id={submission.name.toString()}>
        <td className="name">{ submission.name }</td>
        <td className="time">{ submission.time }</td>
        <td className="type">{ submission.type }</td>  
      </tr>
      
    )
  }

  renderList(){
    const {submissions} =this.state;
    return(
      <div>
        <table id="submissions">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Type</th>
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
        <p>hei</p>
        {this.renderList()}
      </div>
    )
  }  
}

export default SubmissionList;