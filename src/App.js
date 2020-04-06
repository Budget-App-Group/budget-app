import React from "react";
import "./App.css";
import routes from "./routes";
import { withRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App(props) {
  return (
    <div className="App">
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

export default withRouter(App);
