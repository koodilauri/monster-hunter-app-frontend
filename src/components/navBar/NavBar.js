import React from "react"
import { Link } from "react-router-dom"

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Hunters log</Link>
            </div>
            <ul className="nav navbar-nav">
              <li><Link className="" to="/submit">Submit</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar