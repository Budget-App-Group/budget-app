import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUser, logout } from "../../redux/userReducer"
import { Link } from "react-router-dom";
import "./header.scss";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false,
    };
    this.logoutClicked = this.logoutClicked.bind(this)
  }

  logoutClicked() {
    this.props.logout()
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
        <div className="title">
          <h1>BudKid</h1>
        </div>
        <div
          className="dropdown"
          style={{ background: "white", width: "100px" }}
        >
          <div
            className="head-button"
            data-testid="menu-button"
            onClick={this.showDropdownMenu}
          >
            Menu
          </div>
          {this.state.displayMenu ? (
            <ul data-testid="dropdown">
              <li>
                <Link to="/admindashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>

              <li>
                {/* <a href="logut">Log Out</a> */}
                <div onClick={this.logoutClicked}>Logout</div>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.user
  return {
    user
  }
}

export default connect(mapStateToProps, { checkUser, logout })(Header)
