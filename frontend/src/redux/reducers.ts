import { combineReducers, AnyAction } from 'redux';

import ActionTypes from './action-types';
import { UserProfile, CarouselSlide, Product, Collection } from './store-types';

const globalAppError = (globalAppError = '', action: AnyAction): string => {
    if (action.type === ActionTypes.SET_GLOBAL_APP_ERROR)
        return action.error;

    return globalAppError;
}

const authErrorMsg = (authErrorMsg = '', action: AnyAction): string => {
    if (action.type === ActionTypes.AUTH_ERROR || action.type === ActionTypes.SIGNUP_CONFIRM_EMAIL_ERROR || action.type === ActionTypes.RESET_PASSWORD_ERROR)
        return action.msg;

    if (action.type === ActionTypes.LOGIN_SUCCESS || action.type === ActionTypes.SIGNUP_SUCCESS || action.type === ActionTypes.SIGNUP_CONFIRM_EMAIL_SUCCESS ||action.type === ActionTypes.FORGOT_PASSWORD_SUCCESS || action.type === ActionTypes.RESET_PASSWORD_SUCCESS || action.type === ActionTypes.REMOVE_AUTH_ERROR_MSG)
        return '';

    return authErrorMsg;
}

const defaultUserProfile = {email: '', firstName: '', middleName: '', lastName: ''};
const userProfile = (userProfile: UserProfile = defaultUserProfile, action: AnyAction): UserProfile => {
    if (action.type === ActionTypes.LOGIN_SUCCESS || action.type === ActionTypes.SIGNUP_SUCCESS || action.type === ActionTypes.SESSION_RETRIEVED || action.type === ActionTypes.SIGNUP_CONFIRM_EMAIL_SUCCESS || action.type === ActionTypes.RESET_PASSWORD_SUCCESS)
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

const confirmEmailStatus = (status: boolean | null = null, action: AnyAction): boolean | null => {
    if (action.type === ActionTypes.SIGNUP_CONFIRM_EMAIL_SUCCESS)
        return true;
    
    if (action.type === ActionTypes.SIGNUP_CONFIRM_EMAIL_ERROR)
        return false;

    return status;
}

const forgotPasswordEmail = (email: string = '', action: AnyAction): string => {
    if (action.type === ActionTypes.FORGOT_PASSWORD_SUCCESS)
        return action.email;

    return email;
}

const resetPasswordStatus = (status: boolean | null = null, action: AnyAction): boolean | null => {
    if (action.type === ActionTypes.RESET_PASSWORD_SUCCESS)
        return true;
    
    if (action.type === ActionTypes.RESET_PASSWORD_ERROR)
        return false;

    return status;
}

const carouselSlides = (carouselSlides: Array<CarouselSlide> = [], action: AnyAction): Array<CarouselSlide> => {
    if (action.type === ActionTypes.SET_CAROUSEL_SLIDES)
        return action.slides;

    return carouselSlides;
}

const products = (products: {[id: number]: Product} = {}, action: AnyAction): {[id: number]: Product} => {
    if (action.type === ActionTypes.SET_COLLECTIONS)
        return action.collections.reduce((acc: Product[], c: {products: Product[]}) => acc.concat(c.products), [])
                                 .reduce((acc: {[id: number]: Product}, p: Product) => ({...acc, [p.id]: p}), {});
    
    return  products;
}

const collections = (collections: Array<Collection> = [], action: AnyAction): Array<Collection> => {
    if (action.type === ActionTypes.SET_COLLECTIONS)
        return action.collections.map((c: any) => ({name: c.name, products: c.products.map((p: Product) => p.id)}));

    return collections;
}

const cart = (cart: {[productId: number]: number} = [], action: AnyAction): {[productId: number]: number} => {
    if (action.type === ActionTypes.SET_CART) 
        return action.cart;

    return cart;
}

export default combineReducers({
    globalAppError,
    authErrorMsg,
    userProfile,
    confirmEmailStatus,
    forgotPasswordEmail,
    resetPasswordStatus,
    carouselSlides,
    collections,
    products,
    cart
});