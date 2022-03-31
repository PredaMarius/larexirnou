/* eslint-disable linebreak-style */
import debounce from 'lodash.debounce'
export const validation=debounce(async (currentItem,errors,setErrors)=>{
  var mesajeEroare={}
  //--------------------------------------------------------------------------------------------
  if (currentItem){
    //-------------------------------------------------------------------------------------------- 
    if(currentItem.pretCatalog==='0.00' && currentItem.culoareLamela && currentItem.lungime && currentItem.inaltime ){
      mesajeEroare.m1m={mesaj:'Pret 0 pentru dimensiunile introduse.Dimensiuni prea mari pentru produsul selectat!!', tip:'Eroare'}
    }else{
      mesajeEroare.m1m={}
    }    
    //-------------------------------------------------------------------------------------------- 
    if(currentItem.lungime>3000){
      mesajeEroare.m2m={mesaj:'Lungime prea mare(lungime maxima 3000mm).', tip:'Eroare'}
    }else{
      mesajeEroare.m2m={}
    }
  //-------------------------------------------------------------------------------------------- 
  }
  setErrors({...errors,...mesajeEroare})
  return !JSON.stringify(mesajeEroare).includes('Eroare')
}
,500)
 