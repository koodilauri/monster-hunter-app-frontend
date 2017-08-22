import React from "react"
import { connect } from "react-redux"
import ArmorSetInfo from "./ArmorSetInfo"
import "./SubmissionList.css"

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
      },
      modalIsOpen: false,
      set_id: -1
    }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.submissions !== this.props.submissions) {
      this.setState({
        submissions: this.props.submissions
      })
    }
  }

  openModal = (id, e) => {
    e.preventDefault()
    this.setState({
      modalIsOpen: true,
      set_id: id
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      set_id:-1
    })
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
          <button className="btn btn-info"
            onClick={this.openModal.bind(this, submission.set_id)}>
            {submission.set_name}
          </button>
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
        <ArmorSetInfo isOpen={this.state.modalIsOpen} close={this.closeModal.bind(this)} set_id={this.state.set_id} />
        <div className="col-md-12">
          <table className="table table-striped table-bordered table-hover table--submission">
            <thead>
              <tr>
                <td
                  className="table__htd"
                  onClick={this.sortTable.bind(this, "name")}>
                  Name
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
          {this.state.submissions.length === 0? <div>No submissions</div>: null}
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