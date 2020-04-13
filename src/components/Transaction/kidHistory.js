import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { getKidPurchase } from '../../redux/budgetReducer'

function KidHistory(props) {
    const [history, setHistory] = useState([])

    useEffect(() => {
        setHistory(props.getKidPurchase(props.id))
    },[props])

    // const purchase = history.map(purchase => {
    //     return (
    //         <div key={purchase.purchase_id}>
    //             <div>
    //                 <h2>{purchase.activity}</h2>
    //                 <lable>${purchase.amount}</lable>
    //             </div>
    //         </div>
    //     )
    // })
    return (
        <div>
            KidHistory:
            {console.log(history)}
        </div>
    )
}

export default connect (null, { getKidPurchase } )(KidHistory)