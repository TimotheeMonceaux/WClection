import { createSelector } from 'reselect';
import _ from 'lodash';

import { AppStore } from './action-types';
import { CarouselSlide, Product, Collection } from './store-types';

const getUserEmail = (state: AppStore): string => state.userProfile.email;
const getUserFirstName = (state: AppStore): string => state.userProfile.firstName;
const getUserLastName = (state: AppStore): string => state.userProfile.lastName;
const getCarouselSlides = (state: AppStore): Array<CarouselSlide> => state.carouselSlides;
const getProducts = (state: AppStore): {[id: number]: Product} => state.products;
const getCollections = (state: AppStore): Array<Collection> => state.collections;
const getCart = (state: AppStore): {[productId: number]: number} => state.cart;

export const isUserLoggedIn = createSelector(getUserEmail, (userEmail) => userEmail !== "");

export const getUserName = createSelector(getUserFirstName, getUserLastName, getUserEmail, 
    (firstName, lastName, email) => ((firstName === undefined || lastName === undefined) ? email : `${firstName} ${lastName}`));

export const areCarouselSlidesLoaded = createSelector(getCarouselSlides, slides => slides.length > 0);

export const areCollectionsLoaded = createSelector(getCollections, collections => collections.length > 0);

export const getProduct = createSelector(getProducts, (products) => _.memoize((key: number): Product => products[key]));

export const getCartSize = createSelector(getCart, cart => Object.values(cart).reduce((a, b) => a + b, 0));

export const getCartItems = createSelector(getCart, cart => Object.keys(cart).map(id => parseInt(id)));

const floor2Dec = (a: number) => Math.floor(a * 100) / 100;

export const getCartValue = createSelector(getCart, getProducts, (cart, products) => {
        if (_.isEmpty(cart)) return 0;
        let sortedCart = Object.keys(cart).map(key => parseInt(key))
                                          .sort((a, b) => -1 * (products[a].price - products[b].price));

        let halfOfFirstItemPrice = floor2Dec(products[sortedCart[0]].price / 2);

        return sortedCart.map(id => cart[id] * products[id].price)
                         .reduce((a, b) => floor2Dec(a + b / 2), halfOfFirstItemPrice)
    });

export const getVoucherValue = createSelector(getCart, getProducts, getCartValue, 
    (cart, products, cartValue) => floor2Dec(Object.keys(cart).map(key => parseInt(key))
                                                     .map(id => cart[id] * products[id].price)
                                                     .reduce((a, b) => a + b, 0) - cartValue));