import React, { Component } from 'react'
import { connect } from 'react-redux'

class Transaction extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (this.props.user.isAdmin) {

        }
        else {

        }
    }

    transactionAdmin() {
        if (this.props.user.isAdmin) {

        }
    }

    render() {
        return (
            <div>
                
            </div>
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