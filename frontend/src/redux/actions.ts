import { AnyAction } from 'redux';
import ActionTypes, { AppAction } from './action-types';

const serverUrl = "http://localhost:8000";

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

const userLogin = (email: string, password: string): AppAction => 
    ((dispatch) => post("/api/auth/login", {email, password})
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) dispatch({type:ActionTypes.LOGIN_SUCCESS, ...json});
                        else dispatch({type: ActionTypes.LOGIN_ERROR, msg: json.msg});
                    })
                    .catch(error => console.log(error)));

const removeAuthErrorMsg = (): AnyAction => ({type: ActionTypes.REMOVE_AUTH_ERROR_MSG});
const userLogout = (): AnyAction => ({type: ActionTypes.LOGOUT});

const actions = {
    userLogin: userLogin,
    removeAuthErrorMsg: removeAuthErrorMsg,
    userLogout: userLogout
}

export default actions;