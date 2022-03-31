/* eslint-disable linebreak-style */
import debounce from 'lodash.debounce'
export const validation=debounce(async (currentItem,errors,setErrors)=>{
  var mesajeEroare={}
  //--------------------------------------------------------------------------------------------
  if (currentItem){
    if(currentItem.lungime===currentItem.lungimeFinala && currentItem.lungime && currentItem.lungimeFinala){
      mesajeEroare.m1m={mesaj:'Nu ati completat corect lungimea.(Lungime Panza nu are cum sa fie egala cu Lungime Finala).', tip:'Eroare'}
    }else{
      mesajeEroare.m1m={}
    }
    //-------------------------------------------------------------------------------------------- 

    if(currentItem.inaltime===currentItem.inaltimeFinala && currentItem.inaltime && currentItem.inaltimeFinala){
      mesajeEroare.m2m={mesaj:'Nu ati completat corect inaltimea.(Inaltime Panza nu are cum sa fie egala cu Inaltime Finala).', tip:'Eroare'}
    }else{
      mesajeEroare.m2m={}
    }
    //--------------------------------------------------------------------------------------------   
    if([2,3].includes(currentItem.tipSubprodus) && currentItem.material===8 && currentItem.inaltime>2200){
      mesajeEroare.m3m={mesaj:'Materialul nu incape in caseta.(Inaltimea trebuie sa fie mai mica de 2200).', tip:'Eroare'}
    }else{
      mesajeEroare.m3m={}
    }
    //--------------------------------------------------------------------------------------------   
    if([5,6].includes(currentItem.tipSubprodus)  && currentItem.inaltime>1800){
      mesajeEroare.m4m={mesaj:'Materialul nu incape in caseta.(Inaltimea trebuie sa fie mai mica de 1800).', tip:'Atentionare'}
    }else{
      mesajeEroare.m4m={}
    }
    //--------------------------------------------------------------------------------------------   
    if([1,2].includes(currentItem.tipSubprodus)  && currentItem.lungime>1500 && currentItem.ax==='MIC'){
      mesajeEroare.m5m={mesaj:'Recomandare ax MARE).', tip:'Atentionare'}
    }else{
      mesajeEroare.m5m={}
    }

    //--------------------------------------------------------------------------------------------   
    if([2,3,5,6].includes(currentItem.tipSubprodus)  && currentItem.lungime>1700){
      mesajeEroare.m6m={mesaj:'Lungime prea mare.(Inaltime maxima 1700).', tip:'Eroare'}
    }else{
      mesajeEroare.m6m={}
    }
    //--------------------------------------------------------------------------------------------   
    if(currentItem.mp>2.4  && currentItem.ax==='MIC'){
      mesajeEroare.m7m={mesaj:'Pentru dimensiunile introduse, axul trebuie sa fie MARE.', tip:'Eroare'}
    }else{
      mesajeEroare.m7m={}
    }
    //--------------------------------------------------------------------------------------------   
    if([7,8,9].includes(currentItem.tipSubprodus)  && currentItem.inaltime>2500){
      mesajeEroare.m8m={mesaj:'Inaltime prea mare.(Inaltime maxima 2500).', tip:'Eroare'}
    }else{
      mesajeEroare.m8m={}
    }

    //--------------------------------------------------------------------------------------------   
    if([2,3,5,6].includes(currentItem.tipSubprodus)  && (currentItem.lungimeFinala-currentItem.lungime)<35){
      mesajeEroare.m9m={mesaj:'Sub 35mm intre cota totala si cota panza, sunati!!', tip:'Atentionare'}
    }else{
      mesajeEroare.m9m={}
    }

    //--------------------------------------------------------------------------------------------   
    if([2,3,5,6].includes(currentItem.tipSubprodus)  && (currentItem.lungimeFinala-currentItem.lungime)>50){
      mesajeEroare.m10m={mesaj:'Peste 50mm intre cota totala si cota panza, sunati!!', tip:'Atentionare'}
    }else{
      mesajeEroare.m10m={}
    }

    //--------------------------------------------------------------------------------------------   
    if([7,8].includes(currentItem.tipSubprodus)  && currentItem.lungime<350){
      mesajeEroare.m11m={mesaj:'Lungime prea mica.(Lungime minima 350).', tip:'Eroare'}
    }else{
      mesajeEroare.m11m={}
    }
    //--------------------------------------------------------------------------------------------
      
    if([2,3,5,6,9].includes(currentItem.tipSubprodus) && currentItem.ax==='MARE'){
      mesajeEroare.m12m={mesaj:'Pentru roleta selectata nu se accepta decat ax MIC).', tip:'Eroare'}
    }else{
      mesajeEroare.m12m={}
    }

    //--------------------------------------------------------------------------------------------   
    if([1,4].includes(currentItem.tipSubprodus)  && (currentItem.lungimeFinala-currentItem.lungime)!==35 && currentItem.ax==='MIC'){
      if(currentItem.lungimeFinala>0 && currentItem.lungime>0){
        mesajeEroare.m13m={mesaj:' In cazul acestui tip de roleta diferenta dintre LungimePanza si LungimeFinala trebuie sa fie = 35mm pentru Ax MIC!!', tip:'Atentionare'}
      }else{
        mesajeEroare.m13m={}
      }
    }else{
      mesajeEroare.m13m={}
    }

    //--------------------------------------------------------------------------------------------   
    if([1,4].includes(currentItem.tipSubprodus)  && (currentItem.lungimeFinala-currentItem.lungime)!==40 && currentItem.ax==='MARE'){
      if(currentItem.lungimeFinala>0 && currentItem.lungime>0){
        mesajeEroare.m14m={mesaj:' In cazul acestui tip de roleta diferenta dintre LungimePanza si LungimeFinala trebuie sa fie = 40mm pentru Ax MARE!!', tip:'Atentionare'}
      }else{
        mesajeEroare.m13m={}
      }
    }else{
      mesajeEroare.m14m={}
    }

  }
  setErrors({...errors,...mesajeEroare})
  return !JSON.stringify(mesajeEroare).includes('Eroare')
}
,500)
 