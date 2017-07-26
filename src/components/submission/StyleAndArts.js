import React from "react"
import "./StyleAndArt.css"
class StyleAndArts extends React.Component {
  state = {
    selectedStyle: "Guild",
    styles: ["Guild", "Striker", "Adept", "Aerial"],
    hunterArts: [{
      id: 1,
      name: "art1",
      gaugesize: 250,
      description: "",
      weapon: "General"
    },
    {
      id: 1,
      name: "art2",
      gaugesize: 250,
      description: "",
      weapon: "General"
    }]
  }

  handleChange1(field, e) {
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
  }

  changeHunterArt(amount) {
    const { hunterArts } = this.state
    let l = hunterArts.length
    console.log("starting arts: ", l, ", target is: ", amount)
    while (l !== amount) {
      if (l < amount) l += this.addHunterArt()
      if (l > amount) l += this.removeHunterArt()
      console.log("changed arts to: ", l)
    }
  }

  addHunterArt() {
    const { hunterArts } = this.state
    this.setState({
      hunterArts: [
        ...hunterArts,
        { id: 1, name: "", gaugesize: 250, description: "", weapon: "General" }
      ]
    })
    return 1
  }

  removeHunterArt() {
    const { hunterArts } = this.state
    this.setState({
      hunterArts: hunterArts
        .slice(0, hunterArts.length - 1)
    })
    return -1
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
                  onChange={this.handleChange1.bind(this, "selectedStyle")}

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
            {this.renderArts()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default StyleAndArts