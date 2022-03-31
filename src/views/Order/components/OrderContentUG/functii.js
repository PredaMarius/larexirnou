/* eslint-disable linebreak-style */
// VARIABILA GLOBALA 
//Atentie! Particularitate server strapi: rutele daca nu se mentioneaza "_limit=xxx" vor returna doar primele 100 de rezultate. 
//Tebelul prettabelars contine in acest moment 4997 inregistrari din care pentru UG sunt in acest moment 1209.
//rutaPretTabelar va returna deci 1209 de inregistrari.
//Pe scurt ideea este ca trebuie stabilita o limita foarte mare in continutul requestului(_limit=100000) pentru a fi sigur ca se raspunde cu toate inregistrarile. 

// var rutaPrincipala;  // setul de inregistari returnat de ruta principala : http://5.189.183.44:1337/produses?tipProdus=UG&_limit=1000&_sort=denumire:ASC
// var rutaPretTabelar // setul de inregistrari returnat de ruta : http://5.189.183.44:1337/prettabelars?tipProdus=UG&_limit=100000   

export const mpUg=(lungime=0, inaltime=0)=>{     // returneaza valoarea campului mp
  return ((lungime * inaltime) / 1000000 > 0.7 ? (lungime * inaltime) / 1000000 : 0.7).toFixed(2) ; // in cazul in care mp<0.7 se ia 0.7   
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const pretUg=(produse,tipSubprodus=0, lungime=0, inaltime=0, culoareLamela=0, culoareCaseta=0, tipActionare=0, optional1=0, optional2=0, optional3=0, prettabelar, buc)=>{  // returneaza pretul  intregului rulou, inclusiv actionare si optionale.
  var pretTabel;
  var pretFix;
  var procentCuloareLamele;
  var procentCuloareCaseta;
  var pretActionare;
  var pretOptional1;
  var pretOptional2;
  var pretOptional3;
  var cotaLungime;
  var cotaInaltime;
   
  // stabilire valoare variabila cotaLungime astfel incat sa se determine lungimea luata in calcul pentru pret (pret stabilit pe lungimi din 100 in 100 mm)
  if(lungime % 100===0 ){
    cotaLungime=(lungime>500 ? lungime : 500)*1  
  }else{
    cotaLungime=((Math.floor(lungime / 100)*100 +100)>500 ? (Math.floor(lungime / 100) * 100 + 100) : 500) 
  }


  // stabilire valoare variabila cotaInaltime astfel incat sa se determine inaltimea luata in calcul pentru pret (pret stabilit pe inaltimi din 100 in 100 mm)
  if(inaltime % 100===0 ){
    cotaInaltime=(inaltime>500 ? inaltime : 500)*1 || 0
  }else{
    cotaInaltime=((Math.floor(inaltime / 100)*100 + 100)>500 ? (Math.floor(inaltime / 100) * 100 +100) : 500) 
  }

  // extragerea in variabile a datelor necesare calcularii pretului din setul de date returnat de rutele: rutaPrincipala si rutaPretTabelar 
  var vPretTabel= prettabelar.find(produs => produs.lungime === cotaLungime && produs.inaltime === cotaInaltime && produs.idProdus===tipSubprodus) 
  var vProdus=produse.find(produs => produs.key===tipSubprodus)
   
  if (vProdus){ // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    var vProcentCuloareLamela= produse.find(produs => produs.key===tipSubprodus).culoriCompatibile.find(culoare => culoare.key === culoareLamela && culoare.componenta==='LAMELA')
    var vProcentculoareCaseta=produse.find(produs => produs.key===tipSubprodus).culoriCompatibile.find(culoare => culoare.key === culoareCaseta && culoare.componenta==='CASETA')
  }else{ 
    vProcentCuloareLamela = undefined
    vProcentculoareCaseta = undefined 
  }

  // extragere pret rulou din tabel preturi(prettabelars)
  if (vPretTabel){
    pretTabel = vPretTabel.pret*1
  }else{ 
    pretTabel=0  
  }

  // extragere variabila pretFix (pret pe mp) acolo unde pretul ruloului se calculeaza pe metru patrat )
    
  if(vProdus){
    pretFix = vProdus.pretMP * mpUg(lungime,inaltime) ; 
  }else{
    pretFix=0
  }   
           
  // extragere  variabila procentCuloareLamele procent suplimentar datorat culorii lamelelor
  if(vProcentCuloareLamela){
    procentCuloareLamele =vProcentCuloareLamela.procentSuplimentar*1;
  }else{
    procentCuloareLamele = 0
  }

  // extragere  variabila procentCuloareCaseta procent suplimentar datorat  culorii casetei
  if(vProcentculoareCaseta){
    procentCuloareCaseta = vProcentculoareCaseta.procentSuplimentar*1;
  }else{
    procentCuloareCaseta = 0;
  } 

  //extragere variabila pretActionare pret actionare
  pretActionare =functiePretActionare(produse,tipSubprodus,tipActionare) ;
    
  // preturi optionale
  pretOptional1 = functiePretOptional(produse,tipSubprodus, optional1);
  pretOptional2 = functiePretOptional(produse,tipSubprodus, optional2);
  pretOptional3 = functiePretOptional(produse,tipSubprodus, optional3);
    
  // stabilire rezultat functie 
    
  if(pretTabel*1 + pretFix*1 === 0){
    console.log('Eroare: Dimensiuni prea mari sau prea mici (UG55mm: L>700 si H>1500!)(UG77mm: L>1800 si H>1800!)');
    return 0; // trebuie sa genereze un mesaj de atentionare : "Pentru aceste dimensiuni pretul este zero, dimensiuni prea mari"

  }else{
    return ((pretFix+pretTabel) * (100 + procentCuloareLamele*1 + procentCuloareCaseta*1)/100 + pretActionare*1 + pretOptional1*1 + pretOptional2*1 + pretOptional3*1).toFixed(2)* buc; // inmultit cu 1 ptr a forta functia sa returneze un numar si nu un string;
  }   
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const functiePretOptional=(produse,tipSubprodus=0, optionalX=0)=>{     // functie folosita in cadrul functiei pretUg 
  var vProdus=produse.find(produs => produs.key===tipSubprodus)
   
  if (vProdus){ // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    var vPretOptional=produse.find(produs => produs.key===tipSubprodus).optionaleCompatibile.find(optional => optional.key === optionalX)
  }else{ 
    return 0;
  }

  if(vPretOptional){ 
    return  vPretOptional.pret*1; // inmultit cu 1 ptr a forta functia sa returneze un numar si nu un string;
  }else{ 
    return 0
  }  

}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const functiePretActionare=(produse,tipSubprodus=0,tipActionare=0)=>{     // functie folosita in cadrul functiei pretUg 
   
  var vProdus=produse.find(produs => produs.key===tipSubprodus)
   
  if (vProdus){ // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    var vPretActionare=produse.find(produs => produs.key===tipSubprodus).actionariCompatibile.find(actionare => actionare.key === tipActionare)
  }else{ 
    return 0;
  }

  if(vPretActionare){
    return vPretActionare.pret*1; // inmultit cu 1 ptr a forta functia sa returneze un numar si nu un string
  }else{
    return 0
  }
}

