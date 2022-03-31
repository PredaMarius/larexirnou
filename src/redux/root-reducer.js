/* eslint-disable linebreak-style */
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import orderReducer from './order/order.reducer';
import lookupReducer from './lookup/lookup.reducer';
import otherReducer from './other/other.reducer';

const persistConfig={
  key:'root',
  storage,
  whitelist:['user', 'order'],
}



const rootReducer=combineReducers({
  user:userReducer,
  order:orderReducer,
  lookup:lookupReducer,
  other:otherReducer
})

export default persistReducer(persistConfig, rootReducer);