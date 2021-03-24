import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store from './store';

const ActionTypes =  {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR"
};

export type ActionType = typeof ActionTypes;

export type AppStore = ReturnType<typeof store.getState>;
export type AppAction = ThunkAction<void, AppStore, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppStore, unknown, AnyAction>;

export default ActionTypes;