import axios from 'axios'
const { get, post } = axios
const initialState = {
    budget: {},
    isLoading: false,
    isError: false,
    errorMessage: ""
}

const GET_BUDGET = "GET_BUDGET",
    GET_ALL_BUDGET = "GET_ALL_BUDGET",
    POST_BUDGET = "POST_BUDGET",
    UPDATE_BUDGET = "UPDATE_BUDGET",
    DELETE_BUDGET = "DELETE_BUDGET",
    GET_KID_BUDGET = "GET_KID_BUDGET",
    GET_KID_PURCHASE = "GET_KID_PURCHASE",
    POST_KID_BUDGET = "POST_KID_BUDGET",
    UPDATE_KID_BUDGET = "UPDATE_KID_BUDGET"


/* ------------------------------------------- */
/* ----------------- Parents ----------------- */
/* ------------------------------------------- */

export function getBudget(id) {
    return {
        type: GET_BUDGET,
        payload: get(`/api/budget/${id}`)
    }
}

export function getAllBudget(id) {
    return {
        type: GET_ALL_BUDGET,
        payload: get(`/api/budgets/${id}`)
    }
}

export function postBudget(budget, kid_id) {
    return {
        type: POST_BUDGET,
        payload: post('/api/budget', { kid_id, budget })
    }
}

export function updateBudget(budget_id, kid_id, price) {
    return {
        type: UPDATE_BUDGET,
        payload: post(`/api/budget${budget_id}`, { kid_id, price })
    }
}

export function deleteBudget(budget_id) {
    return {
        type: DELETE_BUDGET,
        payload: post(`/api/budget${budget_id}`)
    }
}

/* ------------------------------------------- */
/* ------------------ Kids ------------------- */
/* ------------------------------------------- */

export function getKidBudget(kid_id) {
    return {
        type: GET_KID_BUDGET,
        payload: get(`/api/kid/budget/${kid_id}`)
    }
}

export function getKidPurchase(kid_id) {
    return {
        type: GET_KID_PURCHASE,
        payload: get(`/api/kid/purchase/${kid_id}`)
    }
}

export function postKidBudget(kid_id, budget) {
    return {
        type: POST_KID_BUDGET,
        payload: post(`/api/kid/purchased/${kid_id}`, budget)
    }
}

export function updateKidBudget(purchase_id, budget) {
    return {
        type: UPDATE_KID_BUDGET,
        payload: post(`/api/kid/purchase/${purchase_id}`, budget)
    }
}

export default function budgetReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case GET_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case GET_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case GET_ALL_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case GET_ALL_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case GET_ALL_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case POST_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case POST_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case POST_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case UPDATE_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case UPDATE_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case UPDATE_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case DELETE_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case DELETE_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case DELETE_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case GET_KID_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case GET_KID_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case GET_KID_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case GET_KID_PURCHASE + "_PENDING": return { ...state, isLoading: true, isError: false }
        case GET_KID_PURCHASE + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case GET_KID_PURCHASE + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case POST_KID_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case POST_KID_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case POST_KID_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case UPDATE_KID_BUDGET + "_PENDING": return { ...state, isLoading: true, isError: false }
        case UPDATE_KID_BUDGET + "_FULFILLED": return { ...state, budget: payload.data, isLoading: false }
        case UPDATE_KID_BUDGET + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }

        default: return state
    }
}