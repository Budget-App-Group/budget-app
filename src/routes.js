import React from "react";
import { Switch, Route } from "react-router-dom";
// import Auth from "./components/auth/Auth"
import AdminDashboard from "./components/adminDash/AdminDashboard";
import UserDashboard from "./components/userDash/UserDashboard";
import ContactUs from "./components/contactUs/ContactUs";

export default (
  <Switch>
    {/* <Route exact path="/" component={Auth} /> */}
    <Route path="/admindashboard" component={AdminDashboard} />
    <Route path="/userdashboard" component={UserDashboard} />
    <Route path="/contactus" component={ContactUs} />
  </Switch>
);
