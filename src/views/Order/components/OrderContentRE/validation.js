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
    if([8,9,10].includes(currentItem.tipSubprodus)  && currentItem.mp>6){
      mesajeEroare.m2m={mesaj:'Dimensiunbi prea mari!(mp>6)', tip:'Eroare'}
    }else{
      mesajeEroare.m2m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([1].includes(currentItem.tipSubprodus)  && currentItem.lungime>2500){
      mesajeEroare.m3m={mesaj:'Latime mare, recomandare lamela 45mm(L>2000)', tip:'Atentionare'}
    }else{
      mesajeEroare.m3m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([2,6].includes(currentItem.tipSubprodus)  && currentItem.lungime>2000){
      mesajeEroare.m4m={mesaj:'Latime prea mare,probleme de functionare', tip:'Eroare'}
    }else{
      mesajeEroare.m4m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([8,9,10].includes(currentItem.tipSubprodus)  && currentItem.mp>5){
      mesajeEroare.m5m={mesaj:'Recomandare lamela de 45mm!(mp>5)', tip:'Atentionare'}
    }else{
      mesajeEroare.m5m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if(([1,3].includes(currentItem.optional1) || [1,3].includes(currentItem.optional2))   && currentItem.tipSubprodus===2){
      mesajeEroare.m6m={mesaj:'La ruloul cu plasa este incompatibil optionalul ZAVOR SIMPLU  si INCUIETOARE CU CHEIE.', tip:'Eroare'}
    }else{
      mesajeEroare.m6m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([1,2,3].includes(currentItem.tipActionare)    && currentItem.mp>3){
      mesajeEroare.m7m={mesaj:'Se recomanda TABACHERA CU MANIVELA MARE SAU MOTOR! (mp>3)', tip:'Atentionare'}
    }else{
      mesajeEroare.m7m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([4,11,12].includes(currentItem.tipActionare)    && currentItem.mp>3){
      mesajeEroare.m8m={mesaj:'Trebuie selectat MOTOR MARE pentru rulourile cu peste 3mp!', tip:'Eroare'}
    }else{
      mesajeEroare.m8m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([7].includes(currentItem.tipSubprodus)  && currentItem.lungime>1500){
      mesajeEroare.m9m={mesaj:'Latime prea mare pentru produsul selectat, recomandare RULOU DE ALUMINIU!', tip:'Eroare'}
    }else{
      mesajeEroare.m9m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if([7].includes(currentItem.tipSubprodus)  && currentItem.mp>2.7){
      mesajeEroare.m10m={mesaj:'Suprafata prea mare pentru produsul selectat, recomandare RULOU DE ALUMINIU!', tip:'Eroare'}
    }else{
      mesajeEroare.m10m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if(([8].includes(currentItem.tipSubprodus)  && currentItem.lungime>4800) || ([9].includes(currentItem.tipSubprodus)  && currentItem.lungime>3800)){
      mesajeEroare.m11m={mesaj:'Latimea prea mare, incercati sa divizati ruloul!', tip:'Eroare'}
    }else{
      mesajeEroare.m11m={}
    }
    //-------------------------------------------------------------------------------------------- 
    if(([8].includes(currentItem.tipSubprodus)  && currentItem.inaltime>3500) || ([9].includes(currentItem.tipSubprodus)  && currentItem.inaltime>3000)){
      mesajeEroare.m12m={mesaj:'Inaltime prea mare, incercati sa divizati ruloul!', tip:'Eroare'}
    }else{
      mesajeEroare.m12m={}
    }
    //-------------------------------------------------------------------------------------------- 
  //-------------------------------------------------------------------------------------------- 
  }
  setErrors({...errors,...mesajeEroare})
  return !JSON.stringify(mesajeEroare).includes('Eroare')
}
,500)
 