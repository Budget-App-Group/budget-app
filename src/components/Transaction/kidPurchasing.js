import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { geolocated } from "react-geolocated";
// import { postKidPurchase } from "../../redux/budgetReducer";
import { postPurchase } from "../../redux/purchaseReducer";
import "./kidPurchasing.scss";

function KidPurchasing(props) {
  const [amount, setAmount] = useState("");
  const [types, setType] = useState("");
  const [location, setLocation] = useState({});
  const [summary, setSummary] = useState("");
  // const [receiptImg, setReceiptImg] = useState("");

  useEffect(() => {
    setLocation({
      latitude: props.coords ? props.coords.latitude : 0,
      longitude: props.coords ? props.coords.longitude : 0,
    });
  }, [props]);

  const purchaseSubmit = (event) => {
    // event.preventDefault();
    if (amount && types !== "Select Options" && summary) {
      const budget = {
        amount: amount * 100,
        types,
        location,
        summary,
      };
      props.postPurchase(props.user.kidId, budget);
      clearInput();
    }
  };
  
  const clearInput = () => {
    setAmount("");
    setType("");
    setSummary("");
  };

  return (
    <section className="kp-section">
      <div className="kp-title">
        <h2>Purchasing</h2>
      </div>
      <form className="kp-form" onSubmit={purchaseSubmit}>
        <div className="kp-amount">
          <div className="kp-currency-input">
            <span>$</span>
            <input
              className="kp-amount-input"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
        </div>
        <div className="kp-type">
          <label>Type</label>
          <select
            className="kp-type-input"
            value={types}
            onChange={(event) => setType(event.target.value)}
          >
            {/* {selectOption} */}
            <option>Select Opitons</option>
            <option>Food</option>
            <option>Gas</option>
            <option>Entertainment</option>
            <option>Clothes</option>
          </select>
        </div>
        <div className="kp-name">
          <label>Item</label>
          <input
            className="kp-name-input"
            type="text"
            placeholder="Name"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>
        <div className="kp-button">
          <button className="kp-button-input" type="submit">
            Purchase
          </button>
        </div>
        {!props.isGeolocationAvailable ? (
          <div> Your browser does not support Geolocation</div>
        ) : !props.isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : (
          <div></div>
        )}
      </form>
    </section>
  );
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.user;
  const { budget } = reduxState.budget;
  const { purchase } = reduxState.purchase;
  return {
    user,
    budget,
    purchase,
  };
};

export default connect(mapStateToProps, { postPurchase })(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(KidPurchasing)
);
