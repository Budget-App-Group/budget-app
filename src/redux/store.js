import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './userReducer'
import budgetReducer from './budgetReducer'
import purchaseReducer from './purchaseReducer'

const rootReducers = combineReducers({
    user: userReducer,
    budget: budgetReducer,
    purchase: purchaseReducer
})

export default createStore(rootReducers, composeWithDevTools(applyMiddleware(promiseMiddleware)))