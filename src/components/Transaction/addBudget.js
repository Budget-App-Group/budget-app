import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { updateBudget } from '../../redux/budgetReducer'
import { add } from '../../math/math';

function AddBudget(props) {
    const [amount, setAmount] = useState(0)
    const [kid, setKid] = useState({})

    useEffect(() => {
        if(!props.user.parentsId) props.history.push('/')
        getData(props.match.params.id)
    }, [props.match])

    const getData = budget_id => {
        axios.get(`/api/kid/${budget_id}`).then(res => {
            setKid(res.data)
        }).catch(err => console.log(err))
    }
    const cancelClicked = () => {
        props.history.goBack()
    }

    const submitClicked = event => {
        event.preventDefault()
        if(amount) {
            props.updateBudget(props.match.params.id, add(kid.balance, (amount * 100)))
            props.history.goBack()
        }
    }

    return (
        <div>
            <h1>Add Budget</h1>
            <form onSubmit={submitClicked}>
                <div>
                    <h2>{kid.first_name}</h2>
                </div>
                <div>
                    <label>$</label><input type='number' onChange={event => setAmount(event.target.value)}/>
                </div>
                <button type='button' onClick={cancelClicked}>cancel</button>
                <button type='submit'>add</button>
            </form>
            
        </div>
    )
}

const mapStateToProps = reduxState => {
    const { user } = reduxState.user
    return {
        user
    }
}

export default connect(mapStateToProps, { updateBudget })(AddBudget)