import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../redux/userReducer'
import './Auth.css'
import { Link } from 'react-router-dom'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            // user_id: "" don't need user_id this component
        };
    }
    componentDidUpdate(prevProp){
        if(this.props.user.user_id !== prevProp.user.user_id) {
            this.props.history.push('/')
        }
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
        
    Login = event => {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password)
        // axios.post('/auth/login', {
        //     email: this.state.email,
        //     password: this.state.password
        // }).then(res => {
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

const mapStateToProps = reduxState => {
    const { user } = reduxState.user
    return {
        user
    }
    
}

export default connect(mapStateToProps, { login })(Auth)

