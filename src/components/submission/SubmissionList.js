import React from "react";

class SubmissionList extends React.Component {
  state = {
    submissions: []
  };


  componentDidMount() {
    document.title = "Hunters log";
    this.props.findSubmissions()
  }


  renderSubmission() {
    if(this.props.submissions.submissions !== undefined){
    return this.props.submissions.submissions.map((submission, index) =>
      <tr key={index}>
        <td className="name">{submission.name}</td>
        <td className="questName">{submission.questname}</td>
        <td className="time">{submission.questtime}</td>
        <td className="weapon">{submission.weapon}</td>
        <td className="style">{submission.style}</td>
      </tr>
    )
    }else{
      return <tr></tr>
    }
  }

  renderList() {
    return (
      <div>
        <table id="submissions">
          <thead>
            <tr>
              <td className="head-td">Name</td>
              <td className="head-td">Quest</td>
              <td className="head-td">Time</td>
              <td className="head-td">Weapon</td>
              <td className="head-td">Style</td>
            </tr>
          </thead>
          <tbody className="submissions-body">
            {this.renderSubmission()}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    )
  }
}

export default SubmissionList;