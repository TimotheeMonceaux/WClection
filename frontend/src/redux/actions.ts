import { AnyAction } from 'redux';
import ActionTypes, { AppAction } from './action-types';

const serverUrl = "http://localhost:8000";

function get(endpoint: string): Promise<Response> {
    return fetch(serverUrl + endpoint);
}

function post(endpoint: string, body: object): Promise<Response> {
    return fetch(serverUrl + endpoint, 
        {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        });
}

const setGlobalAppError = (error: string): AnyAction => ({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error});

const userLogin = (email: string, password: string): AppAction => 
    ((dispatch) => post("/api/auth/login", {email, password})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.LOGIN_SUCCESS, ...json});
                        else dispatch({type: ActionTypes.AUTH_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: JSON.stringify(error)})));

const userSignup = (email: string, password: string, newsletter: boolean): AppAction => 
    ((dispatch) => post("/api/auth/signup", {email, password, newsletter})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SIGNUP_SUCCESS, ...json});
                        else dispatch({type: ActionTypes.AUTH_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SIGNUP_CONFIRM_EMAIL_ERROR, error: JSON.stringify(error)})));

const confirmEmail = (email: string, key: string): AppAction =>
    ((dispatch) => get(`/api/auth/confirmEmail?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}`)
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SIGNUP_CONFIRM_EMAIL_SUCCESS, ...json});
                        else dispatch({type: ActionTypes.SIGNUP_CONFIRM_EMAIL_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: JSON.stringify(error)})));

const removeAuthErrorMsg = (): AnyAction => ({type: ActionTypes.REMOVE_AUTH_ERROR_MSG});
const userLogout = (): AnyAction => ({type: ActionTypes.LOGOUT});

const loadCarouselSlides = (): AppAction =>
    ((dispatch) => get("/api/carousel")
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SET_CAROUSEL_SLIDES, ...json});
                        else dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: JSON.stringify(error)})));

const loadCollections = (): AppAction =>
    ((dispatch) => get("/api/collection")
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SET_COLLECTIONS, ...json});
                        else dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: JSON.stringify(error)})));

const addToCart = (productId: number, quantity: number): AnyAction => ({type: ActionTypes.ADD_TO_CART, productId, quantity});
const removeFromCart = (productId: number): AnyAction => ({type: ActionTypes.REMOVE_FROM_CART, productId});

const actions = {
    setGlobalAppError,
    userLogin,
    userSignup,
    confirmEmail,
    removeAuthErrorMsg,
    userLogout,
    loadCarouselSlides,
    loadCollections,
    addToCart,
    removeFromCart
};

export default actions;