import React, { Component } from "react";
import { convertToDollor } from "../../math/convert";

import "./kidTransction.scss";

class KidTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="kt-section">
        <div className="kt-contain">
          <h2 className="kt-amount-title">Budget</h2>
          <div className="kt-amount-box">
            <div className="kt-amount" style={{ fontSize: "3rem" }}>
              {!isNaN(this.props.amount) ? (
                <div>${convertToDollor(this.props.amount)}</div>
              ) : (
                <div>$0.00</div>
              )}
            </div>
          </div>
          {/* <div className="kt-purchase-box">
                        <h2>Spending: </h2>
                        <label>$</label>{amount}
                    </div> */}
        </div>
      </section>
    );
  }
}

export default KidTransaction;
