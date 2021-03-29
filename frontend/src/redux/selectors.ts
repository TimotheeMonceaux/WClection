import { createSelector } from 'reselect';

import { AppStore } from './action-types';
import { CarouselSlide, Collection } from './store-types';

const getUserToken = (state: AppStore): string => state.userToken;
const getUserEmail = (state: AppStore): string => state.userProfile.email;
const getUserFirstName = (state: AppStore): string => state.userProfile.firstName;
const getUserLastName = (state: AppStore): string => state.userProfile.lastName;
const getCarouselSlides = (state: AppStore): Array<CarouselSlide> => state.carouselSlides;
const getCollections = (state: AppStore): Array<Collection> => state.collections;

export const isUserLoggedIn = createSelector(getUserToken, (userToken) => userToken !== "");

export const getUserName = createSelector(getUserFirstName, getUserLastName, getUserEmail, 
    (firstName, lastName, email) => ((firstName === undefined || lastName === undefined) ? email : `${firstName} ${lastName}`));

export const areCarouselSlidesLoaded = createSelector(getCarouselSlides, slides => slides.length > 0);

export const areCollectionsLoaded = createSelector(getCollections, collections => collections.length > 0);