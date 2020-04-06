import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../redux/userReducer'
import './Auth.css'
import { Link } from 'react-router-dom'

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      user_id: ""
    };
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value

    });
  };

  Login = () => {
    axios
      .post("/auth/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        this.props.getUser(res.data);
        this.props.history.push("/dash");
      });
  };

  render() {
    return <div></div>;

    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password 
    }).then(res => {

      this.props.getUser(res.data);
      this.props.history.push('/');
    })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="app-body">
        <input
          maxLength="100"
          placeholder="Enter Email"
          name="email"
          onChange={this.handleInput}
        />
        <input
          type="password"
          maxLength="20"
          placeholder="Enter Password"
          name="password"
          //#does the same thing as line 44
          onChange={e => {
            this.handleInput(e);
          }}
        />
        <button
          onClick={this.Login}
          className="dash-button"
        >
          Log in
            </button>
        <div className="flex-horizontal link">
          <span>Don't have an account? Register here: </span>
          <Link to="/register" className="input-container-button"> {/* 54H */}
              Register
             </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { getUser })(Auth);
