
import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { register } from '../../redux/userReducer'
import {Link} from 'react-router-dom'


class Register extends Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: ""
      };
    }
  
    handleInput = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
    
    handleRegister = () => {
      console.log(this.state)
      const { email, password } = this.state;
      axios.post('/api/register', {
          email,
          password
        }).then(res => {
          this.props.getUser(res.data);
          this.props.history.push('/');
        }).catch(err => console.log(err));
    };

  render() {
    return (
      <div className="app-body">
        <div className="input-container">
          <div className="flex-horizontal inputs">
            <div className="flex-vertical">
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
                onChange={this.handleInput}
              />
            </div>
            <button onClick={this.handleRegister} className="button">
              Register
            </button>
          </div>
          <div className="flex-horizontal link">
            <span>Already have an account? login here: </span>
            <Link to="/" className="input-container-button">
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { register })(Register);
