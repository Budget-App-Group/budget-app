import React, { Component } from "react";
import axios from "axios";
import Map from "../Map/map";
import { connect } from "react-redux";
import { convertToDollor } from "../../math/convert";

class ParentsKids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
    };
  }

  componentDidUpdate() {
    if (!this.props.user.parentsId) this.props.history.push("/");
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(`/api/kid/purchases/${+this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          purchases: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  backClicked = () => {
    this.props.history.goBack();
  };

  render() {
    const { state } = this.props.location;
    const purchase = this.state.purchases.length > 0
      ? this.state.purchases.slice(0, 5).map((purchase) => {
          const { location } = purchase;
          return (
            <div
              key={purchase.purchase_id}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <h3>{purchase.activity}</h3>
                <article>{purchase.summary}</article>
                <label>${convertToDollor(purchase.amount)}</label>
              </div>
              <div
                style={{
                  width: "80%",
                  height: "125px",
                  boxShadow: "black 0 0 5px",
                }}
              >
                <Map place={location} />
              </div>
            </div>
          );
        })
      : <div>No History</div>;

    return (
      <div>
        <h1>{state ? state.fristName : ""}</h1>
        {purchase}
        <button onClick={this.backClicked}>cancel</button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.user;
  return {
    user,
  };
};

export default connect(mapStateToProps)(ParentsKids);
