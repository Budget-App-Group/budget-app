import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { geolocated } from "react-geolocated";
import { postKidBudget } from "../../redux/budgetReducer";

function KidPurchasing(props) {
  const [amount, setAmount] = useState(0);
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState({});
  const [summary, setSummary] = useState("");
//   const [receiptImg, setReceiptImg] = useState("");


  useEffect(() => {
    setLocation({
        latitude: props.coords ? props.coords.latitude : 0,
        longitude: props.coords ? props.coords.longitude : 0
    })

  },[props])

  const purchaseSubmit = (event) => {
    event.preventDefault();

    const budget = {
    //   kidId: props.user.userId
      amount,
      activity,
      location,
      summary,
    };
    console.log(budget);
    // props.postKidBudget(budget)
  };

//   const selectOption = location.map();
  return (
    <div className="kid-purchase-constain">
      {!props.isGeolocationAvailable ? (
        <div> Your browser does not support Geolocation</div>
      ) : !props.isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : (
        <form className="kid-purchase-form" onSubmit={purchaseSubmit}>
          <input
            type="text"
            onChange={(event) => setAmount(event.target.value)}
          />
          <select onChange={event => setActivity(event.target.value)}>
            <option></option>
            {/* {selectOption} */}
          </select>
          <input
            type="text"
            onChange={(event) => setSummary(event.target.value)}
          />
          
          <button type="submit">Purchase</button>
        </form>
      )}
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

export default connect(mapStateToProps, { postKidBudget })(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(KidPurchasing)
);
