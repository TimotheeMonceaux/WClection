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
                    .then(json => {console.log(json);dispatch({type:ActionTypes.LOGIN_SUCCESS, ...json})})
                    .catch(error => console.log(error)))

const actions = {
    userLogin: userLogin
}

export default actions;