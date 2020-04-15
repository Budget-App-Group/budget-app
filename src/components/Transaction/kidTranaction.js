import React, { Component } from 'react';
import { convertToDollor } from '../../math/convert'

import './kidTransction.scss'

class KidTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return(
            <section className='kt-section'>
                <div className='kt-contain'>
                    <div className='kt-amount-box'>
                        <h2 className='kt-amount-title'>Amount:</h2>
                        <div className='kt-amount' style={{fontSize: '3rem'}}>
                            {!isNaN(this.props.amount) ? (
                                <label>${convertToDollor(this.props.amount)}</label>
                            ) : (
                                <label>$0.00</label>
                            )}
                        </div>
                    </div>
                    {/* <div className="kt-purchase-box">
                        <h2>Spending: </h2>
                        <label>$</label>{amount}
                    </div> */}
                </div>
            </section>
        )
    }
}

export default KidTransaction