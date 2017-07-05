import React from "react";
import axios from 'axios';
// import store from '../../store';


class SubmissionList extends React.Component {
  state = {
    submissions: []
  };


  componentDidMount() {
    document.title="Hunters log";
    const url = () => {
      if (process.env.NODE_ENV !== "production") {
        return process.env.REACT_APP_API_URL_DEV + '/submission'
      } else {
        return process.env.REACT_APP_API_URL + '/submission'
      }
    }
    axios.get(url()).then(res => {
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
              <td>Name</td>
              <td>Quest</td>
              <td>Time</td>
              <td>Weapon</td>
              <td>Style</td>
            </tr>
          </thead>
          <tbody className="submissions-body">
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