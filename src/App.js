import React from "react";
import "./App.css";
import routes from "./routes";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {Route} from 'react-router-dom';

function App(props) {
  return (
    <div className="App">

      {/* props.user.isAdmin */}

      {
        console.log(`Is this admin: ${props.user.isAdmin ? "yes" : "no"}`)
      }
      app.js component --remove me!
      {props.location.pathname === "/" ? (
        <>{routes}</>
      ) : (
        <>
          <Header />
          {routes}
          <Footer />
        </>
      )}
    </div>
  );
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.user
  return {
    user
  }
}

export default connect(mapStateToProps)(withRouter(App));
