/* eslint-disable linebreak-style */
import {
  SET_CURRENT_PRODUCT, 
  SET_ORDERS_SUCCESS, 
  SET_CURRENT_ORDER,
  SET_CURRENT_ITEM,
  SET_UPDATED_ORDER,
  SET_DELETED_ITEMS 
} from './order.actions.types'

const INITIAL_STATE = {
  // eslint-disable-next-line linebreak-style
  currentProduct:{},
  orders:[],
  currentOrder:{},
  currentItem:{},
  updatedOrder:{},
  deletedItems:[]
};

const orderReducer=(state = INITIAL_STATE, action)=> {
  switch(action.type){
  //-------------------------------CURRENT PRODUCT
    case SET_CURRENT_PRODUCT:
      return {
        ...state, 
        currentProduct:action.payload
      } 
      //-------------------------------ORDERS
    
    case SET_ORDERS_SUCCESS:
      return {
        ...state, 
        orders:action.payload
      } 

      //-------------------------------CURRENT ORDER
    
    case SET_CURRENT_ORDER:
      return {
        ...state, 
        currentOrder:action.payload
      } 
    //-------------------------------CURRENT ITEM
    case SET_CURRENT_ITEM:
      return {
        ...state, 
        currentItem:action.payload
      } 
    //-------------------------------UPDATED ORDER
    case SET_UPDATED_ORDER:
      return {
        ...state, 
        updatedOrder:action.payload
      } 
    //-------------------------------DELETED ITEMS
    case SET_DELETED_ITEMS:
      return {
        ...state, 
        deletedItems:action.payload
      } 
    
    default:
      return state;
  }
};
  
export default orderReducer;