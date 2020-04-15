import React, { Component } from "react";
import axios from "axios";
import Map from "../Map/map";
import { connect } from "react-redux";
import { convertToDollor } from "../../math/convert";

import './parentsKidHistory.scss'

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
    const purchase =
      this.state.purchases.length > 0 ? (
        this.state.purchases.slice(0, 5).map((purchase) => {
          const { location } = purchase;
          return (
            <section className='pkh-section'
              key={purchase.purchase_id}
            >
              <div className="pkh-header">
                <h3 className="pkh-title">{purchase.activity}</h3>
                <div className='pkh-detail'>
                  <p className="pkh-summary">{purchase.summary}</p>
                  <p className="pkh-amount">${convertToDollor(purchase.amount)}</p>
                </div>
              </div>
              <div className="pkh-google-map-contain">
                <Map place={location} />
              </div>
            </section>
          );
        })
      ) : (
        <div className='pkh-no-history-box'>
          <h1>No History</h1>
        </div>
      );

    return (
      <div className="pkh">
        <h1 className="pkh-name">
          {state ? state.fristName : ""}
        </h1>
        <div className="pkh-items">
          {purchase}
        </div>
        <button className="input-button-med" onClick={this.backClicked}>
          cancel
        </button>
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
