import React from "react"
import { connect } from "react-redux"
import "./SubmissionList.css"

class SubmissionList extends React.Component {
  renderSubmissions() {
    return this.props.submissions.map((submission, index) =>
      <tr key={index}>
        <td className="table__td--submission">{submission.name}</td>
        <td className="table__td--submission">{submission.questname}</td>
        <td className="table__td--submission">{submission.questtime}</td>
        <td className="table__td--submission">{submission.weaponname}</td>
        <td className="table__td--submission">{submission.style}</td>
      </tr>
    )
  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped table-bordered table-hover table--submission">
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
            {this.renderSubmissions()}
          </tbody>
        </table>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  submissions: state.submission.submissions,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionList)