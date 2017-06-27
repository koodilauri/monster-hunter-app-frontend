import React from "react";
import axios from 'axios';
// import store from '../../store';


class SubmissionList extends React.Component {
  state = {
    submissions: []
  };


  componentDidMount() {
    axios.get("https://monster-hunter-app-api.herokuapp.com/submission").then(res => {
      const submissions = res.data.submissions;
      this.setState({ submissions });

    }).catch(err => {
      console.log('Request failed :(')
    });
  }

  renderSubmission(submission) {
    return (
      <tr key={submission.id}>
        <td className="name">{submission.name}</td>
        <td className="quest">{submission.quest}</td>
        <td className="time">{submission.questtime}</td>
        <td className="weapon">{submission.weapon}</td>
        <td className="style">{submission.style}</td>
      </tr>

    )
  }
  renderStuff() {
    return this.props.stuff.map((stuff, index) =>
      <tr key={index}>
        <td>{stuff.name}</td>
        <td>{stuff.quest}</td>
        <td>{stuff.questTime}</td>
        <td>{stuff.weapon}</td>
        <td>{stuff.style}</td>
      </tr>
    )
  }

  renderList() {
    const { submissions } = this.state;
    return (
      <div>
        <table id="submissions">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quest</th>
              <th>Time</th>
              <th>Weapon</th>
              <th>Style</th>
            </tr>
          </thead>
          <tbody>
            {this.renderStuff()}
            {submissions.map((submission) => {
              return this.renderSubmission(submission)
            }
            )}
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