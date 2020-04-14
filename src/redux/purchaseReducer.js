import axios from 'axios'
const { get, post, put } = axios
const initialState = {
    purchase: {},
    isLoading: false,
    isError: false,
    errorMessage: ""
}

const GET_PURCHASE = "GET_PURCAHSE",
    POST_PURCAHSE = "POST_PURCHASE",
    UPDATE_PURCAHSE = "UPDATE_PURCHASE"

export function getPurchase(id) {
    return {
        type: GET_PURCHASE,
        payload: get(`/api/kid/purchases/${id}`)
    }
}

export function postPurchase(id, purchase) {
    return {
        type: POST_PURCAHSE,
        payload: post(`/api/kid/purchased/${id}`, purchase)
    }
}

export function updatePurchase(purchase_id, purchase) {
    return {
        type: UPDATE_PURCAHSE,
        payload: put(`/api/kid/purchased/edit/${purchase_id}`, purchase)
    }
}

export default function purchaseReducer(state = initialState, action) {
    const { type, payload } = action 

    switch(type) {
        case GET_PURCHASE + "_PENDING": return { ...state, isLoading: true, isError: false }
        case GET_PURCHASE + "_FULFILLED": return { ...state, purchase: payload.data, isLoading: false }
        case GET_PURCHASE + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case POST_PURCAHSE + "_PENDING": return { ...state, isLoading: true, isError: false }
        case POST_PURCAHSE + "_FULFILLED": return { ...state, purchase: payload.data, isLoading: false }
        case POST_PURCAHSE + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }
        case UPDATE_PURCAHSE + "_PENDING": return { ...state, isLoading: true, isError: false }
        case UPDATE_PURCAHSE + "_FULFILLED": return { ...state, purchase: payload.data, isLoading: false }
        case UPDATE_PURCAHSE + "_REJECTED": return { ...state, isLoading: false, isError: true, errorMessage: payload.response.data }

        default: return state
    }
}