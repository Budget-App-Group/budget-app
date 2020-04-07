import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { checkUser } from "../../redux/userReducer";
// import { Link } from "react-router-dom";

class KidRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRegisterKid = () => {
    // console.log(this.state);
    const { userName, password } = this.state;
    axios
      .post("/api/register", {
        userName,
        password,
      })
      .then((res) => {
        this.props.checkUser(res.data);
        // this.props.history.push("/admindashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="kid-register-main">
        <div className="kid-inputs">
          <input
            placeholder="Enter Kid Username"
            name="userName"
            onChange={this.handleInput}
          />
          <input
            type="password"
            placeholder="Enter Kid Password"
            name="password"
            onChange={this.handleInput}
          />
        </div>

        <button onClick={this.handleRegister} className="kid-button">
          Register Kid
        </button>
      </div>
    );
  }
}

export default connect(null, { checkUser })(KidRegister);
