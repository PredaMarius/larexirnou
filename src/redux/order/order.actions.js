/* eslint-disable linebreak-style */
import {SET_CURRENT_PRODUCT,SET_CURRENT_ORDER, SET_CURRENT_ITEM, SET_UPDATED_ORDER, SET_DELETED_ITEMS, SET_ORDERS_START, SET_ORDERS_SUCCESS   } from './order.actions.types'

export const setCurrentProduct =(product)=> ({
  type:SET_CURRENT_PRODUCT,
  payload:product
});

export const setOrdersStart =(idFirmaAndTipProdus)=> ({
  type:SET_ORDERS_START,
  payload:idFirmaAndTipProdus
});

export const setOrdersSuccess =(orders)=> ({
  type:SET_ORDERS_SUCCESS,
  payload:orders
});

export const setCurrentOrder =(order)=> ({
  type:SET_CURRENT_ORDER,
  payload:order
});

export const setCurrentItem =(item)=> ({
  type:SET_CURRENT_ITEM,
  payload:item
});

export const setUpdatedOrder =(order)=> ({
  type:SET_UPDATED_ORDER,
  payload:order
});

export const setDeletedItems =(items)=> ({
  type:SET_DELETED_ITEMS,
  payload:items
});