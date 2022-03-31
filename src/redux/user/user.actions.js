/* eslint-disable linebreak-style */

import { 
  SET_CURRENT_USER_START,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_FAILURE,
  SET_DELIVERY_ADDRESSES_START,
  SET_DELIVERY_ADDRESSES_SUCCESS,
  SET_DELIVERY_ADDRESSES_FAILURE,
} from './user.actions.types'

//------------------------------------USER
export const setCurrentUserStart =(emailAndPassword)=> ({
  type:SET_CURRENT_USER_START,
  payload:emailAndPassword
});
export const setCurrentUserSuccess =(user)=> ({
  type:SET_CURRENT_USER_SUCCESS,
  payload:user
});
export const setCurrentUserFailure =()=> ({
  type:SET_CURRENT_USER_FAILURE,
});
 
//------------------------------------ADRESE LIVRARE
export const setDeliveryAddressesStart =(idFirma)=> ({
  type:SET_DELIVERY_ADDRESSES_START,
  payload:idFirma
});
export const setDeliveryAddressesSuccess =(deliveryAddresses)=> ({
  type:SET_DELIVERY_ADDRESSES_SUCCESS,
  payload:deliveryAddresses
});
export const setDeliveryAddressesFailure =()=> ({
  type:SET_DELIVERY_ADDRESSES_FAILURE,
  payload:[]
});
