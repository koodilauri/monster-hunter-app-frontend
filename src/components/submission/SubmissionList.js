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
        <td className="table__td--submission">{submission.name}</td>
        <td className="table__td--submission">{submission.questname}</td>
        <td className="table__td--submission">{submission.questtime}</td>
        <td className="table__td--submission">{submission.weapon}</td>
        <td className="table__td--submission">{submission.style}</td>
      </tr>
    )
    }else{
      return <tr></tr>
    }
  }

  renderList() {
    return (
      <div>
        <table className="table table--submission">
          <thead>
            <tr>
              <td className="table__htd">Name</td>
              <td className="table__htd">Quest</td>
              <td className="table__htd">Time</td>
              <td className="table__htd">Weapon</td>
              <td className="table__htd">Style</td>
            </tr>
          </thead>
          <tbody className="table__tbody">
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