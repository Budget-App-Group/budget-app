import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser } from "./redux/userReducer";
import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
// import KidPurchasing from "./components/Transaction/kidPurchasing"
// import Logout from "./components/Logout/Logout"
// import {Route} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.email !== prevProps.user.email) {
      this.props.checkUser();
    }
  }

  componentDidMount() {
    this.props.checkUser();
    if (this.props.user.parentsId) this.props.history.push("/adminDashboard");
    if (this.props.user.kidId) this.props.history.push("/userdashboard");
  }

  render() {
    return (
      <div className="App">
        {/* props.user.isAdmin */}
        {/* {console.log(`Is this Admin: ${props.user.kidId ? "yes" : "no"}`)} */}

        {/* {props.user ? props.user.parentsId ? props.history.push('/adminDashboard') : props.history.push('/userDashboard') : ( */}

        {this.props.location.pathname === "/" ||
        this.props.location.pathname === "/register" ? (
          <>{routes}</>
        ) : (
          <>
            <Header />
            {routes}
          </>
        )}
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

export default connect(mapStateToProps, { checkUser })(withRouter(App));
