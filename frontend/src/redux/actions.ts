import { AnyAction } from 'redux';
import ActionTypes, { AppAction } from './action-types';

const serverUrl = window.location.hostname === "localhost" ? "http://localhost:8000" : "http://wclection.com";

function get(endpoint: string): Promise<Response> {
    return fetch(serverUrl + endpoint, {
        method: 'GET',
        credentials: 'include'
    });
}

function post(endpoint: string, body: object): Promise<Response> {
    return fetch(serverUrl + endpoint, 
        {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        });
}

const setGlobalAppError = (error: string): AnyAction => ({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error});

const getSession = (): AppAction =>
    ((dispatch) => get('/api/auth/session')
                    .then(response => response.json())
                    .then(json => {if (json.success) dispatch({type: ActionTypes.SESSION_RETRIEVED, ...json})})
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: JSON.stringify(error)})));

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

const resendSignupEmail = (email: string): AppAction =>
    ((dispatch) => post('/api/auth/resendEmail', {email})
                    .then(response => response.json())
                    .then(json => {if (!json.success) dispatch({type: ActionTypes.AUTH_ERROR, msg: json.msg})})
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: JSON.stringify(error)})))

const confirmEmail = (email: string, key: string): AppAction =>
    ((dispatch) => post('/api/auth/confirmEmail', {email, key})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SIGNUP_CONFIRM_EMAIL_SUCCESS, ...json});
                        else dispatch({type: ActionTypes.SIGNUP_CONFIRM_EMAIL_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: JSON.stringify(error)})));

const removeAuthErrorMsg = (): AnyAction => ({type: ActionTypes.REMOVE_AUTH_ERROR_MSG});
const userLogout = (): AppAction =>
    ((dispatch) => post('/api/auth/logout', {})
                    .then(() => dispatch({type: ActionTypes.LOGOUT}))
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: JSON.stringify(error)})));

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
    getSession,
    userLogin,
    userSignup,
    resendSignupEmail,
    confirmEmail,
    removeAuthErrorMsg,
    userLogout,
    loadCarouselSlides,
    loadCollections,
    addToCart,
    removeFromCart
};

export default actions;