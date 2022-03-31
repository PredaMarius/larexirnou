/* eslint-disable linebreak-style */
import debounce from 'lodash.debounce'
export const validation=debounce(async (currentItem,errors,setErrors)=>{
  var mesajeEroare={}
  //--------------------------------------------------------------------------------------------
  if (currentItem){
    //-------------------------------------------------------------------------------------------- 
    if(currentItem.pretCatalog==='0.00' && currentItem.tipSubprodus && currentItem.lungime && currentItem.inaltime ){
      mesajeEroare.m1m={mesaj:'Pret 0 pentru dimensiunile introduse.Dimensiuni prea mari pentru produsul selectat!!', tip:'Eroare'}
    }else{
      mesajeEroare.m1m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([1,2,3,4].includes(currentItem.tipSubprodus)  && currentItem.mp>2.9){
      mesajeEroare.m2m={mesaj:'Dimensiunbi prea mari!(mp>2,9)', tip:'Eroare'}
    }else{
      mesajeEroare.m2m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([2].includes(currentItem.tipSubprodus)  && currentItem.lungime>1100){
      mesajeEroare.m3m={mesaj:'Lungime prea mare, recomandare plasa TIP USA IN 2 CANATE.', tip:'Eroare'}
    }else{
      mesajeEroare.m3m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([6].includes(currentItem.tipSubprodus)  && currentItem.lungime>1300){
      mesajeEroare.m4m={mesaj:'Lungime prea mare, recomandare plasa TIP USA IN 2 CANATE.', tip:'Eroare'}
    }else{
      mesajeEroare.m4m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([7].includes(currentItem.tipSubprodus)  && currentItem.lungime>2600){
      mesajeEroare.m5m={mesaj:'Lungime prea mare, pentru produsul selectat.', tip:'Eroare'}
    }else{
      mesajeEroare.m5m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([6,7].includes(currentItem.tipSubprodus)  && currentItem.inaltime>2600){
      mesajeEroare.m6m={mesaj:'Inaltime prea mare, pentru produsul selectat.', tip:'Eroare'}
    }else{
      mesajeEroare.m6m={}
    }
    //-------------------------------------------------------------------------------------------- 
  //-------------------------------------------------------------------------------------------- 
  }
  setErrors({...errors,...mesajeEroare})
  return !JSON.stringify(mesajeEroare).includes('Eroare')
}
,500)
 