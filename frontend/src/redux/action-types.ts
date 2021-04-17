import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store from './store';

const ActionTypes =  {
    SET_GLOBAL_APP_ERROR: "SET_GLOBAL_APP_ERROR",

    // Authentification
    SESSION_RETRIEVED: "SESSION_RETRIEVED",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
    SIGNUP_CONFIRM_EMAIL_SUCCESS: "SIGNUP_CONFIRM_EMAIL_SUCCESS",
    SIGNUP_CONFIRM_EMAIL_ERROR: "SIGNUP_CONFIRM_EMAIL_ERROR",
    AUTH_ERROR: "AUTH_ERROR",
    REMOVE_AUTH_ERROR_MSG: "REMOVE_AUTH_ERROR_MSG",
    LOGOUT: "LOGOUT",

    // Products
    SET_CAROUSEL_SLIDES: "SET_CAROUSEL_SLIDES",
    SET_COLLECTIONS: "SET_COLLECTIONS",

    // Cart
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART"
};

export type ActionType = typeof ActionTypes;

export type AppStore = ReturnType<typeof store.getState>;
export type AppAction = ThunkAction<void, AppStore, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppStore, unknown, AnyAction>;

export default ActionTypes;