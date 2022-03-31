/* eslint-disable linebreak-style */
import {
  LOAD_PRODUSE_SUCCESS,
  LOAD_PRODUSE_FAILURE,
  LOAD_MATERIALE_SUCCESS,
  LOAD_MATERIALE_FAILURE, 
  LOAD_PRETURITABELARE_SUCCESS,
  LOAD_PRETURITABELARE_FAILURE,
  LOAD_OPTIONALE_SUCCESS,
  LOAD_OPTIONALE_FAILURE,
  LOAD_CULORI_SUCCESS,
  LOAD_CULORI_FAILURE,
  LOAD_INFORMARI_SUCCESS,
  LOAD_INFORMARI_FAILURE,
  LOAD_INDICATORI_SUCCESS,
  LOAD_INDICATORI_FAILURE,
  LOAD_FIRMA_SUCCESS,
  LOAD_FIRMA_FAILURE,
  LOAD_CURS_SUCCESS,
  LOAD_CURS_FAILURE
} from './lookup.actions.types'

const INITIAL_STATE = {
  produse:[],
  materiale:[],
  preturitabelare:[],
  optionale:[],
  culori:[],
  informari:[],
  indicatori:[],
  firma:[],
  curs:0
};

const lookupReducer=(state = INITIAL_STATE, action)=> {
  switch(action.type){
    //-----------------------CASE PRODUSE
    case LOAD_PRODUSE_SUCCESS:
      return {
        ...state, 
        produse:action.payload
      } 
    case LOAD_PRODUSE_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 

      //-----------------------CASE MATERIALE
    case LOAD_MATERIALE_SUCCESS:
      return {
        ...state, 
        materiale:action.payload,
        error:null
      } 

    case LOAD_MATERIALE_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 
    
      //-----------------------CASE PRETURI TABELARE  
    case LOAD_PRETURITABELARE_SUCCESS:
      return {
        ...state, 
        preturitabelare:action.payload,
        error:null
      } 
    case LOAD_PRETURITABELARE_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 
      
      //-----------------------CASE OPTIONALE 
  
    case LOAD_OPTIONALE_SUCCESS:
      return {
        ...state, 
        optionale:action.payload,
        error:null
      } 

    case LOAD_OPTIONALE_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 
      //-----------------------CASE CULORI 
  
    case LOAD_CULORI_SUCCESS:
      return {
        ...state, 
        culori:action.payload,
        error:null
      } 

    case LOAD_CULORI_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 

      //-----------------------CASE INFORMARI 
  
    case LOAD_INFORMARI_SUCCESS:
      return {
        ...state, 
        informari:action.payload,
        error:null
      } 

    case LOAD_INFORMARI_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 

      //-----------------------CASE INDICATORI
  
    case LOAD_INDICATORI_SUCCESS:
      return {
        ...state, 
        indicatori:action.payload,
        error:null
      } 

    case LOAD_INDICATORI_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 

      //-----------------------CASE FIRMA
  
    case LOAD_FIRMA_SUCCESS:
      return {
        ...state, 
        firma:action.payload,
        error:null
      } 

    case LOAD_FIRMA_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 

      //-----------------------CASE FIRMA
  
    case LOAD_CURS_SUCCESS:
      return {
        ...state, 
        curs:action.payload,
        error:null
      } 

    case LOAD_CURS_FAILURE:
      return {
        ...state, 
        error:action.payload
      } 

    default:
      return state;
  }

};
  
export default lookupReducer;