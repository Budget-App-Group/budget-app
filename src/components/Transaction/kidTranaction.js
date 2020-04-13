import React, { Component } from 'react';

class KidTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: 0,
        }
    }

    componentDidMount() {
        console.log("Amount: " + this.props.amount)
    }

    render() {
        const amount = '0.00'
        return(
            <section style={{width: '100vw', boxSizing: 'border-box', display: 'flex', justifyContent:'space-around', alignItems:'center'}}>
                <div style={{width: '80%', boxShadow: 'black 0 0 5px', margin: "20px"}}>
                    <div>
                        <h2>Amount:</h2>
                        <div style={{fontSize: '3rem'}}>
                            {/* <label>$</label>{this.props.amount} */}
                        </div>
                    </div>
                    <div >
                        <label>$</label>{amount}
                    </div>
                </div>
            </section>
        )
    }
}

export default KidTransaction