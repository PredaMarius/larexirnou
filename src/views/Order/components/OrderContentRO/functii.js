/* eslint-disable linebreak-style */
// VARIABILA GLOBALA 
// var rutaPrincipala; setul de inregistari returnat de ruta : http://softdivision.net/produses?tipProdus=RO&_limit=1000&_sort=denumire:ASC

export const mpRo = (lungime=0, lungimeFinala=0, inaltime=0, inaltimeFinala=0, tipSubprodus=0, ax='MIC')=> {// returneaza valoarea campului mp
  var cotaLungime;// lungime luata in calcul dupa anumite criterii
  var cotaInaltime;// inaltime luata in calcul dupa anumite crietii

  // stabilire valoare variabila cotaLungime
  switch(tipSubprodus) {
    case 7:
    case 8:
    case 9:
      cotaLungime=lungime*1;            
      break;
    default :
      if (lungime >= lungimeFinala) {
        cotaLungime = lungime*1;
      } else {
        cotaLungime = lungimeFinala*1 - (ax==='MIC' ? 35 : 40);
      } 
  }        

  // stabilire valoare variabila cotaInaltime
  cotaInaltime = (inaltime >= inaltimeFinala ?  inaltime*1 : inaltimeFinala*1);
     
  // rezultat functie tinand cont de tipul de produs
  switch(tipSubprodus) { 
    case 1:
    case 4:
    case 7:
    case 8:
    case 9:
      return (cotaLungime * cotaInaltime/1000000 > 0.7 ? cotaLungime * cotaInaltime / 1000000 : 0.7).toFixed(2)
        
    case 10:
      return ( cotaInaltime / 1000 > 1.5 ? cotaLungime * cotaInaltime / 1000000 : cotaLungime * 1500 / 1000000).toFixed(2);
            
    default:
      return (lungime * cotaInaltime / 1000000 > 0.7 ? lungime * cotaInaltime / 1000000 : 0.7).toFixed(2);
  }    

}

//--------------------------------------------------------------------------------------------------------------------------------------

export const pretRo=(produse,tipSubprodus=0, material=0,lungime=0,lungimeFinala=0,inaltime=0,inaltimeFinala=0,ax='MIC', optional1=0, optional2=0, optional3=0, culoarecomp=0, vBuc=0)=>{  // returneaza pretul unitar pe metru patrat marit cu procentul suplimentar dat de optionalele selectate.
  var pretRoleta;  // stocheaza pretul pe mp al roletei in functie de material
  var suplimentOptional1; // stocheaza procentul ce se aplica pretului roletei in functie de procentulSuplimentar setat la nivel de nomenclator optionale
  var suplimentOptional2; // -//-
  var suplimentOptional3; // -//-
  var suplimentCuloareComponente; // stocheaza procentul ce se aplica pretului roletei in functie de culoarea componentelor setat la nivel de nomenclator culori
  var vProdus= produse.find(produs => produs.key===tipSubprodus);
  var vOptional1= vProdus? vProdus.optionaleCompatibile.find(opt => opt.key === optional1) : {};
  var vOptional2=vProdus? vProdus.optionaleCompatibile.find(opt=> opt.key === optional2):{};
  var vOptional3=vProdus? vProdus.optionaleCompatibile.find(opt=> opt.key === optional3):{};
  var vCuloareComponente=vProdus? vProdus.culoriCompatibile.find(culoare=> culoare.key === culoarecomp):{};
   
  // pret material

  if (vProdus) { // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    pretRoleta = vProdus.materialeCompatibile.find(mat => mat.key === material) ? vProdus.materialeCompatibile.find(mat => mat.key === material).pret*1:0
  }else{ 
    pretRoleta = 0
  }

  //precentSuplimentar datorat  optionalului 1
  if (vProdus && vOptional1) { // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    suplimentOptional1 = vOptional1.procentSuplimentar*1  
  }else{ 
    suplimentOptional1 = 0
  }

  //precentSuplimentar datorat  optionalului 2
  if (vProdus  && vOptional2) { // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    suplimentOptional2 = vOptional2.procentSuplimentar*1 
  }else{ 
    suplimentOptional2 = 0
  }

  //precentSuplimentar datorat  optionalului 3
  if (vProdus  && vOptional3) { // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    suplimentOptional3 = vOptional3.procentSuplimentar*1 
  }else{ 
    suplimentOptional3 = 0
  }

  //precentSuplimentar datorat  culorii componentelor
  if (vProdus  && vCuloareComponente) { // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    suplimentCuloareComponente = vCuloareComponente.procentSuplimentar*1 
  }else{ 
    suplimentCuloareComponente = 0
  }
  //preturi optionale

  var pretOptional1=pretOptional(produse,optional1, lungime, inaltime, lungimeFinala, inaltimeFinala, tipSubprodus, ax)*1
  var pretOptional2=pretOptional(produse,optional2, lungime, inaltime, lungimeFinala, inaltimeFinala, tipSubprodus, ax)*1
  var pretOptional3=pretOptional(produse,optional3, lungime, inaltime, lungimeFinala, inaltimeFinala, tipSubprodus, ax)*1
 
  return  (pretRoleta * (1 + (suplimentOptional1 + suplimentOptional2 + suplimentOptional3 + suplimentCuloareComponente) / 100)* mpRo (lungime, lungimeFinala, inaltime, inaltimeFinala, tipSubprodus, ax) + pretOptional1 + pretOptional2 + pretOptional3).toFixed(2) * vBuc;

}

//--------------------------------------------------------------------------------------------------------------------------------------
export const pretOptional=(produse,optional=0, lungime=0, inaltime=0, lungimeFinala=0, inaltimeFinala=0, tipSubprodus=0, ax='MIC')=>{
  var cotaInaltime = (inaltime>=inaltimeFinala ? inaltime : inaltimeFinala - 40);
  var cotaLungime = cotaPanza(lungime,lungimeFinala,tipSubprodus,ax) + 20;
  var vProdus= produse.find(produs => produs.key===tipSubprodus);
  var vOptional= vProdus? vProdus.optionaleCompatibile.find(opt => opt.key === optional && opt.ax=== ax):{}

  if (vProdus && vOptional){

    switch(optional) {            
      case 7:
      case 8:
      case 9:   
        return  vProdus.optionaleCompatibile.find(opt => opt.key === optional && opt.ax=== ax).pret * (lungime===0 || lungime===''? cotaLungime : lungime*1 + 20) / 1000;
      case 10:
        
        return  vProdus.optionaleCompatibile.find(opt => opt.key === optional && opt.ax=== ax).pret * (inaltime===0 || inaltime===''? 2 * cotaInaltime : 2 * inaltime) / 1000; 
      case 11:
        return  vProdus.optionaleCompatibile.find(opt => opt.key === optional && opt.ax=== ax).pret * (lungime===0 || lungime==='' ? lungimeFinala*1 - 10 : lungime*1 + 30) / 1000;
        
      default :
        
        return  vProdus.optionaleCompatibile.find(opt => opt.key === optional && opt.ax=== ax).pret*1; 
    }
  }else{
    return 0;
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
export const cotaPanza=(lungime=0, lungimeFinala=0, tipSubprodus=0, ax='MIC')=>{
  switch(tipSubprodus) {
    case 1:
    case 4:
      if (lungime >= lungimeFinala){
        return lungimeFinala*1; 
      } else {
        return lungimeFinala*1 - (ax==='MIC' ? 35 : 40);
      }
    case 7:
      return lungime*1 + 15;
    case 8 :
      return lungime*1 - 30;
    case 9 :
      return lungime*1 + 20;
    default :
      return lungime*1;
  }        
}       




