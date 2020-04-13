import React, { Component } from 'react'
import { connect } from 'react-redux'

class Transaction extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const amount = '0.00'
        return(
            <section style={{width: '100vw', boxSizing: 'border-box', display: 'flex', justifyContent:'space-around', alignItems:'center'}}>
                <div style={{width: '80%', boxShadow: 'black 0 0 5px', margin: "20px"}}>
                    <div>
                        <h2>{this.props.firstName}</h2>
                        <div>
                           <img src='' alt=''/>
                        </div>
                    </div>
                    <div style={{fontSize: '3rem'}}>
                        <label>$</label>{amount}
                    </div>
                    <div>
                        <button>Info</button>
                        <button>Add Budget</button>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = reduxState => {
    const { user, budget } = reduxState
    return {
        user,
        budget
    }
}

export default connect(mapStateToProps, {})(Transaction)