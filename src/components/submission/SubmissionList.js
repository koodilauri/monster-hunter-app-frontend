import React from "react"
import { connect } from "react-redux"
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts"

import ArmorSetInfo from "./ArmorSetInfo"
import QuestInfo from "./QuestInfo"
import SubmissionListFilterMenu from "../ui/SubmissionListFilterMenu"
import "./SubmissionList.css"

class SubmissionList extends React.Component {
  state = {
    data: [
      { type: 'Great Sword', runs: 0 },
      { type: 'Long Sword', runs: 0 },
      { type: 'Sword & Shield', runs: 0 },
      { type: 'Dual Blades', runs: 0 },
      { type: 'Hammer', runs: 0 },
      { type: 'Hunting Horn', runs: 0 },
      { type: 'Lance', runs: 0 },
      { type: 'Gunlance', runs: 0 },
      { type: 'Switch Axe', runs: 0 },
      { type: 'Charge Blade', runs: 0 },
      { type: 'Insect Glaive', runs: 0 },
      { type: 'Heavy Bowgun', runs: 0 },
      { type: 'Light Bowgun', runs: 0 },
      { type: 'Bow', runs: 0 },

    ],
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
    setModalIsOpen: false,
    questModalIsOpen: false,
    set_id: -1,
    quest_name: ""
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.submissions !== this.props.submissions) {
      const runs = this.calculateQuests(this.props.submissions, this.state.data)
      this.setState({
        submissions: this.props.submissions,
        data: runs
      })
    }
  }

  openModal = (modal, id, e) => {
    e.preventDefault()
    switch (modal) {
      case "set_id":
        this.setState({
          setModalIsOpen: true,
          set_id: id
        })
        break
      case "quest_name":
        this.setState({
          questModalIsOpen: true,
          quest_name: id
        })
        break
      default:
    }
  }

  closeModal = () => {
    this.setState({
      setModalIsOpen: false,
      questModalIsOpen: false,
      set_id: -1,
      quest_name: ""
    })
  }


  updateSubmissions = (subs) => {
    const runs = this.calculateQuests(subs, this.state.data)
    this.setState({
      submissions: subs,
      data: runs
    })
  }

  calculateQuests(subs, data) {
    let list = []
    data.map((weapon, id) => 
      list.push({
        type: weapon.type,
        runs: subs.filter(sub => sub.weapon_class === weapon.type).length
      })
    )
    return list
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
          <button className="btn btn-info"
            onClick={this.openModal.bind(this, "quest_name", submission.quest_name)}>
            {submission.quest_name}
          </button>
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
            onClick={this.openModal.bind(this, "set_id", submission.set_id)}>
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
        <QuestInfo isOpen={this.state.questModalIsOpen} close={this.closeModal.bind(this)} calculateQuests={this.calculateQuests} quest_name={this.state.quest_name} />
        <ArmorSetInfo isOpen={this.state.setModalIsOpen} close={this.closeModal.bind(this)} set_id={this.state.set_id} />
        <div className="col-md-12">
          <div>
            <BarChart width={730} height={250} data={this.state.data}>
              <XAxis dataKey="type" />
              <YAxis dataKey="runs" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="runs" fill="#8884d8" />
            </BarChart>
          </div>
          <SubmissionListFilterMenu updateSubmissions={this.updateSubmissions} />
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
          {this.state.submissions.length === 0 ? <div>No submissions</div> : null}
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