/* eslint-disable linebreak-style */
import {
  LOAD_PRODUSE_START,
  LOAD_PRODUSE_SUCCESS,
  LOAD_PRODUSE_FAILURE,
  LOAD_MATERIALE_START,
  LOAD_MATERIALE_SUCCESS,
  LOAD_MATERIALE_FAILURE, 
  LOAD_PRETURITABELARE_START,
  LOAD_PRETURITABELARE_SUCCESS,
  LOAD_PRETURITABELARE_FAILURE,
  LOAD_OPTIONALE_START,
  LOAD_OPTIONALE_SUCCESS,
  LOAD_OPTIONALE_FAILURE,
  LOAD_CULORI_START,
  LOAD_CULORI_SUCCESS,
  LOAD_CULORI_FAILURE,
  LOAD_INFORMARI_START,
  LOAD_INFORMARI_SUCCESS,
  LOAD_INFORMARI_FAILURE,
  LOAD_INDICATORI_START,
  LOAD_INDICATORI_SUCCESS,
  LOAD_INDICATORI_FAILURE,
  LOAD_FIRMA_START,
  LOAD_FIRMA_SUCCESS,
  LOAD_FIRMA_FAILURE,
  LOAD_CURS_START,
  LOAD_CURS_SUCCESS,
  LOAD_CURS_FAILURE,
} from './lookup.actions.types'

//--------------------------------- PRODUSE
export const loadProduseStart =()=> ({
  type:LOAD_PRODUSE_START,
});
export const loadProduseSuccess =(produse)=> ({
  type:LOAD_PRODUSE_SUCCESS,
  payload:produse
});
export const loadProduseFailure =(error)=> ({
  type:LOAD_PRODUSE_FAILURE,
  payload:error
});

//--------------------------------- MATERIALE
export const loadMaterialeStart =()=> ({
  type:LOAD_MATERIALE_START,
});
export const loadMaterialeSuccess =(materiale)=> ({
  type:LOAD_MATERIALE_SUCCESS,
  payload:materiale
});
export const loadMaterialeFailure =(error)=> ({
  type:LOAD_MATERIALE_FAILURE,
  payload:error
});

//--------------------------------- PRETURI TABELARE
export const loadPreturiTabelareStart =()=> ({
  type:LOAD_PRETURITABELARE_START,
});
export const loadPreturiTabelareSuccess =(preturitabelare)=> ({
  type:LOAD_PRETURITABELARE_SUCCESS,
  payload:preturitabelare
});
export const loadPreturiTabelareFailure =(error)=> ({
  type:LOAD_PRETURITABELARE_FAILURE,
  payload:error
});

//--------------------------------- OPTIONALE
export const loadOptionaleStart =()=> ({
  type:LOAD_OPTIONALE_START,
});
export const loadOptionaleSuccess =(optionale)=> ({
  type:LOAD_OPTIONALE_SUCCESS,
  payload:optionale
});
export const loadOptionaleFailure =(error)=> ({
  type:LOAD_OPTIONALE_FAILURE,
  payload:error
});

//--------------------------------- CULORI
export const loadCuloriStart =()=> ({
  type:LOAD_CULORI_START,
});
export const loadCuloriSuccess =(culori)=> ({
  type:LOAD_CULORI_SUCCESS,
  payload:culori
});
export const loadCuloriFailure =(error)=> ({
  type:LOAD_CULORI_FAILURE,
  payload:error
});

//--------------------------------- INFORMARI
export const loadInformariStart =()=> ({
  type:LOAD_INFORMARI_START,
});
export const loadInformariSuccess =(informari)=> ({
  type:LOAD_INFORMARI_SUCCESS,
  payload:informari
});
export const loadInformariFailure =(error)=> ({
  type:LOAD_INFORMARI_FAILURE,
  payload:error
});

//--------------------------------- INDICATORI
export const loadIndicatoriStart =()=> ({
  type:LOAD_INDICATORI_START,
});
export const loadIndicatoriSuccess =(indicatori)=> ({
  type:LOAD_INDICATORI_SUCCESS,
  payload:indicatori
});
export const loadIndicatoriFailure =(error)=> ({
  type:LOAD_INDICATORI_FAILURE,
  payload:error
});

//--------------------------------- DATE FIRMA
export const loadFirmaStart =(idFirma)=> ({
  type:LOAD_FIRMA_START,
  payload:idFirma
});
export const loadFirmaSuccess =(firma)=> ({
  type:LOAD_FIRMA_SUCCESS,
  payload:firma
});
export const loadFirmaFailure =(error)=> ({
  type:LOAD_FIRMA_FAILURE,
  payload:error
});


//--------------------------------- CURS
export const loadCursStart =()=> ({
  type:LOAD_CURS_START,
});
export const loadCursSuccess =(curs)=> ({
  type:LOAD_CURS_SUCCESS,
  payload:curs
});
export const loadCursFailure =(error)=> ({
  type:LOAD_CURS_FAILURE,
  payload:error
});

