/* eslint-disable linebreak-style */
// esl./other.actions.typeslinebreak-style
import {
  SET_LOADING,
  SET_ERRORS,
  SET_VARIANT,
  SET_OPEN_EDIT_ITEM,
  RESET_ERRORS,
  SET_CONFIRMATION,
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
  SET_OVERLAY_SPINNER,
  SET_DONE
} from './other.actions.types'

const INITIAL_STATE = {
  loading:false,
  done:false,
  errors:{
    m1m:{},
    m2m:{},
    m3m:{},
    m4m:{},
    m5m:{},
    m6m:{},
    m7m:{},
    m8m:{},
    m9m:{},
    m10m:{},
    m11m:{},
    m12m:{},
    m13m:{},
    m14m:{},
    m15m:{},
    m16m:{},
    m17m:{},
    m18m:{},
    m19m:{},
    m20m:{},
    m21m:{},
    m22m:{},
    m23m:{},
    m24m:{},
    m25m:{},
  },
  variant:'success',
  openEditItem:{open:false, title:'',add:true},
  confirmation:false,
  notifications:[],
  overlaySpinner:false
};

const otherReducer=(state = INITIAL_STATE, action)=> {
  switch(action.type){

    case SET_LOADING:
      return {
        ...state, 
        loading:action.payload
      } 
    
    case SET_DONE:
      return {
        ...state, 
        done:action.payload
      } 
    
    case SET_ERRORS:
      return {
        ...state, 
        errors:action.payload
      } 
    
    case SET_VARIANT:
      return {
        ...state, 
        variant:action.payload
      } 
    
    case SET_OPEN_EDIT_ITEM:
      return {
        ...state, 
        openEditItem:action.payload
      }
    
    case RESET_ERRORS:
      return {
        ...state, errors:INITIAL_STATE.errors
      }

    case SET_CONFIRMATION:
      return {
        ...state, 
        confirmation:action.payload
      }
      //-------------------------------CASE NOTIFICATIONS
    case ENQUEUE_SNACKBAR:
      return {
        ...state, 
        notifications:[
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      } 

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification => (
          (action.dismissAll || notification.key === action.key)
            ? { ...notification, dismissed: true }
            : { ...notification }
        )),
      }


    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      };

    case SET_OVERLAY_SPINNER:
      return {
        ...state, 
        overlaySpinner:action.payload
      };


    default:
      return state;
  }
};
  
export default otherReducer;