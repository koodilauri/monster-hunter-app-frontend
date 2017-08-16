import React from "react"
// import image from "../../images/"

class NavBar extends React.Component {
  // <ul className="nav navbar-nav">
  //   {Object.keys(image).map((key, index) =>
  //     <li><img src={image[key]} alt={key} width="21" height="21" key={index} /></li>
  //   )}
  //   <img src={require("../../images/Log_Icon.png")} width="21" height="21" alt="log" />
  // </ul>
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