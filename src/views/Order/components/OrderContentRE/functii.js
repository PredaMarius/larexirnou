/* eslint-disable linebreak-style */
// VARIABILA GLOBALA 
//Atentie! Particularitate server strapi: rutele daca nu se mentioneaza "_limit=xxx" vor returna doar primele 100 de rezultate. 
//Tebelul prettabelars contine in acest moment 4997 inregistrari din care pentru RE sunt in acest moment 2348.
//rutaPretTabelar va returna deci 2348 de inregistrari.
//Pe scurt ideea este ca trebuie stabilita o limita foarte mare in continutul requestului(_limit=100000) pentru a fi sigur ca se raspunde cu toate inregistrarile. 

// var rutaPrincipala;  // setul de inregistari returnat de ruta principala : http://5.189.183.44:1337/produses?tipProdus=RE&_limit=1000&_sort=denumire:ASC
// var rutaPretTabelar // setul de inregistrari returnat de ruta : http://5.189.183.44:1337/prettabelars?tipProdus=RE&_limit=100000   



export const mpRe=(tipSubprodus=0,lungime=0, inaltime=0)=> {     // returneaza valoarea campului mp
 
  // rezultat functie tinand cont de tipul de produs
  switch(tipSubprodus) { 
    case 3: // cazul PLASA IN RULOU LATERALA
    case 4: // cazul PLASA IN RULOU CENTRAL
      return ((lungime * inaltime) / 1000000 > 0.7 ? (lungime * inaltime) / 1000000 : 0.7).toFixed(2) ; // in cazul in care mp<0.7 se ia 0.7
    default:
      return ((lungime * inaltime) / 1000000).toFixed(2);
  }    
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const pretRe=(produse,tipSubprodus=0, lungime=0, inaltime=0, culoareLamela=0, culoareCaseta=0, tipActionare=0, optional1=0, optional2=0, preturitabelare, buc=0)=>{  // returneaza pretul  intregului rulou, inclusiv actionare si optionale.
 
  var pretTabel;
  var pretFix;
  var procentCuloareLamele;
  var procentCuloareCaseta;
  var pretActionare;
  var pretOptional1;
  var pretOptional2;
  var cotaLungime;
  var cotaInaltime;
  // stabilire valoare variabila cotaLungime astfel incat sa se determine lungimea luata in calcul pentru pret (pret stabilit pe lungimi din 100 in 100 mm)
  if(lungime % 100===0 ){
    cotaLungime=(lungime>500 ? lungime : 500) *1 
  }else{
    cotaLungime=((Math.floor(lungime / 100)*100 +100)>500 ? (Math.floor(lungime/100)*100 +100) : 500) *1
  }
  

  // stabilire valoare variabila cotaInaltime astfel incat sa se determine inaltimea luata in calcul pentru pret (pret stabilit pe inaltimi din 100 in 100 mm)
  if(inaltime % 100===0 ){
    cotaInaltime=(inaltime>500 ? inaltime : 500)*1 || 0
  }else{
    cotaInaltime=((Math.floor(inaltime / 100) * 100 + 100) > 500 ? (Math.floor(inaltime / 100) * 100 + 100) : 500)*1 
  }
  
  // extragerea in variabile a datelor necesare calcularii pretului din setul de date returnat de rutele: rutaPrincipala si rutaPretTabelar 
  var vPretTabel= preturitabelare.find(produs => produs.lungime === cotaLungime && produs.inaltime === cotaInaltime && produs.idProdus===tipSubprodus) 
  // var vProdus=preturitabelare.find(produs => produs.key===tipSubprodus)
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
    pretTabel = vPretTabel.pret
   
  }else{ 
    pretTabel=0 
    
  }

  // extragere variabila pretFix (pret pe mp) acolo unde pretul ruloului se calculeaza pe metru patrat )
  
  switch(tipSubprodus) { 
    case 3: // PLASA IN RULOU LATERALA
    case 4: // PLASA IN RULOU CENTRAL
    case 10: //TRANSPARENT CU CAPSE 
      if(vProdus){
        pretFix = vProdus.pretMP * mpRe(tipSubprodus,lungime,inaltime) ; 
      }else{
        pretFix=0
      }   
      break;      
    default:
      pretFix = 0;    
  }    
 
  // extragere  variabila procentCuloareLamele procent suplimentar datorat culorii lamelelor
  if(vProcentCuloareLamela){
    procentCuloareLamele =vProcentCuloareLamela.procentSuplimentar;
  }else{
    procentCuloareLamele=0
  }
 
  // extragere  variabila procentCuloareCaseta procent suplimentar datorat  culorii casetei
  if(vProcentculoareCaseta){
    procentCuloareCaseta = vProcentculoareCaseta.procentSuplimentar;
  }else{
    procentCuloareCaseta=0;
  } 
  
  //extragere variabila pretActionare pret actionare
  pretActionare =functiePretActionare(produse,tipSubprodus,tipActionare) ;
  
  // preturi optionale
  pretOptional1=functiePretOptional(produse,tipSubprodus,lungime, inaltime, optional1);
  
  pretOptional2=functiePretOptional(produse,tipSubprodus,lungime, inaltime, optional2);
  
  // stabilire rezultat functie 
  switch(tipSubprodus) { 
    case 3: // PLASA IN RULOU LATERALA - pret pe mp
    case 4: // PLASA IN RULOU CENTRAL - pret pe mp  
    case 10: //TRANSPARENT CU CAPSE - pret pe mp 
      if(pretFix === 0){
        console.log('Eroare: Nu exista pret pentru aceste produse!!!');
        return 0; // trebuie sa genereze un mesaj de atentionare "Eroare: Nu exista pret pentru aceste produse!!!"
      }else{
        //Atentie se ia in calcul doar procentul suplimentar de la culoare caseta
        return (pretFix * (100 + procentCuloareCaseta*1) / 100 + pretActionare*1 + pretOptional1*1 + pretOptional2*1).toFixed(2) * buc; // inmultit cu 1 ptr a forta functia sa returneze un numar si nu un string;
      }

    default:
      if(pretTabel+ pretFix === 0){
        console.log('Eroare: Dimensiuni prea mari!');
        return 0; // trebuie sa genereze un mesaj de atentionare : "Pentru aceste dimensiuni pretul este zero, dimensiuni prea mari"

      }else{
        return ((pretFix+pretTabel) * (100 + procentCuloareLamele*1 + procentCuloareCaseta*1)/100 + pretActionare*1 + pretOptional1*1+ pretOptional2*1).toFixed(2)*  buc; // inmultit cu 1 ptr a forta functia sa returneze un numar si nu un string;
      }
  }    
    
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const functiePretOptional=(produse,tipSubprodus=0,lungime=0, inaltime=0, optionalX=0)=>{     // functie folosita in cadrul functiei pretRe 
  var dimensiuneOptional;
  var vProdus=produse.find(produs => produs.key===tipSubprodus)
  var  nrClemeAntiefractie;
  if (vProdus){ // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    var vPretOptional=produse.find(produs => produs.key===tipSubprodus).optionaleCompatibile.find(optional => optional.key === optionalX)
  }else{ 
    return 0;
  }

  if(vPretOptional){ //..........................
    // stabilire valoare variabila nrClemeAntiefractie, ce intra in calculul anumitor optionale
    switch(true) { 
      case (lungime<=1300):
        nrClemeAntiefractie = 2;
        break; 
      case (lungime<=1600):
        nrClemeAntiefractie = 3;
        break; 
      case (lungime<=2300):
        nrClemeAntiefractie = 4;
        break; 
      case (lungime<=2800):
        nrClemeAntiefractie = 5;
        break;
      default:
        nrClemeAntiefractie = 6;
    }  

    // exista optionale care au dimensiuni in functie de lungime si inaltime 
    switch(optionalX) {    
      case 28: // PROFIL INCHIDERE GHIDAJ*
        dimensiuneOptional= (lungime*1 - 106) / 1000;
        break;
      case 29: // CORNIER INCHIDERE*
        dimensiuneOptional= lungime / 1000;
        break;
      case 30:  // PROFIL SUB TENCUIALA*
        dimensiuneOptional= lungime * 2 / 1000;
        break;
      case 31: // COMPENSARE 40X20*
      case 32: // COMPENSARE 50X20*
      case 33: // COMPENSARE 40X40*
        dimensiuneOptional= (lungime*1 + 2 * inaltime) / 1000
        break;
      default:
        dimensiuneOptional=1;
    }    

    //stabilire valoare rezultat functie 

    switch(optionalX) { 
      case 27: // CLEME ANTIEFRACTIE*
        return  Number(vPretOptional.pret * nrClemeAntiefractie);
      case 28: // PROFIL INCHIDERE GHIDAJ*
      case 29: // CORNIER INCHIDERE*
      case 30: // PROFIL SUB TENCUIALA*
      case 31: // COMPENSARE 40X20*
      case 32: // COMPENSARE 50X20*
      case 33: // COMPENSARE 40X40*
        return  vPretOptional.pret * dimensiuneOptional ; 
      default:
        return  vPretOptional.pret * 1; // inmultit cu 1 ptr a forta functia sa returneze un numar si nu un string;
    }  
  }else{ //..........................
    return 0
  }  
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const functiePretActionare=(produse,tipSubprodus=0,tipActionare=0)=>{     // functie folosita in cadrul functiei pretRe 
   
  var vProdus=produse.find(produs => produs.key===tipSubprodus)
   
  if (vProdus){ // se verifica daca exista produsul, altfel nu se poate cauta in subcategorii ale lui.
    var vPretActionare=produse.find(produs => produs.key===tipSubprodus).actionariCompatibile.find(actionare => actionare.key === tipActionare)
  }else{ 
    return 0;
  }

  if(vPretActionare){
    return vPretActionare.pret*1
  }else{
    return 0
  }
}