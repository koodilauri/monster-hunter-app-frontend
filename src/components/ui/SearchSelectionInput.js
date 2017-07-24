import React, { Component } from "react"

import "./SearchSelectionInput.css"

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
    const filtered = this.props.items.filter(item => item.name.toLowerCase().includes(searched))
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
    this.props.selectItem(item)
  }

  render() {
    const { menuVisible, searchVisible, searchValue, shownItems, selectedItem } = this.state
    return (
      <div>
        <input
          name="search-input"
          type="text"
          placeholder="Select"
          autoComplete="off"
          tabIndex="0"
          className="search-menu--input"
          value={searchVisible ? searchValue : selectedItem.name}
          onClick={this.handleClick.bind(this, "openSearchMenu")}
          onChange={this.handleSearch}
        />
        <div className={menuVisible ? "search-menu" : "search-menu hidden"}>
          { shownItems.map((item, index) => 
            <div
              key={index}
              className="search-menu--item"
              onClick={this.handleSelect.bind(this, index)}
            >{item.name}</div>
          )}
        </div>
      </div>
    )
  }
}

export default SearchSelectionInput