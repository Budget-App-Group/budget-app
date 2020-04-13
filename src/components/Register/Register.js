import React, { Component } from "react";
// import axios from 'axios'
import { connect } from "react-redux";
import { register } from "../../redux/userReducer";
import { Link } from "react-router-dom";
import "./Register.scss";

// import KidRegister from './KidRegister'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      kids: [{}],
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      kidUsername: "",
      kidPassword: "",
    };

    // this.deleteKidClicked = this.deleteKidClicked.bind(this)
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  kidUsernameInput = (event) => {
    // let { username } = this.state.kids[id]
    // username = event.target.value
    this.setState({
      kidUsername: event.target.value,
    });
  };
  kidPasswordInput = (event) => {
    // let { password } = this.state.kids[id]
    // password = event.target.value
    this.setState({
      kidPassword: event.target.value,
    });
  };

  // kidHandleInput = (kUsername, kPassword, id) => {
  //   let { username, password } = this.state.kids[id]
  //   username = kUsername
  //   password = kPassword
  //   this.setState({
  //     kids: [...this.state.kids, {username, password}]
  //   })
  // }
  handleRegister = () => {
    // console.log(this.state)
    // const { firstName, lastName, email, password } = this.state;
    try {
      this.props.register(this.state);
      this.props.history.push("/kidregister");
    } catch {
      console.log("failed");
    }
    // axios.post('/api/register', {
    //     email,
    //     password
    //   }).then(res => {
    //     this.props.getUser(res.data);
    //     this.props.history.push('/');
    //   }).catch(err => console.log(err));
  };

  addKidClicked = () => {
    this.setState({
      kids: [
        ...this.state.kids,
        { username: this.state.kidUsername, password: this.state.kidPassword },
      ],
    });
  };

  // deleteKidClicked = id => {
  //   console.log('delete: ' + id)
  //   // console.log("Removed: " + this.state.kids.splice(id, 1))
  //   this.setState({
  //     kids: this.state.kids.length >= 0 ? this.state.kids.splice(id, 1) : []
  //   })
  //   console.log(this.state.kids)
  // }

  render() {
    // const addKids = this.state.kids.map((kid, i) => {
    //   return (
    //     <KidRegister key={i}
    //       id={i}
    //       inputUsernameFN={this.kidUsernameInput}
    //       inputPasswordFN={this.kidPasswordInput}
    //     />
    //   )
    // })
    return (
      <div className="register-body">
        <div className="register-title">
          <h1>BudKid</h1>
        </div>
        <div className="register-input-container">
          <div className="register-inputs">
            <label className="firstname-reg-label">First Name: </label>
            <input
              className="register-input"
              maxLength="100"
              placeholder="Enter First Name"
              name="firstName"
              onChange={this.handleInput}
            />
            <label className="lastname-reg-label">Last Name: </label>
            <input
              className="register-input"
              maxLength="100"
              placeholder="Enter Last Name"
              name="lastName"
              onChange={this.handleInput}
            />
            <label className="email-reg-label">Email: </label>
            <input
              className="register-input"
              maxLength="100"
              placeholder="Enter Email"
              name="email"
              onChange={this.handleInput}
            />
            <label className="Password-reg-label">Password: </label>
            <input
              className="register-input"
              type="password"
              maxLength="20"
              placeholder="Enter Password"
              name="password"
              onChange={this.handleInput}
            />
          </div>
          <div className="reg-button-container">
            <button onClick={this.handleRegister} className="reg-button">
              Register
            </button>
          </div>
        </div>
        {/* <div>
            <h3>Kid Register</h3>
            {addKids}
            <button onClick={this.addKidClicked}>add kid</button>
          </div> */}
        <div className="flex-horizontal link">
          <span>Already have an account? login here: </span>
          <Link to="/" className="input-container-button">
            Log in
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { register })(Register);
