import { get, post } from 'axios'
const initialState = {
    budget: {},
    isLoading: false,
    isError: false,
    errorMessage: ""
}

const GET_BUDGET = "GET_BUDGET",
    POST_BUDGET = "POST_BUDGET",
    GET_KID_BUDGET = "GET_KID_BUDGET",
    POST_KID_BUDGET = "POST_KID_BUDGET"


export function getBudget() {
    return {
        type: GET_BUDGET,
        payload: get('/api/budget')
    }
}

export function postBudget(budget) {
    return {
        type: POST_BUDGET,
        payload: post('/api/budget')
    }
}

export function getKidBudget() {
    return {
        type: GET_KID_BUDGET,
        playload: get('/api/kid/budget')
    }
}

export function postKidBudget(budget) {
    return {
        type: POST_KID_BUDGET,
        playload: post('/api/kid/purchased', { budget })
    }
}

export default function budgetReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case GET_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case GET_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case GET_KID_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case GET_KID_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case GET_KID_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }

        default: return state
    }
}