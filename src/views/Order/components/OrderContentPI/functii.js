/* eslint-disable linebreak-style */
// VARIABILA GLOBALA 
//Atentie! Particularitate server strapi: rutele daca nu se mentioneaza "_limit=xxx" vor returna doar primele 100 de rezultate. 
//Tebelul prettabelars contine in acest moment 4997 inregistrari din care pentru UG sunt in acest moment 1420.
//rutaPretTabelar va returna deci 1420 de inregistrari.
//Pe scurt ideea este ca trebuie stabilita o limita foarte mare in continutul requestului(_limit=100000) pentru a fi sigur ca se raspunde cu toate inregistrarile. 

// var rutaPrincipala;  // setul de inregistari returnat de ruta principala : http://5.189.183.44:1337/produses?tipProdus=PI&_limit=1000&_sort=denumire:ASC
// var rutaPretTabelar // setul de inregistrari returnat de ruta : http://5.189.183.44:1337/prettabelars?tipProdus=PI&_limit=100000   



export const mpPi=( tipSubprodus=0,lungime=0, inaltime=0)=>{     // returneaza valoarea campului mp
  // rezultat functie tinand cont de tipul de produs
  switch(tipSubprodus) { 
    case 4: // PLASA BALAMALE- are pret pe mp
      return ((lungime * inaltime) / 1000000 > 0.7 ? (lungime * inaltime) / 1000000 : 0.7).toFixed(2) ; // in cazul in care mp<0.7 se ia 0.7
    default:
      return ((lungime * inaltime) / 1000000).toFixed(2);
  }    
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const pretPi=(produse=[], tipSubprodus=0, lungime=0, inaltime=0, culoareCaseta=0, optional1=0, prettabelar=0, buc=0)=>{  // returneaza pretul  intregului rulou, inclusiv actionare si optionale.
  var pretTabel;
  var pretFix;
  var procentCuloareCaseta;
  var pretOptional1;
  var cotaLungime;
  var cotaInaltime;
   
  // stabilire valoare variabila cotaLungime astfel incat sa se determine lungimea luata in calcul pentru pret (pret stabilit pe lungimi din 100 in 100 mm)
  if(lungime % 100 === 0 ){
    cotaLungime=(lungime>500 ? lungime*1 : 500)  
  }else{
    cotaLungime=((Math.floor(lungime/100)*100 +100)>500 ? (Math.floor(lungime / 100)*100 + 100) : 500) 
  }


  // stabilire valoare variabila cotaInaltime astfel incat sa se determine inaltimea luata in calcul pentru pret (pret stabilit pe inaltimi din 100 in 100 mm)
  if(inaltime % 100 === 0 ){
    cotaInaltime=(inaltime > 500 ? inaltime*1 : 500) || 0
  }else{
    cotaInaltime=((Math.floor(inaltime / 100) * 100 +100)>500 ? (Math.floor(inaltime / 100) * 100 + 100) : 500) 
  }

  // extragerea in variabile a datelor necesare calcularii pretului din setul de date returnat de rutele: rutaPrincipala si rutaPretTabelar 
  var vPretTabel= prettabelar.find(produs => produs.lungime === cotaLungime && produs.inaltime === cotaInaltime && produs.idProdus === tipSubprodus) 
  var vProdus=produse.find(produs => produs.key === tipSubprodus)
   
  if (vProdus){ // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    var vProcentculoareCaseta = produse.find(produs => produs.key===tipSubprodus).culoriCompatibile.find(culoare => culoare.key === culoareCaseta && culoare.componenta==='CASETA')
  }else{ 
    vProcentculoareCaseta = undefined 
  }

  // extragere pret rulou din tabel preturi(prettabelars)
  if (vPretTabel){
    pretTabel = vPretTabel.pret*1
  }else{ 
    pretTabel = 0  
  }

  // extragere variabila pretFix (pret pe mp) acolo unde pretul plasei se calculeaza pe metru patrat )
  if(vProdus){
    pretFix = vProdus.pretMP * mpPi(tipSubprodus,lungime,inaltime) ; 
  }else{
    pretFix = 0
  }   
           
  // extragere  variabila procentCuloareCaseta procent suplimentar datorat  culorii casetei
  if(vProcentculoareCaseta){
    procentCuloareCaseta = vProcentculoareCaseta.procentSuplimentar;
  }else{
    procentCuloareCaseta = 0;
  } 

  // preturi optionale
  pretOptional1=functiePretOptional(produse, tipSubprodus, optional1);
        
  // stabilire rezultat functie 
  switch(tipSubprodus) { 
    case 4: // PLASA BALAMALE- are pret pe mp
      if(pretFix === 0){
        console.log('Eroare: Nu exista pret pentru acest produs!!!');
        return 0; 
      }else{
        return (pretFix * (100 + procentCuloareCaseta) / 100 + pretOptional1*1).toFixed(2) * buc; 
      }
    default:
      if((pretTabel*1 + pretFix*1) === 0){
        console.log('Eroare: Dimensiuni prea mari!');
        return 0; // trebuie sa genereze un mesaj de atentionare : "Pentru aceste dimensiuni pretul este zero, dimensiuni prea mari"
      }else{
        return ((pretFix*1 + pretTabel*1) * (100 + procentCuloareCaseta*1) / 100 + pretOptional1*1).toFixed(2) * buc; 
      }
  }    
    
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const functiePretOptional=(produse, tipSubprodus=0, optionalX=0)=>{     // functie folosita in cadrul functiei pretUg 
  var vProdus=produse.find(produs => produs.key === tipSubprodus)
   
  if (vProdus){ // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    var vPretOptional = produse.find(produs => produs.key === tipSubprodus).optionaleCompatibile.find(optional => optional.key === optionalX)
  }else{ 
    return 0;
  }

  if(vPretOptional){ 
    return  vPretOptional.pret*1 ;
  }else{ 
    return 0
  }  
}


