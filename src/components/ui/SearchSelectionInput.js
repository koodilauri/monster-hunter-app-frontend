import React, { Component } from "react"

class SearchSelectionInput extends Component {

  state = {
    menuVisible: false,
    searchVisible: false,
    searchValue: "",
    shownItems: [],
    selectedItem: {
      name: ""
    },
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      shownItems: newProps.items
    })
  }

  handleClick(type, value, e) {
    if (type === "openSearchMenu") {
      this.setState({
        menuVisible: true,
        searchVisible: true,
      })
    }
  }

  handleSearch = (e) => {
    const searched = e.target.value
    const filtered = this.props.items.filter(item => item.name.toLowerCase().includes(searched.toLowerCase()))
    this.setState({
      searchValue: searched,
      shownItems: filtered
    })
  }

  handleSelect(index, e) {
    const item = this.state.shownItems[index]
    this.setState({
      menuVisible: false,
      searchVisible: false,
      selectedItem: item
    })
    this.props.selectItem(this.props.item, item)
  }

  render() {
    const { menuVisible, searchVisible, searchValue, shownItems, selectedItem } = this.state
    const { errors } = this.props
    return (
      <div className="form-group search-container">
        <input
          name="search-input"
          type="text"
          placeholder="Select"
          autoComplete="off"
          tabIndex="0"
          className="form-control"
          value={searchVisible ? searchValue : selectedItem.name}
          onClick={this.handleClick.bind(this, "openSearchMenu")}
          onChange={this.handleSearch}
        />
        <div className={menuVisible ? "search-menu" : "search-menu hidden"}>
          { shownItems.map((item, index) => 
            <div
              key={index}
              className="search-menu--item active"
              onClick={this.handleSelect.bind(this, index)}
            >{item.name}</div>
          )}
        </div>
        <div>
          { errors ? 
            errors.map((error, i) =>
              <div key={i}>{error.message}</div>
            )
              :
            null
          }
        </div>
      </div>
    )
  }
}

export default SearchSelectionInput