import { combineReducers, AnyAction } from 'redux';
import _ from 'lodash';

import ActionTypes from './action-types';
import { UserProfile, CarouselSlide, Product, Collection } from './store-types';

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
    if (action.type === ActionTypes.ADD_TO_CART) 
        return {...cart, [action.productId]: (cart[action.productId] ?? 0) + action.quantity};
    

    if (action.type === ActionTypes.REMOVE_FROM_CART)
        return _.omit(cart, action.productId);

    return cart;
}

export default combineReducers({
    globalAppError,
    authErrorMsg,
    userToken,
    userProfile,
    carouselSlides,
    collections,
    products,
    cart
});