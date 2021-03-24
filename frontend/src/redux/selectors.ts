import { createSelector } from 'reselect';

import { AppStore } from './action-types';

const getUserToken = (state: AppStore): string => state.userToken;
const getUserFirstName = (state: AppStore): string => state.userProfile.firstName;
const getUserLastName = (state: AppStore): string => state.userProfile.lastName;

export const isUserLoggedIn = createSelector(getUserToken, (userToken) => userToken !== "");

export const getUserName = createSelector(getUserFirstName, getUserLastName, (firstName, lastName) => `${firstName} ${lastName}`);