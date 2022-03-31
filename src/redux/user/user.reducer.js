/* eslint-disable linebreak-style */
import { 
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_FAILURE,
  SET_DELIVERY_ADDRESSES_SUCCESS,
  SET_DELIVERY_ADDRESSES_FAILURE,
} from './user.actions.types'

const INITIAL_STATE = {
  currentUser:0,
  deliveryAddresses: []
};

const userReducer=(state = INITIAL_STATE, action)=> {
  switch(action.type){
    //---------------------------CASE USER 
    
    case SET_CURRENT_USER_SUCCESS:
      return{
        ...state, 
        currentUser:action.payload
      }
    case SET_CURRENT_USER_FAILURE:
      return{
        ...state, 
        currentUser:0
      }

      //---------------------------CASE DELIVERY ADDRESSES
   
    case SET_DELIVERY_ADDRESSES_SUCCESS:
      return{
        ...state, 
        deliveryAddresses:action.payload
      }  
    case SET_DELIVERY_ADDRESSES_FAILURE:
      return{
        ...state, 
        deliveryAddresses:[]
      }  

    default:
      return state;
  }
};
  
export default userReducer;