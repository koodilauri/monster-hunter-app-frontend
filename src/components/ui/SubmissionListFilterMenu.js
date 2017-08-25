import React from "react"
import { connect } from "react-redux"
import SubmissionFilter from "./SubmissionFilter"
import "./SubmissionListFilterMenu.css"

class SubmissionListFilterMenu extends React.Component {
  state = {
    filters: []
  }

  setFilters = (filter, e) => {
    e.preventDefault()
    switch (filter) {
      case "Reset":
        this.props.updateSubmissions(this.props.submissions)
        this.setState(Object.assign({}, this.state, { filters: [] }))
        break
      case "Activate":
        this.props.updateSubmissions(this.filterSubmissions())
        break
      default:
        this.props.updateSubmissions(this.props.submissions)

    }
  }

  filterSubmissions() {
    const { filters } = this.state
    return this.props.submissions.filter((sub) => {
      let valid = true
      for (let i = 0; i < filters.length; i++) { //goes through the filters
        if (sub[filters[i].filter] !== filters[i].value)
          valid = false
      }
      return valid
    })
  }

  addFilter() {
    const { filters } = this.state
    const newValue = Object.assign({}, filters, {
      filters: [
        ...filters,
        { filter: "quest_name", value: "" }
      ]
    })
    this.setState(newValue)
  }

  editFilter = (value, field, id) => {
    const { filters } = this.state
    let newObject = {}
    if (field === "filter") {
      newObject = { [field]: value, value: "" }
    }
    else {
      newObject = { [field]: value }
    }
    const newState = Object.assign({}, this.state, {
      filters: filters
        .slice(0, id)
        .concat(Object.assign({}, filters[id], newObject))
        .concat(filters.slice(Number(id) + 1))
    })
    this.setState(newState)
  }

  deleteFilter = (id, e) => {
    const { filters } = this.state
    e.preventDefault()
    const newState = Object.assign({}, this.state, {
      filters: filters
        .slice(0, id)
        .concat(filters.slice(Number(id) + 1))
    })
    this.setState(newState)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.submissions !== this.props.submissions) {
      this.setState({
        submissions: this.props.submissions
      })
    }
  }

  renderFilters() {
    return this.state.filters.map((filter, id) =>
      <SubmissionFilter key={id} id={id} filter={filter} editFilter={this.editFilter} deleteFilter={this.deleteFilter} />
    )
  }

  render() {
    return (
      <div>
        <div className="btn-group btn-group-justified">
          <div className="btn btn-default"
            onClick={this.setFilters.bind(this, "Activate")}>
            Filter
        </div>
          <div className="btn btn-default"
            onClick={this.setFilters.bind(this, "Reset")}>
            Reset
        </div>
          <div className="btn btn-default"
            onClick={this.addFilter.bind(this)}>
            Add filter
        </div>
        </div>
        {this.renderFilters()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submissions: state.submission.submissions,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionListFilterMenu)