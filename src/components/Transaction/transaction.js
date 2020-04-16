import React, { Component } from 'react'
import { connect } from 'react-redux'
import { convertToDollor } from '../../math/convert'
import { sub } from '../../math/math'

import './transaction.scss'

class Transaction extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <section className='admin-kid-item-section'>
                <div className='admin-kid-item'>
                    <div className='admin-kid-header'>
                        <div className='admin-kid-name'>
                            <h2>{this.props.firstName}</h2>
                        </div>
                        <div className='admin-kid-pic'>
                           <img src='' alt=''/>
                        </div>
                    </div>
                    <div className='admin-kid-amount-boc'>
                        <span className='admin-kid-amount'>${convertToDollor(sub(this.props.balance, this.props.amount))}</span>
                    </div>
                    <div className='admin-kid-input-buttons'>
                        <button className='admin-kid-button' onClick={() => this.props.infoFN(this.props.kidId, this.props.firstName)}>Info</button>
                        <button className='admin-kid-button' onClick={() => this.props.addFN(this.props.budgetID)}>Budget</button>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = reduxState => {
    const { user } = reduxState.user
    return {
        user,
    }
}

export default connect(mapStateToProps)(Transaction)