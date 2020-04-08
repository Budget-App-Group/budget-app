import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.scss";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false,
    };
  }

  showDropdownMenu = (event) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };

  render() {
    return (
      <div className="header-main">
        <div class="title">
          <h1>BudKid</h1>
        </div>
        <div
          className="dropdown"
          style={{ background: "white", width: "100px" }}
        >
          <div className="head-button" onClick={this.showDropdownMenu}>
            Menu
          </div>
          {this.state.displayMenu ? (
            <ul>
              <li>
                <Link to="/admindashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>

              {/* <li>
                <a href="#Log Out">Log Out</a>
              </li> */}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}
