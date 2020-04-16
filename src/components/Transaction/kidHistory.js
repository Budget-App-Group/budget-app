import React from 'react';
import { convertToDollor } from '../../math/convert'
import { connect } from 'react-redux'

import './kidHistory.scss'

function KidHistory(props) {
    
    const purchase = props.purchase.length >= 0 ? props.purchase.splice(0, 10).map(purchase => {
        return (
            <div key={purchase.purchase_id} className='kh-items-contain'>
                <div className='kh-flex-row'>
                    <h2>{purchase.activity}</h2>
                    <span>${convertToDollor(purchase.amount)}</span>
                </div>
                {/* <div>
                    <button>Edit</button>
                </div> */}
            </div>
        )
    }) : <div className='kh-no-history'>No History</div>

    return (
        <section className='kh-section'>
            <div className='kh-contain'>
                <div className='kh-title-box'>
                    <h1 className='kh-title'>History</h1>
                </div>
                <div className='kh-history'>
                    <div className='kh-scroll'>
                        { purchase }
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = reduxState => {
    const { purchase } = reduxState.purchase
    return {
        purchase
    }
}
export default connect(mapStateToProps)(KidHistory)