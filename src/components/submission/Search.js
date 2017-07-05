import Search from 'react-search'
import React, { Component } from 'react'
import Select from 'react-select';

class SearchComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { repos: [] }
  }

  HiItems(items) {
    console.log(items)
  }

  getItemsAsync(event) {
    const search = event.target.value
    let url = `http://localhost:8081/questlist?q=${search}&language=javascript`
    fetch(url).then((response) => {
      return response.json();
    }).then((results) => {
      if (results.items !== undefined) {
        let items = results.items.map((res, i) => { return { id: i, value: res.name } })
        this.setState({ repos: items })
        console.log(this.state.repos)
        // cb(searchValue)
      }
    });
  }

  handleSelect(value, event){
    console.log(value)
  }

  renderQuest(quest) {
    return (
      <tr key={quest.id}>
        <td className="name"
        onClick={this.handleSelect.bind(this, quest.value)}
        >{quest.value}</td>
      </tr>
    )
  }

  render() {
    const { repos } = this.state;
    return (
      <div>
        {/*<Search items={this.state.repos}
          multiple={true}
          getItemsAsync={this.getItemsAsync.bind(this)}
          onItemsChanged={this.HiItems.bind(this)} />*/}
        <input
          onChange={this.getItemsAsync.bind(this)} />
        <div>
          <table>
            <tbody>
              {repos.map((repo) => {
                return this.renderQuest(repo)
              }
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default SearchComponent