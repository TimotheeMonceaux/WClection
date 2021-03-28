import { combineReducers, AnyAction } from 'redux';
import ActionTypes from './action-types';
import { UserProfile, CarouselSlide } from './store-types';

const globalAppError = (globalAppError = '', action: AnyAction): string => {
    if (action.type === ActionTypes.SET_GLOBAL_APP_ERROR)
        return action.error;

    return globalAppError;
}

const authErrorMsg = (authErrorMsg = '', action: AnyAction): string => {
    if (action.type === ActionTypes.AUTH_ERROR)
        return action.msg;

    if (action.type === ActionTypes.LOGIN_SUCCESS || action.type === ActionTypes.SIGNUP_SUCCESS || action.type === ActionTypes.REMOVE_AUTH_ERROR_MSG)
        return '';

    return authErrorMsg;
}

const userToken = (userToken:string = '', action: AnyAction): string => {
    if (action.type === ActionTypes.LOGIN_SUCCESS || action.type === ActionTypes.SIGNUP_SUCCESS)
        return action.token;

    if (action.type === ActionTypes.LOGOUT)
        return '';

    return userToken;
};

const defaultUserProfile = {email: '', firstName: '', middleName: '', lastName: ''};
const userProfile = (userProfile: UserProfile = defaultUserProfile, action: AnyAction): UserProfile => {
    if (action.type === ActionTypes.LOGIN_SUCCESS || action.type === ActionTypes.SIGNUP_SUCCESS )
        return {
            email: action.user.email,
            firstName: action.user.firstName,
            middleName: action.user.firstName,
            lastName: action.user.lastName
        };

    if (action.type === ActionTypes.LOGOUT)
        return defaultUserProfile;
    
    return userProfile;
}

const carouselSlides = (carouselSlides: Array<CarouselSlide> = [], action: AnyAction): Array<CarouselSlide> => {
    if (action.type === ActionTypes.SET_CAROUSEL_SLIDES)
        return action.slides;

    return carouselSlides;
}

export default combineReducers({
    globalAppError,
    authErrorMsg,
    userToken,
    userProfile,
    carouselSlides
});