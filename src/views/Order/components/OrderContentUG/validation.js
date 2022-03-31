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
    if([1].includes(currentItem.tipSubprodus)  && currentItem.mp>9){
      mesajeEroare.m2m={mesaj:'Dimensiunbi prea mari!(mp>9)', tip:'Eroare'}
    }else{
      mesajeEroare.m2m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([2].includes(currentItem.tipSubprodus)  && currentItem.mp>15){
      mesajeEroare.m3m={mesaj:'Dimensiunbi prea mari!(mp>15)', tip:'Eroare'}
    }else{
      mesajeEroare.m3m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([1].includes(currentItem.tipSubprodus)  && currentItem.lungime>3200){
      mesajeEroare.m4m={mesaj:'Recomandare lamela de 77mm!(L>3200)', tip:'Atentionare'}
    }else{
      mesajeEroare.m4m={}
    }
    //-------------------------------------------------------------------------------------------- 
  //-------------------------------------------------------------------------------------------- 
  }
  setErrors({...errors,...mesajeEroare})
  return !JSON.stringify(mesajeEroare).includes('Eroare')
}
,500)
 