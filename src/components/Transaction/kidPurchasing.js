import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { geolocated } from "react-geolocated";
import { postKidBudget } from "../../redux/budgetReducer";
import "./kidPurchasing.scss";

function KidPurchasing(props) {
  const [amount, setAmount] = useState(0);
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState({});
  const [summary, setSummary] = useState("");
  //   const [receiptImg, setReceiptImg] = useState("");

  useEffect(() => {
    setLocation({
      latitude: props.coords ? props.coords.latitude : 0,
      longitude: props.coords ? props.coords.longitude : 0,
    });
  }, [props]);

  const purchaseSubmit = (event) => {
    event.preventDefault();

    const budget = {
      amount,
      activity,
      location,
      summary,
    };
    // console.log(budget);
    props.postKidBudget(props.user.kidId, budget)
  };

  //   const selectOption = location.map();
  return (
    <section className="kid-purchase-contain">
      {!props.isGeolocationAvailable ? (
        <div> Your browser does not support Geolocation</div>
      ) : !props.isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : (
        <form className="kid-purchase-form" onSubmit={purchaseSubmit} style={{textAlign: 'left', backgroundColor:'lightBlue', padding: '10px', boxShadow: 'black 0 0 5px'}}>
          <div className="amount-input">
            <label>Amount</label>
            <input
              type="text"
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
          <div className="purchase-type">
            <label>Type</label>
            <select onChange={(event) => setActivity(event.target.value)}>
              {/* {selectOption} */}
              <option>Select Type</option>
              <option>Food</option>
              <option>Gas</option>
              <option>Entertainment</option>
            </select>
          </div>
          <div className="purchase-item-name">
            <label>Item Name</label>
            <input
              type="text"
              onChange={(event) => setSummary(event.target.value)}
            />
          </div>

          <button type="submit">Purchase</button>
        </form>
      )}
    </section>
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

export default connect(mapStateToProps, { postKidBudget })(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(KidPurchasing)
);
