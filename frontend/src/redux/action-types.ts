import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store from './store';

const ActionTypes =  {
    SET_GLOBAL_APP_ERROR: "SET_GLOBAL_APP_ERROR",

    // Authentification
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
    AUTH_ERROR: "AUTH_ERROR",
    REMOVE_AUTH_ERROR_MSG: "REMOVE_AUTH_ERROR_MSG",
    LOGOUT: "LOGOUT",

    // Products
    SET_CAROUSEL_SLIDES: "SET_CAROUSEL_SLIDES"
};

export type ActionType = typeof ActionTypes;

export type AppStore = ReturnType<typeof store.getState>;
export type AppAction = ThunkAction<void, AppStore, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppStore, unknown, AnyAction>;

export default ActionTypes;