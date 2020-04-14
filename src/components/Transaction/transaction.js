import React, { Component } from 'react'
import { connect } from 'react-redux'
import { convertToDollor } from '../../math/convert'

class Transaction extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
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
                        <label>${convertToDollor(this.props.amount)}</label>
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
    const { user } = reduxState.user
    return {
        user,
    }
}

export default connect(mapStateToProps)(Transaction)