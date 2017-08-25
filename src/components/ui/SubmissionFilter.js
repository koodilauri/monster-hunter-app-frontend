import React from "react"
import { connect } from "react-redux"
import SearchSelectionInput from "./SearchSelectionInput"
class SubmissionFilter extends React.Component {

  selectItem(field, item) {
    this.props.editFilter(item.name, field, this.props.id)
  }

  handleChange = (field, id, e) => {
    e.preventDefault()
    this.props.editFilter(e.target.value, field, id)

  }

  renderFilterOptions() {
    switch (this.props.filter.filter) {
      case "weapon_class":
        return (
          <select
            className="form-control"
            onChange={this.handleChange.bind(this, "value", this.props.id)}
            value={this.props.filter.value}>
            <option value="">---</option>
            <option value="Great Sword">Great Sword</option>
            <option value="Long Sword">Long Sword</option>
            <option value="Sword & Shield">Sword & Shield</option>
            <option value="Dual Blades">Dual Blades</option>
            <option value="Hammer">Hammer</option>
            <option value="Hunting Horn">Hunting Horn</option>
            <option value="Lance">Lance</option>
            <option value="Gunlance">Gunlance</option>
            <option value="Switch Axe">Switch Axe</option>
            <option value="Charge Blade">Charge Blade</option>
            <option value="Insect Glaive">Insect Glaive</option>
            <option value="Bow">Bow</option>
            <option value="Light Bowgun">Light Bowgun</option>
            <option value="Heavy Bowgun">Heavy Bowgun</option>
          </select>
        )
      case "quest_name":
        return (
          <SearchSelectionInput item="value" items={this.props.quests} selectItem={this.selectItem.bind(this)} />
        )
      case "weapon_name":
        return (
          <SearchSelectionInput item="value" items={this.props.weapons} selectItem={this.selectItem.bind(this)} />
        )
      case "style":
        return (
          <select
            className="form-control"
            onChange={this.handleChange.bind(this, "value", this.props.id)}
            value={this.props.filter.value}>
            <option value="">---</option>
            <option value="Guild">Guild</option>
            <option value="Striker">Striker</option>
            <option value="Adept">Adept</option>
            <option value="Aerial">Aerial</option>
          </select>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="submission-list--filter">
        <div className="submission-filter filter--type">
          <select
            className="form-control"
            onChange={this.handleChange.bind(this, "filter", this.props.id)}
            value={this.props.filter.filter} >
            <option value="quest_name">Quest</option>
            <option value="weapon_name">Weapon</option>
            <option value="weapon_class">Weapon Class</option>
            <option value="style">Style</option>
          </select>
        </div>
        <div className="submission-filter filter--option">
          {this.renderFilterOptions()}
        </div>
        <div className="submission-filter filter--button">
          <button
            className="btn btn-default"
            onClick={this.props.deleteFilter.bind(this, this.props.id)}
          >Delete</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  quests: state.quest.quests,
  weapons: state.weapon.weapons
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionFilter)