import { get, post } from "axios";
const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const CHECK_USER = "CHECK_USER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER";

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

    default:
      return state;
  }
}
