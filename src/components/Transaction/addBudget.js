import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateBudget } from "../../redux/budgetReducer";
import { sub, add } from "../../math/math";
import { convertToDollor } from "../../math/convert";

import './addBudget.scss'

function AddBudget(props) {
  const [amount, setAmount] = useState("");
  const [kid, setKid] = useState({});

  useEffect(() => {
    if (!props.user.parentsId) props.history.push("/");
    getData(props.match.params.id);
  }, [props.match, props.user, props.history]);

  const getData = (budget_id) => {
    axios
      .get(`/api/kid/${budget_id}`)
      .then((res) => {
        setKid(res.data);
      })
      .catch((err) => console.log(err));
  };
  const cancelClicked = () => {
    props.history.goBack();
  };

  const submitClicked = (event) => {
    event.preventDefault();
    if (amount) {
      props.updateBudget(props.match.params.id, add(kid.balance, amount * 100));
      getData(props.match.params.id)
      clearInput();
    //   console.log(kid)
    //   props.history.goBack();
    }
  };

  const clearInput = () => {
    setAmount('');
  };

  return (
    <div className="add-b-main">
      <div className="add-b-header">
        <h1>Add Budget</h1>
      </div>
      <div className='add-b-contain'>
        <form className='add-b-form' onSubmit={submitClicked}>
          <div className='add-b-name'>
            <h2>{kid.first_name}</h2>
          </div>
          <div className='add-b-amount'>
              <h1>
                  {!isNaN(kid.balance) ? (
                    <span>${convertToDollor(sub(kid.balance, kid.amount_balance))}</span>
                  ) : (
                    <span>$0.00</span>
                )}
              </h1>
          </div>
          <div className='add-input-box'>
            <div className="add-b-input">
              <span>$</span>
              <input
                className='add-b-number-input'
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>
          </div>
          <div className='add-b-buttons'>
            <button type="button" onClick={cancelClicked}>
                cancel
            </button>
            <button type="submit">add</button>
          </div>
        </form>
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

export default connect(mapStateToProps, { updateBudget })(AddBudget);
