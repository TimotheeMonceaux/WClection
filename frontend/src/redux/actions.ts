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

function delete_(endpoint: string, body: object): Promise<Response> {
    return fetch(serverUrl + endpoint, 
        {
            method: 'DELETE', 
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
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SESSION_RETRIEVED, ...json}); 
                        dispatch(synchronizeCart());
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const userLogin = (email: string, password: string): AppAction => 
    ((dispatch) => post("/api/auth/login", {email, password})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) {
                            dispatch({type: ActionTypes.LOGIN_SUCCESS, ...json});
                            dispatch(synchronizeCart());
                        }
                        else dispatch({type: ActionTypes.AUTH_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const userSignup = (email: string, password: string, newsletter: boolean): AppAction => 
    ((dispatch) => post("/api/auth/signup", {email, password, newsletter})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) {
                            dispatch({type: ActionTypes.SIGNUP_SUCCESS, ...json});
                            dispatch(synchronizeCart());
                        }
                        else dispatch({type: ActionTypes.AUTH_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const resendSignupEmail = (email: string): AppAction =>
    ((dispatch) => post('/api/auth/resendConfirmEmail', {email})
                    .then(response => response.json())
                    .then(json => {if (!json.success) dispatch({type: ActionTypes.AUTH_ERROR, msg: json.msg})})
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const confirmEmail = (email: string, key: string): AppAction =>
    ((dispatch) => post('/api/auth/confirmEmail', {email, key})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) {
                            dispatch({type: ActionTypes.SIGNUP_CONFIRM_EMAIL_SUCCESS, ...json});
                            dispatch(synchronizeCart());
                        }
                        else dispatch({type: ActionTypes.SIGNUP_CONFIRM_EMAIL_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const forgotPassword = (email: string): AppAction => 
    ((dispatch) => post("/api/auth/forgotPassword", {email})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.FORGOT_PASSWORD_SUCCESS, email});
                        else dispatch({type: ActionTypes.AUTH_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));;

const resendForgotPassword = (email: string): AppAction =>
    ((dispatch) => post('/api/auth/resendForgotPassword', {email})
                    .then(response => response.json())
                    .then(json => {if (!json.success) dispatch({type: ActionTypes.AUTH_ERROR, msg: json.msg})})
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const resetPassword = (email: string, password: string, key: string): AppAction =>
    ((dispatch) => post('/api/auth/resetPassword', {email, password, key})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) {
                            dispatch({type: ActionTypes.RESET_PASSWORD_SUCCESS, ...json});
                            dispatch(synchronizeCart());
                        }
                        else dispatch({type: ActionTypes.RESET_PASSWORD_ERROR, msg: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const removeAuthErrorMsg = (): AnyAction => ({type: ActionTypes.REMOVE_AUTH_ERROR_MSG});

const userLogout = (): AppAction =>
    ((dispatch) => post('/api/auth/logout', {})
                    .then(() => dispatch({type: ActionTypes.LOGOUT}))
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const loadCarouselSlides = (): AppAction =>
    ((dispatch) => get("/api/carousel")
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SET_CAROUSEL_SLIDES, ...json});
                        else dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const loadCollections = (): AppAction =>
    ((dispatch) => get("/api/collection")
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SET_COLLECTIONS, ...json});
                        else dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const synchronizeCart = (): AppAction => 
    ((dispatch) => post("/api/cart/synchronize", {})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) {
                            if (json.cart !== undefined) dispatch({type: ActionTypes.SET_CART, ...json});
                        }
                        else dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const addToCart = (productId: number, quantity: number): AppAction => 
    ((dispatch) => post("/api/cart/item", {productId, quantity})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SET_CART, ...json});
                        else dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const removeFromCart = (productId: number): AppAction => 
    ((dispatch) => delete_("/api/cart/item", {productId})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type: ActionTypes.SET_CART, ...json});
                        else dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: json.msg});
                    })
                    .catch(error => dispatch({type: ActionTypes.SET_GLOBAL_APP_ERROR, error: error.toString()})));

const actions = {
    setGlobalAppError,
    getSession,
    userLogin,
    userSignup,
    resendSignupEmail,
    confirmEmail,
    forgotPassword,
    resendForgotPassword,
    resetPassword,
    removeAuthErrorMsg,
    userLogout,
    loadCarouselSlides,
    loadCollections,
    synchronizeCart,
    addToCart,
    removeFromCart
};

export default actions;