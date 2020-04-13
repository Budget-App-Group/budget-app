import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/userReducer";
import "./Auth.scss";
import { Link } from "react-router-dom";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      // user_id: "" don't need user_id this component
    };
  }
  componentDidUpdate(prevProp) {
    if (this.props.user !== prevProp.user) {
      if (this.props.user.parentsId) this.props.history.push("/admindashboard");
      if (this.props.user.kidId) this.props.history.push("/userdashboard");

            // console.log(this.props.user)
        }
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  Login = (event) => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
    // axios.post('/auth/login', {
    //     email: this.state.email,
    //     password: this.state.password
    // }).then(res => {
  };

  render() {
    return (
      <div className="auth-body">
        <div className="auth-title">
          <h1>BudKid</h1>
        </div>
        <div className="auth-inputs">
          <div className="auth-email-cont">
            <label className="auth-email-label">Email: </label>
            <input
              className="auth-input"
              maxLength="100"
              placeholder="Enter Email"
              name="email"
              onChange={this.handleInput}
            />
          </div>
          <div className="auth-pass-cont">
            <label className="auth-pass-label">Password: </label>
            <input
              className="auth-input"
              type="password"
              maxLength="20"
              placeholder="Enter Password"
              name="password"
              //#does the same thing as line 44
              onChange={(e) => {
                this.handleInput(e);
              }}
            />
          </div>
        </div>
        <div className="auth-button-container">
          <button onClick={this.Login} className="auth-login-button">
            Log in
          </button>
        </div>
        <div className="auth-register-link">
          <span> Don 't have an account? Register here: </span>
          <Link to="/register" className="input-container-button">
            Register
          </Link>
          {/* 54H */}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.user;
  return {
    user,
  };
};

export default connect(mapStateToProps, { login })(Auth);
