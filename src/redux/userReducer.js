import { get, post } from "axios";
const initialState = {
  user: {},
  kids: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const CHECK_USER = "CHECK_USER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
  ADD_KIDS = "ADD_KIDS",
  KID_REGISTER = "REGISTER";

export function checkUser() {
  return {
    type: CHECK_USER,
    payload: get("/auth/check"),
  };
}

export function login(email, password) {
  return {
    type: LOGIN,
    payload: post("/auth/login", { email, password }),
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: post("/auth/logout"),
  };
}

export function register(register) {
  return {
    type: REGISTER,
    payload: post("/auth/register", register),
  };
}

export function addKid(kid) {
  return {
    type: ADD_KIDS,
    payload: [...kid],
  };
}

export function kidRegister(register) {
  return {
    type: KID_REGISTER,
    payload: post(`/auth/kid/regiseter`, register),
  };
}

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHECK_USER + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case CHECK_USER + "_FULFILLED":
      return { ...state, user: payload.data, isLoading: false };
    case CHECK_USER + "_REJECTED":
      return {
        ...state,
        user: {},
        isLoading: false,
        isError: true,
        errorMessage: payload.response.data,
      };
    case LOGIN + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case LOGIN + "_FULFILLED":
      return { ...state, user: payload.data, isLoading: false };
    case LOGIN + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload.response.data,
      };
    case LOGOUT + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case LOGOUT + "_FULFILLED":
      return { ...state, ...initialState };
    case LOGOUT + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload.response.data,
      };
    case REGISTER + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case REGISTER + "_FULFILLED":
      return { ...state, user: payload.data, isLoading: false };
    case REGISTER + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload.response.data,
      };
    case ADD_KIDS + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case ADD_KIDS + "_FULFILLED":
      return { ...state, kids: payload.data, isLoading: false };
    case ADD_KIDS + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "Cannot add kids",
      };
    case KID_REGISTER + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case KID_REGISTER + "_FULFILLED":
      return { ...state, user: payload.data, isLoading: false };
    case KID_REGISTER + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload.response.data,
      };

    default:
      return state;
  }
}
