/* eslint-disable linebreak-style */
import debounce from 'lodash.debounce'
export const validation=debounce(async (currentItem,errors,setErrors)=>{
  var mesajeEroare={}
  //--------------------------------------------------------------------------------------------
  if (currentItem){
    if(currentItem.lungime>3000 && currentItem.lungime<=5900){
      mesajeEroare.m1m={mesaj:'Pot aparea probleme daca se trimite prin curier.', tip:'Atentionare'}
    }else{
      mesajeEroare.m1m={}
    }
    //--------------------------------------------------------------------------------------------     
    if(currentItem.lungime>5900 ){
      mesajeEroare.m2m={mesaj:'Nu se poate executa garnisa/sina cu lungimea>5900mm). Se recomanda impartirea in doua bucati cu actionare T8.(Cod T8 care trebuie trecut la Observatii)', tip:'Eroare'}
    }else{
      mesajeEroare.m2m={}
    }
    //--------------------------------------------------------------------------------------------   
    if(currentItem.inaltime>2800 && currentItem.material===26){
      mesajeEroare.m3m={mesaj: 'Inaltime maxima admisa 2800mm pentru acest tip de material', tip:'Eroare'}
    }else{
      mesajeEroare.m3m={}
    }
    //--------------------------------------------------------------------------------------------
    if(currentItem.inaltime>5500){
      mesajeEroare.m4m={mesaj:'Nu se poate executa un produs cu inaltimea > 5500mm', tip:'Eroare'}
    }else{
      mesajeEroare.m4m={}
    }
    //--------------------------------------------------------------------------------------------
  }
  setErrors({...errors,...mesajeEroare})
  return !JSON.stringify(mesajeEroare).includes('Eroare')
}
,500)
 