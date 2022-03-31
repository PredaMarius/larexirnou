/* eslint-disable linebreak-style */
import {takeLatest, put, all, call} from 'redux-saga/effects';
import {
  SET_CURRENT_USER_START,
  SET_DELIVERY_ADDRESSES_START,
} from './user.actions.types'
import {setCurrentUserSuccess, setDeliveryAddressesSuccess} from './user.actions';
import {enqueueSnackbar, setLoading} from '../other/other.actions';
import {strapi} from '../../strapi/strapi.config';
import {setToken, adrese, setUser} from '../../strapi/strapi.utils';
import { push } from 'react-router-redux';


export function* getUser({payload:{email,password}}){
  try{
    yield put(setLoading(true))
    const response= yield strapi.login(email, password)
    
    yield setToken(response)
    yield setUser(response.user)
    yield put(setCurrentUserSuccess(response.user))

    //const filters = {idFirma: response.user.idFirma.id}
    const  res= yield strapi.getEntries('adresalivrares',{idFirma: response.user.idFirma.id})
    yield put(setDeliveryAddressesSuccess(adrese(res)))
    //yield put(setLoading(false))
    yield put(push('/'));
  }catch(error){ 
    yield put(setLoading(false))
    yield put(enqueueSnackbar({
      message: `Datele introduse nu corespund unui utilizator valid.(${error})`,
      options: {
        key: null,
        variant: 'error',
      },
    },5000))
  }
}
 
export function* getDeliveryAddresses({payload:idFirma}){
  try{
    yield put(setLoading(true))
    const adreseLivrare= yield strapi.getEntries('adresalivrares',{idFirma})
    yield put(setDeliveryAddressesSuccess(adrese(adreseLivrare)))
    //yield put(setLoading(false))
  }catch(error){ 
    yield put(setLoading(false))
    yield put(enqueueSnackbar({
      message: `Eroare : nu am putut prelua adresele de livrare ale firmei.(${error})`,
      options: {
        key: null,
        variant: 'error',
        persist:true,  
      },
    },5000))
  }
}

export function* onSetCurrentUserStart(){
  yield takeLatest (SET_CURRENT_USER_START,getUser)
}

export function* onSetDeliveryAddressesStart(){
  yield takeLatest (SET_DELIVERY_ADDRESSES_START,getDeliveryAddresses)
}




export function* userSagas(){
  yield all([
    call(onSetCurrentUserStart),
    call(onSetDeliveryAddressesStart),
  ])
}
