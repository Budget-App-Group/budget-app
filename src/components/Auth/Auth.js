import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../redux/userReducer'

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
    };


    Login = event => {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password)
        // axios.post('/auth/login', {
        //     email: this.state.email,
        //     password: this.state.password
        // }).then(res => {

        //     this.props.getUser(res.data);
        //     this.props.history.push('/dash')
        // })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.Login}>
                    <input type="text" placeholder="Email" name="email" />
                    <br />
                    <input type="password" placeholder="Password" name="password" />
                    <br />
                    <button type='submit' >Login</button>
                </form>
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const { user } = reduxState.user
    return {
        user
    }
    
}

export default connect(mapStateToProps, { login })(Auth)
