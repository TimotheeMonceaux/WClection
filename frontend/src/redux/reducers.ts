import { combineReducers, AnyAction } from 'redux';
import ActionTypes from './action-types';
import { UserProfile } from './store-types';

const userToken = (userToken:string = '', action: AnyAction): string => {
    if (action.type === ActionTypes.LOGIN_SUCCESS)
        return action.token;

    return userToken;
};

const defaultUserProfile = {email: '', firstName: '',middleName: '',lastName: ''};
const userProfile = (userProfile: UserProfile = defaultUserProfile, action: AnyAction): UserProfile => {
    if (action.type === ActionTypes.LOGIN_SUCCESS)
        return {
            email: action.user.email,
            firstName: action.user.firstName,
            middleName: action.user.firstName,
            lastName: action.user.lastName
        };
    
    return userProfile;
}



export default combineReducers({
    userToken,
    userProfile
});