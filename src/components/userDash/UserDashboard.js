import React, { useEffect } from "react";
import { connect } from "react-redux";
import KidTransaction from "../Transaction/kidTranaction";
import KidPurchasing from "./../Transaction/kidPurchasing";
import KidHistory from "./../Transaction/kidHistory";
import { getKidBudget, updateKidBudget } from "../../redux/budgetReducer";
import { getPurchase } from "../../redux/purchaseReducer";
import { sub } from "../../math/math";

import "./userDashboard.scss";

function UserDashboard(props) {
  useEffect(() => {
    if (!props.user.kidId) props.history.push("/");
    if (props.user.kidId) getData();
  }, [props.user, props.history]);

  const getData = () => {
    props.getKidBudget(props.user.kidId);
    props.getPurchase(props.user.kidId);
  };

  return (
    <section className="ud-main">
      <div className="ud-header">
        <h2>{props.user.firstName}</h2>
      </div>
      <div className="ud-budget-box">
        <KidTransaction
          amount={sub(props.budget.balance, props.budget.amount)}
        />
      </div>
      <div className="ud-purchase-box">
        <KidPurchasing />
      </div>
      <div className="ud-history-box">
        <KidHistory />
      </div>
    </section>
  );
}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user.user,
    budget: reduxState.budget.budget,
    purchase: reduxState.purchase.purchase,
  };
};

export default connect(mapStateToProps, {
  getKidBudget,
  getPurchase,
  updateKidBudget,
})(UserDashboard);
