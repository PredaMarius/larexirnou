/* eslint-disable linebreak-style */
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


export const setLoading =(boll)=> ({
  type:SET_LOADING,
  payload:boll
});

export const setDone =(boll)=> ({
  type:SET_DONE,
  payload:boll
});

export const setErrors =(errors)=> ({
  type:SET_ERRORS,
  payload:errors
});

export const setVariant =(variant)=> ({
  type:SET_VARIANT,
  payload:variant
});

export const setOpenEditItem =(bool)=> ({
  type:SET_OPEN_EDIT_ITEM,
  payload:bool
});

export const resetErrors =()=> ({
  type:RESET_ERRORS,
});


export function setErrorsAsync(error){
  return dispatch=>{
    setTimeout(() => {
      dispatch(setErrors(error));
    }, 50);
  }
}

export const setConfirmation =(bool)=> ({
  type:SET_CONFIRMATION,
  payload:bool
});


export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key,
});

export const setOverlaySpinner =(bool)=> ({
  type:SET_OVERLAY_SPINNER,
  payload:bool
});
