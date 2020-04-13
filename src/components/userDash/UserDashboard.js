import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { checkUser } from "../../redux/userReducer";
// import { Link } from "react-router-dom";
import KidTransaction from '../Transaction/kidTranaction';
import KidPurchasing from "./../Transaction/kidPurchasing";
import KidHistory from './../Transaction/kidHistory';
import { getKidBudget, getBudget } from '../../redux/budgetReducer'
import "./userDashboard.scss";

function UserDashboard(props) {

  useEffect(() => {
    if(!props.user.kidId) props.history.push('/')
    if (props.user.kidId) getBudget()

  },[props.user, props.history])

  const getBudget = () => {
    props.getKidBudget(props.user.kidId)
  }

  const convert = amount => {
    return amount / 100
  }

  return (
    <section className="user-dash-main">
      <div>
        <h2>{props.user.fristName}</h2>
        <KidTransaction amount={convert(props.budget.amount_balance)}/>
        {/* <div className="user-name">{props.user.firstName}</div>
        <div className="amount-section">{props.budget.amount}amount left</div> */}
        <KidPurchasing />
        <KidHistory id={props.user.kidId} />
      </div>
    </section>
  );
}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user.user,
    budget: reduxState.budget.budget,
  };
};

export default connect(mapStateToProps, { getKidBudget })(UserDashboard);
