import React from "react"
import { connect } from "react-redux"
import "./StyleAndArt.css"
import SearchSelectionInput from "../ui/SearchSelectionInput"

class StyleAndArts extends React.Component {
  state = {
    selectedStyle: "Guild",
    styles: ["Guild", "Striker", "Adept", "Aerial"]
    // hunterArts: [{
    //   id: 1,
    //   name: "art1",
    //   gaugesize: 250,
    //   description: "",
    //   weapon: "General"
    // },
    // {
    //   id: 1,
    //   name: "art2",
    //   gaugesize: 250,
    //   description: "",
    //   weapon: "General"
    // }]
  }

  handleChange(field, e) {
    const newValue = e.target.value
    let stateChange = Object.assign({}, this.state)
    stateChange[field] = newValue
    this.setState(stateChange)

    switch (newValue) {
      case "Guild":
        this.changeHunterArt(2)
        break
      case "Striker":
        this.changeHunterArt(3)
        break
      case "Adept":
        this.changeHunterArt(1)
        break
      case "Aerial":
        this.changeHunterArt(1)
        break
      default:
        break
    }
    console.log(this.state.hunterArts)
  }

  selectItem = (type, item) => {
    console.log("valittu item ", type)
    let stateChange = Object.assign({}, this.state.newSubmission)
    stateChange[type] = item
    this.setState({ newSubmission: stateChange })
  }

  changeHunterArt(amount) {
    const { hunterArts } = this.state
    let l = hunterArts.length
    if (l < amount) this.addHunterArt(amount - l)
    if (l > amount) this.removeHunterArt(amount)
  }

  addHunterArt(length) {
    const { hunterArts } = this.state
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push({ id: 1, name: "", gaugesize: 250, description: "", weapon: "General" });
    }
    this.setState({
      hunterArts: hunterArts.concat(data)
    })
    return 1
  }

  removeHunterArt(index) {
    const { hunterArts } = this.state
    this.setState({
      hunterArts: hunterArts
        .slice(0, index)
    })
  }

  renderArts() {
    return this.state.hunterArts.map((art, id) =>
      <div key={id}>
        <tr>
          <td>
            <input
              value={art.name}
              placeholder="art"
            >
            </input>
          </td>
        </tr>
        <tr>
          <td>
            {art.gaugesize}
          </td>
        </tr>
      </div>
    )

  }

  render() {
    const {hunterArts} = this.props
    return (
      <div>
        <table className="table-style-art">
          <thead>
            <tr>
              <th>
                Style
            </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  name="selectedStyle"
                  onChange={this.handleChange.bind(this, "selectedStyle")}
                >
                  {this.state.styles.map(style => <option key={style} value={style}>{style}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <th>
                Hunter Arts
            </th>
            </tr>
            <tr>
              <td>
              <SearchSelectionInput items={hunterArts} selectItem={this.selectItem} item="hunterArts" />
              </td>
            </tr>
            {/* <tr>
              <td>
                {hunterArts[0].gaugesize}
              </td>
            </tr>
            <tr>
              <td>
                {hunterArts[1] ? <input value={hunterArts[1].name}
                onChange={this.handleChange.bind(this, "art")}
                ></input> : "---"}
              </td>
            </tr>
            <tr>
              <td>
                {hunterArts[1] ? hunterArts[1].gaugesize : "---"}
              </td>
            </tr>
            <tr>
              <td>
                {hunterArts[2] ? <input value={hunterArts[2].name}
                onChange={this.handleChange.bind(this, "art")}
                ></input> : "---"}

              </td>
            </tr>
            <tr>
              <td>
                {hunterArts[2] ? hunterArts[2].gaugesize : "---"}
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hunterArts: state.hunterArt.hunterArts,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(StyleAndArts)