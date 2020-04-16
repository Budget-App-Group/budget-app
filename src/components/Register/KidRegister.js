import React, { Component } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import { checkUser, kidRegister } from "../../redux/userReducer";
import "./kidRegister.scss";
// import { Link } from "react-router-dom";

class KidRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kids: [],
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addKidInfo = () => {
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.username &&
      this.state.password
    ) {
      console.log(this.state.username);
      this.setState({
        kids: [
          ...this.state.kids,
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
          },
        ],
      });
      // }).then((res) => {
      //   this.props.checkUser(res.data);
      //   // this.props.history.push("/userdashboard");
      // }).catch((err) => console.log(err));
      this.clearInput();
    } else {
      window.alert("Please it out");
    }
  };

  handleRegisterKid = (event) => {
    event.preventDefault();
    let kids = []
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.username &&
      this.state.password
    ) {
      kids = [
        ...this.state.kids,
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          password: this.state.password,
        },
      ];
      // const { userName, password } = this.state;
      // axios
      //   .post("/api/register", {
      //     userName,
      //     password,
      //   })
      //   .then((res) => {
      //     this.props.checkUser(res.data);
      //     // this.props.history.push("/admindashboard");
      //   })
      //   .catch((err) => console.log(err));
      this.props.kidRegister(this.props.user.parentsId, kids);
      this.props.history.push("/admindashboard");
    } else {
      kids = [...this.state.kids]
      this.props.kidRegister(this.props.user.parentsId, kids);
      this.props.history.push("/admindashboard");
    }
  };

  goBackClicked = () => {
    this.props.history.goBack();
  };

  clearInput() {
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
  }

  render() {
    const kid = this.state.kids.map((kid, i) => <p key={i}>{kid.firstName}</p>);
    
    const { isOld } = this.props.location.state;
    return (
      <div className="kid-register-main">
        <h1>Kid Register</h1>
        <div>
          {isOld ? <button onClick={this.goBackClicked}>cancel</button> : null}
        </div>
        <div className="kid-inputs">
          <form onSubmit={this.handleRegisterKid}>
            <input className="kid-firstname"
              type="text"
              name="firstName"
              value={this.state.firstName}
              placeholder="Enter First Name"
              onChange={this.handleInput}
            />
            <input className='kid-lastname'
              type="text"
              name="lastName"
              value={this.state.lastName}
              placeholder="Enter Last Name"
              onChange={this.handleInput}
            />
            <input className='enter-kid-username'
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Enter Kid Username"
              onChange={this.handleInput}
            />
            <input className='enter-kid-pw'
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter Kid Password"
              onChange={this.handleInput}
            />

            <button className='add-kid-bt' onClick={this.addKidInfo} type="button">
              Add kid
            </button>
            <button type="submit">Submit</button>
          </form>
          {kid}

          {/* {this.props.id > 0 ? 
            <button onClick={() => this.props.deleteKidFN(this.props.id)}>delete kid</button>
           : null } */}
        </div>

        {/* <button onClick={this.handleRegister} className="kid-button">
          Register Kid
        </button> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.user;
  return {
    user,
  };
};

export default connect(mapStateToProps, { checkUser, kidRegister })(
  KidRegister
);
