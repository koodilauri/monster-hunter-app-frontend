import React from "react"

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Hunters log</a>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar