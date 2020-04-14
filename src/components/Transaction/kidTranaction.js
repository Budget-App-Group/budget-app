import React, { Component } from 'react';
import { convertToDollor } from '../../math/convert'

class KidTransaction extends Component {
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
                        <h2>Amount:</h2>
                        <div style={{fontSize: '3rem'}}>
                            {!isNaN(this.props.amount) ? (
                                <label>${convertToDollor(this.props.amount)}</label>
                            ) : (
                                <label>$0.00</label>
                            )}
                        </div>
                    </div>
                    <div >
                        {/* <label>$</label>{amount} */}
                    </div>
                </div>
            </section>
        )
    }
}

export default KidTransaction