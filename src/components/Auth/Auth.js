import React, { Component } from "react";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user_id: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
  }
}
