import React from "react";

class SubmissionList extends React.Component{
  state={
    newData:{
      name: "",
      time: "",
      type: ""
    },
    submissions:[
      {name:"lauri", time:"05:11:00",type:1},
      {name:"lauri", time:"07:46:00",type:2}
      
    ]
  }

  renderSubmission(submission){
    return (            
      <tr id={submission.id}>
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
            <td>Name</td>
            <td>Time</td>
            <td>Type</td>            
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