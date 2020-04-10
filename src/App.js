import React from "react";
import "./App.css";
import routes from "./routes";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logout from "./components/Logout/Logout"
// import {Route} from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
      {/* props.user.isAdmin */}
      {console.log(`Is this Admin: ${props.user.isAdmin ? "yes" : "no"}`)}

      {props.location.pathname === "/" ? (
        <>{routes}</>
      ) : (
          <>
          
            <Header /> <Logout/>
            {routes}
            {/* <KidPurchasing /> */}
            <Footer />
          </>
        )}
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.user;
  return {
    user,
  };
};

export default connect(mapStateToProps)(withRouter(App));
