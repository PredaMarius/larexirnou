/* eslint-disable linebreak-style */
import {createSelector} from 'reselect';

const selectOrder=state=>state.order;

export const selectOrderCurrentProduct= createSelector(
  [selectOrder],
  order=>order.currentProduct
);

export const selectOrderOrders= createSelector(
  [selectOrder],
  order=>order.orders
);

export const selectOrderCurrentOrder= createSelector(
  [selectOrder],
  order=>order.currentOrder
);

export const selectOrderCurrentItem= createSelector(
  [selectOrder],
  order=>order.currentItem
);

export const selectOrderUpdatedOrder= createSelector(
  [selectOrder],
  order=>order.updatedOrder
);

export const selectOrderDeletedItems= createSelector(
  [selectOrder],
  order=>order.deletedItems
);