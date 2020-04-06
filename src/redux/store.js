import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './userReducer'
import budgetReducer from './budgetReducer'

const rootReducers = combineReducers({
    user: userReducer,
    budget: budgetReducer
})

export default createStore(rootReducers, composeWithDevTools(applyMiddleware(promiseMiddleware)))