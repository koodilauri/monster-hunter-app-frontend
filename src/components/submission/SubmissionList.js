import React from "react";
import axios from 'axios';
import store from '../../store';


class SubmissionList extends React.Component {
  state = {
    submissions: []
  };


  componentDidMount() {
    document.title = "Hunters log";
    let url
    if (process.env.NODE_ENV !== "production") {
      url = process.env.REACT_APP_API_URL_DEV + "/submission"
    } else {
      url = process.env.REACT_APP_API_URL + "/submission"
    }
    axios.get(url).then(res => {
      store.dispatch(this.props.onSubmissionClick(res.data.submissions))
    }).catch(err => {
      console.log('Request failed :((', url)
    });
  }


  renderSubmission() {
    return this.props.submission.map((submission, index) =>
      <tr key={index}>
        <td className="name">{submission.name}</td>
        <td className="questName">{submission.questname}</td>
        <td className="time">{submission.questtime}</td>
        <td className="weapon">{submission.weapon}</td>
        <td className="style">{submission.style}</td>
      </tr>
    )
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