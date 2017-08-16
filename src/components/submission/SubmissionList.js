import React from "react"
import { connect } from "react-redux"

class SubmissionList extends React.Component {
  state = {
    submissions: [],
    sorted: {
      name: undefined,
      quest_name: undefined,
      time: undefined,
      weapon_name: undefined,
      style: undefined,
      weapon_class: undefined,
      set_name: undefined,
      created: undefined
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.submissions !== this.props.submissions) {
      this.setState({
        submissions: this.props.submissions
      })
    }
  }

  sortTable = (field, event) => {
    if (!this.state.sorted[field] || this.state.sorted[field] === "descend") {
      this.setState({
        sorted: Object.assign({}, this.state.sorted, { [field]: "ascend" }),
        submissions: this.state.submissions.sort((a, b) => {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
          return 0;
        })
      })
    } else {
      this.setState({
        sorted: Object.assign({}, this.state.sorted, { [field]: "descend" }),
        submissions: this.state.submissions.sort((a, b) => {
          if (a[field] > b[field]) return -1;
          if (a[field] < b[field]) return 1;
          return 0;
        })
      })
    }
  }

  renderSubmissions() {
    return this.state.submissions.map((submission, index) =>
      <tr key={index}>
        <td
          className="table__td--submission">
          {submission.name}
        </td>
        <td
          className="table__td--submission">
          {submission.quest_name}
        </td>
        <td
          className="table__td--submission">
          {submission.quest_time}
        </td>
        <td
          className="table__td--submission">
          {submission.weapon_name}
        </td>
        <td
          className="table__td--submission">
          {submission.weapon_class}
        </td>
        <td
          className="table__td--submission">
          {submission.style}
        </td>
        <td
          className="table__td--submission">
          {submission.set_name}
        </td>
        <td
          className="table__td--submission">
          {submission.created.split("T")[0]}
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-12">
          <table className="table table-striped table-bordered table-hover table--submission">
            <thead>
              <tr>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "name")}>
                  Name
                  <span class="glyphicon glyphicon-menu-up"></span>
                  
                </td>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "quest_name")}>
                  Quest
              </td>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "quest_time")}>
                  Time
                </td>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "weapon_name")}>
                  Weapon
                </td>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "weapon_class")}>
                  Weapon Class
                </td>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "style")}>
                  Style
                </td>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "set_name")}>
                  Armor set
              </td>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "created")}>
                  Date
              </td>
              </tr>
            </thead>
            <tbody className="table__tbody">
              {this.renderSubmissions()}
            </tbody>
          </table>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  submissions: state.submission.submissions,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionList)