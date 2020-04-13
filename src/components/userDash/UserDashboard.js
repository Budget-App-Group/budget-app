import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { checkUser } from "../../redux/userReducer";
// import { Link } from "react-router-dom";
import { getKidBudget } from "../../redux/budgetReducer";
import KidPurchasing from "./../Transaction/kidPurchasing";
import "./userDashboard.scss";

function UserDashboard(props) {

  useEffect(() => {
    if(!props.user.kidId) props.history.push('/')
    
  },[props.user, props.history])

  return (
    <div className="user-dash-main">
      <div className="user-name">{props.user.firstName}</div>
      <div className="amount-section">{props.budget.amount}amount left</div>
      <KidPurchasing />
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user.user,
    budget: reduxState.budget.budget,
  };
};

export default connect(mapStateToProps, { getKidBudget })(UserDashboard);
