/* eslint-disable react/display-name */
/* eslint-disable linebreak-style */
import {takeLatest, put, all, call} from 'redux-saga/effects';
import {
  LOAD_PRODUSE_START,
  LOAD_MATERIALE_START,
  LOAD_CODURI_START,
  LOAD_PRETURITABELARE_START,
  LOAD_OPTIONALE_START,
  LOAD_CULORI_START,
  LOAD_INFORMARI_START,
  LOAD_INDICATORI_START,
  LOAD_FIRMA_START,
  LOAD_CURS_START,
} from './lookup.actions.types'
import {loadProduseSuccess,loadMaterialeSuccess,loadCoduriSuccess,loadOptionaleSuccess, loadCuloriSuccess,loadPreturiTabelareSuccess, loadInformariSuccess, loadIndicatoriSuccess, loadFirmaSuccess, loadCursSuccess } from './lookup.actions';
import {enqueueSnackbar, setLoading, setDone} from '../other/other.actions';
import {strapi} from '../../strapi/strapi.config';
import {setProduse, setMateriale, setCoduri, setPreturiTabelare,setOptionale, setCulori, setIndicatori, setInformari, setFirma} from '../../strapi/strapi.utils';
import {getProduseX, getMaterialeX, getCoduriX, getPreturiTabelareX,getOptionaleX, getCuloriX, getInformariX, comparaIndicatori} from '../../strapi/strapi.utils';


export function* getProduse(){
  
  try{
    yield put(setLoading(true))
    const egalitateIndicator = yield comparaIndicatori('produse')
     
    if(egalitateIndicator){
      yield put(loadProduseSuccess(getProduseX())) 
    }else{
      const produse= yield strapi.getEntries('produses', {_limit:10000})
      yield put(loadProduseSuccess(produse))
      yield setProduse(produse)
    }
    
    // yield put(setLoading(false))
  }catch(error){ 
    yield put(setLoading(false))
    // yield put(enqueueSnackbar({
    //   message: `Verificati conexiunea la internet. Eroare : nu am putut prelua nomenclatorul de produse.(${error})`,
    //   options: {
    //     key: null,
    //     variant: 'error',
    //   },
    // },5000))
  }
}

export function* getMateriale(){
  
  try{
    yield put(setLoading(true))
    const egalitateIndicator = yield comparaIndicatori('materiale')
     
    if(egalitateIndicator){
      yield put(loadMaterialeSuccess(getMaterialeX()))
    }else{
      const materiale= yield strapi.getEntries('materials',{tipProdus:'JV',_limit:10000, _sort:'denumire:ASC'})
      yield put(loadMaterialeSuccess(materiale))
      yield setMateriale(materiale)
    }
    // yield put(setLoading(false))
  }catch(error){ 
    yield put(setLoading(false))
    // yield put(enqueueSnackbar({
    //   message: `Verificati conexiunea la internet. Eroare : nu am putut prelua nomenclatorul de materiale.(${error})`,
    //   options: {
    //     key: null,
    //     variant: 'error',
    //   },
    // },5000))
  }
}

export function* getCoduri(){
  
  try{
    yield put(setLoading(true))
    const egalitateIndicator = yield comparaIndicatori('coduri')
     
    if(egalitateIndicator){
      yield put(loadCoduriSuccess(getCoduriX()))
    }else{
      const coduri= yield strapi.getEntries('coduris',{_limit:10000, _sort:'denumire:ASC'})
      yield put(loadCoduriSuccess(coduri))
      yield setCoduri(coduri)
    }
    // yield put(setLoading(false))
  }catch(error){ 
    yield put(setLoading(false))
    // yield put(enqueueSnackbar({
    //   message: `Verificati conexiunea la internet. Eroare : nu am putut prelua nomenclatorul de materiale.(${error})`,
    //   options: {
    //     key: null,
    //     variant: 'error',
    //   },
    // },5000))
  }
}

export function* getOptionale(){
  try{
    yield put(setLoading(true))
    const egalitateIndicator = yield comparaIndicatori('optionale')
     
    if(egalitateIndicator){
      yield put(loadOptionaleSuccess(getOptionaleX()))
    }else{
      const optionale= yield strapi.getEntries('optionals',{_limit:10000, _sort:'denumire:ASC',tipProdus_in:['JV','JO']})
      yield put(loadOptionaleSuccess(optionale))
      yield setOptionale(optionale)
    }
    // yield put(setLoading(false))
  }catch(error){ 
    yield put(setLoading(false))
    // yield put(enqueueSnackbar({
    //   message: `Verificati conexiunea la internet. Eroare : nu am putut prelua nomenclatorul de optionale.(${error})`,
    //   options: {
    //     key: null,
    //     variant: 'error',
    //   },
    // },5000))
  }
}

export function* getCulori(){
  try{
    yield put(setLoading(true))
    const egalitateIndicator = yield comparaIndicatori('culori')
     
    if(egalitateIndicator){
      yield put(loadCuloriSuccess(getCuloriX()))
    }else{
      const culori= yield strapi.getEntries('culoares',{tipProdus:'JO',_limit:10000, _sort:'codCuloare:ASC'})
      yield put(loadCuloriSuccess(culori))
      yield setCulori(culori)
    }
    // yield put(setLoading(false))
  }catch(error){ 
    yield put(setLoading(false))
    // yield put(enqueueSnackbar({
    //   message: `Verificati conexiunea la internet. Eroare : nu am putut prelua nomenclatorul de culori.(${error})`,
    //   options: {
    //     key: null,
    //     variant: 'error',
    //   },
    // },5000))
  }
}

export function* getPreturiTabelare(){
  try{
    yield put(setLoading(true))
    const egalitateIndicator = yield comparaIndicatori('preturitabelare')
     
    if(egalitateIndicator){
      yield put(loadPreturiTabelareSuccess(getPreturiTabelareX()))
    }else{
      const preturitabelare= yield strapi.getEntries('prettabelars',{_limit:100000})
      yield put(loadPreturiTabelareSuccess(preturitabelare))
      yield setPreturiTabelare(preturitabelare)
    }
    //yield put(setLoading(false))
  }catch(error){
    yield put(setLoading(false)) 
    // yield put(enqueueSnackbar({
    //   message: `Verificati conexiunea la internet. Eroare : nu am putut prelua nomenclatorul de preturi tabelare.(${error})`,
    //   options: {
    //     key: null,
    //     variant: 'error',
    //   },
    // },5000))
  }
}

export function* getInformari(){
  try{
    yield put(setLoading(true))
    const egalitateIndicator = yield comparaIndicatori('informari')
     
    if(egalitateIndicator){
      yield put(loadInformariSuccess(getInformariX()))
    }else{
      const informari= yield strapi.getEntries('informares',{_limit:10000})
      yield put(loadInformariSuccess(informari))
      yield setInformari(informari)
    }
    // yield put(setLoading(false))
  }catch(error){
    yield put(setLoading(false)) 
    // yield put(enqueueSnackbar({
    //   message: `Verificati conexiunea la internet. Eroare : nu am putut prelua mesajele de informare.(${error})`,
    //   options: {
    //     key: null,
    //     variant: 'error',
    //   },
    // },5000))
  }
}


export function* getIndicatori(){
  
  try{
    yield put(setLoading(true))
    const indicatori= yield strapi.getEntries('Indicators',{_limit:10000})
    yield put(loadIndicatoriSuccess(indicatori))
    yield setIndicatori(indicatori)
    yield put(setDone(true))
    yield put(setLoading(false))
  }catch(error){
    yield put(setLoading(false)) 
    yield put(enqueueSnackbar({
      message: `Va rugam sa va reautentificati. Eroare : nu am putut prelua nomenclatoarele.(${error})`,
      options: {
        key: null,
        variant: 'error',
      },
    },15000))
  }
}

export function* getFirma({payload:id}){
  try{
    yield put(setLoading(true))
    const firma= yield strapi.getEntries('firmas',{id})
    yield put(loadFirmaSuccess(firma))
    yield setFirma(firma)
    // yield put(setLoading(false))
  }catch(error){
    yield put(setLoading(false)) 
    // yield put(enqueueSnackbar({
    //   message: `Verificati conexiunea la internet. Eroare : nu am putut prelua mesajele de informare personale.(${error})`,
    //   options: {
    //     key: null,
    //     variant: 'error',
    //   },
    // },5000))
  }
}

export function* getCurs(){
  
  try{
    yield put(setLoading(true))
    // const curs= yield fetch('http://infovalutar.ro/' + yyyy +'/' + mm + '/' + dd + '/eur.bnr').then((rasp)=>rasp.text()).then((data)=>parseFloat(data))
    const curs= yield fetch('https://api.allorigins.win/raw?url=https://www.bnr.ro/nbrfxrates.xml')
      .then(response => response.text())
      .then((data)=>{
        let parser=new DOMParser(),
        xmlDoc=parser.parseFromString(data,'text/xml');
        return parseFloat(xmlDoc.getElementsByTagName('Rate')[10].innerHTML)
      })
    
    yield put(loadCursSuccess(curs))
    // yield put(setLoading(false))
  }catch(error){
    yield put(setLoading(false)) 
    yield put(enqueueSnackbar({
      message: `Eroare : nu am putut prelua cursul valutar.(${error})`,
      options: {
        key: null,
        variant: 'error',
      },
    },15000))
  }
}


export function* onLoadProduseStart(){
  yield takeLatest (LOAD_PRODUSE_START,getProduse)
}

export function* onLoadMaterialeStart(){
  yield takeLatest (LOAD_MATERIALE_START,getMateriale)
}

export function* onLoadCoduriStart(){
  yield takeLatest (LOAD_CODURI_START,getCoduri)
}
export function* onLoadOptionaleStart(){
  yield takeLatest (LOAD_OPTIONALE_START,getOptionale)
}

export function* onLoadCuloriStart(){
  yield takeLatest (LOAD_CULORI_START,getCulori)
}

export function* onLoadPreturiTabelareStart(){
  yield takeLatest (LOAD_PRETURITABELARE_START,getPreturiTabelare)
}

export function* onLoadInformariStart(){
  yield takeLatest (LOAD_INFORMARI_START,getInformari)
}

export function* onLoadIndicatoriStart(){
  yield takeLatest (LOAD_INDICATORI_START,getIndicatori)
}
export function* onLoadFirmaStart(){
  yield takeLatest (LOAD_FIRMA_START,getFirma)
}

export function* onLoadCursStart(){
  yield takeLatest (LOAD_CURS_START,getCurs)
}


export function* lookupSagas(){
  yield all([
    call(onLoadProduseStart),
    call(onLoadMaterialeStart),
    call(onLoadCoduriStart),
    call(onLoadOptionaleStart),
    call(onLoadCuloriStart),
    call(onLoadPreturiTabelareStart),
    call(onLoadInformariStart),
    call(onLoadFirmaStart),
    call(onLoadCursStart),
    call(onLoadIndicatoriStart),
  ])
}


