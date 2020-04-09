import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../redux/userReducer";
import { withRouter } from 'react-router-dom'

const AdminDashboard = props => {
    const logout = () => {
        axios.post("/auth/logout").then(res => {
            props.logout();
            props.history.push("/");
        });
    };

    return (
        <div className="app-body">
            <p>{props.user.user_id}</p>
            <p>{props.user.user_email}</p>
            <button className="logout-button" onClick={logout}>
                Log out
      </button>
        </div>
    );
};

const mapStateToProps = reduxState => {

    return reduxState;
};

export default connect(mapStateToProps, { logout })
(withRouter(AdminDashboard));