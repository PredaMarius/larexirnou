/* eslint-disable linebreak-style */
import {takeLatest, put, all, call} from 'redux-saga/effects';
import {
  SET_ORDERS_START,
} from './order.actions.types'
import {setOrdersSuccess} from './order.actions';
import {enqueueSnackbar, setLoading} from '../other/other.actions';
import {strapi} from '../../strapi/strapi.config';


export function* getOrders({payload:{idFirma,tipProdus}}){
  try{
    yield put(setLoading(true))
    const orders= yield strapi.getEntries('comandas',{idFirma,tipProdus, _limit:-1})
    yield put(setOrdersSuccess(orders))
    yield put(setLoading(false))
  }catch(error){ 
    yield put(setLoading(false))
    yield put(enqueueSnackbar({
      message: `Eroare: nu am putut prelua lista de comenzi.(${error})`,
      options: {
        key: null,
        variant: 'error',
        persist:true,  
      },
    },5000))
  }
}


export function* onSetOrdersStart(){
  yield takeLatest (SET_ORDERS_START,getOrders)
}


export function* orderSagas(){
  yield all([
    call(onSetOrdersStart),
  ])
}
