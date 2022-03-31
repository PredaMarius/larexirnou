/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import { all, call } from 'redux-saga/effects';
import{lookupSagas} from './lookup/lookup.sagas';
import{userSagas} from './user/user.sagas';
import{orderSagas} from './order/order.sagas';

export default function* rootSaga(){
  yield all([
    call(lookupSagas),
    call(userSagas),
    call(orderSagas),
  ])
}