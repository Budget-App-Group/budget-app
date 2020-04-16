import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { checkUser } from "../../redux/userReducer";
import axios from "axios";
import Transaction from "../Transaction/transaction";

import './adminDashboard.scss'

function AdminDashboard(props) {
  const [kids, setKids] = useState([]);
  useEffect(() => {
    if (!props.user.parentsId) props.history.push("/");
    if (props.user.parentsId) getKid(props.user.parentsId);
  }, [props.user, props.history]);

  const getKid = (parents_id) => {
    axios
      .get(`/api/budget/${parents_id}`)
      .then((res) => {
        setKids(res.data);
      })
      .catch((err) => console.log(err));
  };

  function infoClicked(id, name) {
    props.history.push({
      pathname: `/kids/${id}`,
      state: { fristName: name },
    });
  }
  function addBudgetClicked(id) {
    props.history.push(`/kids/budget/${id}`);
  }

  const addKidClicked = () => {
    props.history.push({
      pathname: "/kidregister",
      state: { isOld: true },
    });
  };

  const kid = kids.map((kid) => {
    return (
      <Transaction
        key={kid.kid_id}
        kidId={kid.kid_id}
        firstName={kid.first_name}
        pic={kid.pic}
        budgetID={kid.budget_id}
        amount={kid.amount_balance}
        balance={kid.balance}
        infoFN={infoClicked}
        addFN={addBudgetClicked}
      />
    );
  });

  return (
    <div className="admin-main">
      <div className='admin-contain'>
        <div className='admin-name'>
          <h2>{props.user.firstName}</h2>
        </div>
        <div className="admin-register">
          <div className="admin-add-button" onClick={addKidClicked}>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="admin-kids-lists">
          {kid}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.user;
  return {
    user,
  };
};

export default connect(mapStateToProps, { checkUser })(AdminDashboard);
