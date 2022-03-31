/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// Auth
import {strapi} from '../strapi/strapi.config';
import LZString from 'lz-string';

const TOKEN_KEY='jwt';
const USER='user';
const ADRESELIVRARE='adreselivrare'


export const setToken=(value, tokenKey=TOKEN_KEY)=>{
    if(localStorage){
        localStorage.setItem(tokenKey, JSON.stringify(value.jwt));
        document.cookie = `jwt= ${localStorage.getItem('jwt')}; max-age=315360000; samesite:strict`
        // localStorage.setItem(user, LZString.compress(JSON.stringify(value.user)))
    }
}

export const getToken=(tokenKey=TOKEN_KEY)=>{
    
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(localStorage.getItem(tokenKey));
    }
    return null;
}

export const clearToken=(tokenKey=TOKEN_KEY,user=USER,adreselivrare=ADRESELIVRARE)=>{
    if(localStorage){
        // localStorage.removeItem(tokenKey);
        // localStorage.removeItem('culori');
        // localStorage.removeItem('preturitabelare');
        // localStorage.removeItem('informari');
        // localStorage.removeItem('firma');
        // localStorage.removeItem('indicatori');
        // localStorage.removeItem('produse');
        // localStorage.removeItem('materiale');
        // localStorage.removeItem('optionale');
        // localStorage.removeItem(user)
        localStorage.clear()
        // localStorage.removeItem(adreselivrare)  
    }
    document.cookie = `jwt= ${localStorage.getItem('jwt')}; max-age=0; samesite:strict`
    return null;
}


export const setAdreseLivrare=(value,adreselivrare=ADRESELIVRARE)=>{
    if(localStorage){
        localStorage.setItem(adreselivrare,LZString.compress(JSON.stringify(value)));
    }
}

export const getAdreseLivrare=(adreselivrare=ADRESELIVRARE)=>{
    if(localStorage && localStorage.getItem(adreselivrare)){
        return JSON.parse(LZString.decompress(localStorage.getItem(adreselivrare)));
    }
    return null;
}

export const setUser=(value,user=USER)=>{
    if(localStorage){
        localStorage.setItem(user,LZString.compress(JSON.stringify(value)))
    }
}

export const getUser= (user=USER)=>{
        if(localStorage && localStorage.getItem(user)){
            return JSON.parse(LZString.decompress(localStorage.getItem(user)));
        }
    return null;
}



// --------------------------------------------------------
function objectToString(json){
	const arr=[];
	if (json.length>0){
		json.map(object=>(arr.push({adresa:object})));
	}

return(arr.length>0?arr:[{adresa:''}])
}
// --------------------------------------------------------
export function adrese(json){
    const adr=[]
    if (json.length>0){
    objectToString(json).map(o=>(adr.push({id:o.adresa.id, item:o.adresa,adresa:''.concat(o.adresa.numeLocatie,', ').concat(o.adresa.oras,', ' ).concat(o.adresa.adresa,', jud. ').concat(o.adresa.judet,', cod postal ').concat(o.adresa.codPostal,', telefon: ').concat(o.adresa.telefon,', observatii: ').concat(o.adresa.observatii)})))
    }
    return adr
}
// -------------------------------------------------------

export function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }


//    setProduse
export const setProduse=(value, tokenKey='produse')=>{
    if(localStorage){
        localStorage.setItem(tokenKey, LZString.compress(JSON.stringify(value)));
    }
}

export const getProduseX=(tokenKey='produse')=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(LZString.decompress(localStorage.getItem(tokenKey)));
    }
    return null;
}


// setMateriale

export const setMateriale=(value, tokenKey='materiale')=>{
    if(localStorage){
        localStorage.setItem(tokenKey, LZString.compress(JSON.stringify(value)));
    }
}

export const getMaterialeX=(tokenKey='materiale')=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(LZString.decompress(localStorage.getItem(tokenKey)));
    }
    return null;
}


// setPreturiTabelare

export const setPreturiTabelare=(value, tokenKey='preturitabelare')=>{
    if(localStorage){
        localStorage.setItem(tokenKey, LZString.compress(JSON.stringify(value)));
    }
}

export const getPreturiTabelareX=(tokenKey='preturitabelare')=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(LZString.decompress(localStorage.getItem(tokenKey)));
    }
    return null;
}

// setOptionale

export const setOptionale=(value, tokenKey='optionale')=>{
    if(localStorage){
        localStorage.setItem(tokenKey, LZString.compress(JSON.stringify(value)));
    }
}

export const getOptionaleX=(tokenKey='optionale')=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(LZString.decompress(localStorage.getItem(tokenKey)));
    }
    return null;
}

// setCulori

export const setCulori=(value, tokenKey='culori')=>{
    if(localStorage){
        localStorage.setItem(tokenKey, LZString.compress(JSON.stringify(value)));
    }
}

export const getCuloriX=(tokenKey='culori')=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(LZString.decompress(localStorage.getItem(tokenKey)));
    }
    return null;
}


// setIndicatori

export const setIndicatori=(value, tokenKey='indicatori')=>{
    if(localStorage){
        localStorage.setItem(tokenKey, JSON.stringify(value));
    }
}

export const getIndicatoriX=(tokenKey='indicatori')=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(localStorage.getItem(tokenKey));
    }
    return null;
}

// setInformari

export const setInformari=(value, tokenKey='informari')=>{
    if(localStorage){
        localStorage.setItem(tokenKey, LZString.compress(JSON.stringify(value)));
    }
}

export const getInformariX=(tokenKey='informari')=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        
        return JSON.parse(LZString.decompress(localStorage.getItem(tokenKey)));
        
    }
    return null;
}

export const setFirma=(value, tokenKey='firma')=>{
    if(localStorage){
        localStorage.setItem(tokenKey, LZString.compress(JSON.stringify(value)));
    }
}

export const getFirmaX=(tokenKey='firma')=>{
    if(localStorage && localStorage.getItem(tokenKey)){
        
        return JSON.parse(LZString.decompress(localStorage.getItem(tokenKey)));
        
    }
    return null;
}




export const comparaIndicatori= async(tip)=>{
    const indAPI = await strapi.getEntries('indicators', {indicator:tip})
    const indLS = await getIndicatoriX()?getIndicatoriX().filter((indicator)=>indicator.indicator ===tip)[0]:null
    if(indAPI && indLS){
      return indAPI[0].Valoare === indLS.Valoare;
    }
    return false
  }