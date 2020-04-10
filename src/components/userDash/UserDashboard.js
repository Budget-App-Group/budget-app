import React from "react";
import { connect } from "react-redux";
// import { checkUser } from "../../redux/userReducer";
// import { Link } from "react-router-dom";
// import { getKidBudget } from "../../redux/budgetReducer";
import KidPurchasing from "./../Transaction/kidPurchasing";
import { withRouter } from "react-router-dom";
import "./userDashboard.scss";

function UserDashboard(props) {
  console.log(props);
  return (
    <div className="user-dash-main">
      <div className="user-name">{props.user.firstName}Kid username</div>
      <div className="amount-section">{props.budget.amount}amount left</div>
      <KidPurchasing />
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user,
    budget: reduxState.budget,
  };
};

export default connect(mapStateToProps, {})(withRouter(UserDashboard));
