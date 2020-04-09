import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import AdminDashboard from "./components/adminDash/AdminDashboard";
import UserDashboard from "./components/userDash/UserDashboard";
import ContactUs from "./components/contactUs/ContactUs";
import Join from "./components/Join/Join"
import Chat from "./components/Chat/Chat"
import KidRegister from "./components/Register/KidRegister";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/register" component={Register} />
    <Route path="/admindashboard" component={AdminDashboard} />
    <Route path="/userdashboard" component={UserDashboard} />
    <Route path="/contactus" component={ContactUs} />
    <Route path="/chat" component={Join} />
    <Route path="/chat" component={Chat} />

    <Route path="/kidregister" component={KidRegister} />
  </Switch>
);
