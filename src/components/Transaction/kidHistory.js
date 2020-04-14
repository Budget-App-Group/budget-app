import React from 'react';
import { convertToDollor } from '../../math/convert'
import { connect } from 'react-redux'

function KidHistory(props) {

    const purchase = props.purchase.length >= 0 ? props.purchase.map(purchase => {
        return (
            <div key={purchase.purchase_id}>
                <div>
                    <h2>{purchase.activity}</h2>
                    <label>${convertToDollor(purchase.amount)}</label>
                </div>
                <div>
                    <button>Edit</button>
                </div>
            </div>
        )
    }) : <div>No History</div>

    return (
        <div>
            KidHistory:
            { purchase }
        </div>
    )
}

const mapStateToProps = reduxState => {
    const { purchase } = reduxState.purchase
    return {
        purchase
    }
}
export default connect(mapStateToProps)(KidHistory)