import Search from 'react-search'
import React, { Component } from 'react'

class SearchComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { repos: [] }
  }

  HiItems(items) {
    console.log(items)
  }

  getItemsAsync(searchValue, cb) {
    let url = `http://localhost:8081/questlist?q=${searchValue}&language=javascript`
    fetch(url).then((response) => {
      return response.json();
    }).then((results) => {
      if (results.items !== undefined) {
        let items = results.items.map((res, i) => { return { id: i, value: res.name } })
        this.setState({ repos: items })
        cb(searchValue)
      }
    });
  }

  render() {
    return (
      <div>
        <Search items={this.state.repos}
          multiple={true}
          getItemsAsync={this.getItemsAsync.bind(this)}
          onItemsChanged={this.HiItems.bind(this)} />
      </div>
    )
  }
}

export default SearchComponent