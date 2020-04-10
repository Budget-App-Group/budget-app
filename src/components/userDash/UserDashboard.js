import React from "react";
import { connect } from "react-redux";
// import { checkUser } from "../../redux/userReducer";
// import { Link } from "react-router-dom";
import KidPurchasing from "./../Transaction/kidPurchasing";
import "./userDashboard.scss";

function UserDashboard(props) {
  return (
    <div className="user-dash-main">
      {/* <div className="user-name">{props.user}</div> */}
      User Dash
      <KidPurchasing />
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.user;
  const { budget } = reduxState.budget;
  return {
    user,
    budget,
  };
};

export default connect(mapStateToProps, {})(UserDashboard);
