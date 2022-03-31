/* eslint-disable linebreak-style */
import {createSelector} from 'reselect';

const selectUser=state=>state.user;

export const selectCurrentUser= createSelector(
  [selectUser],
  user=>user.currentUser
);

export const selectDeliveryAddresses= createSelector(
  [selectUser],
  user=>user.deliveryAddresses
);