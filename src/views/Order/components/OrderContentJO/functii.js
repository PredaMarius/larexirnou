/* eslint-disable linebreak-style */
// VARIABILA GLOBALA 
//Atentie! Particularitate server strapi: rutele daca nu se mentioneaza "_limit=xxx" vor returna doar primele 100 de rezultate. 

// var rutaOptionale;  // setul de inregistari returnat de ruta : http://5.189.183.44:1337/optionals?tipProdus=JO&_limit=1000&_sort=denumire:ASC
// var rutaCulori // setul de inregistrari returnat de ruta : http://5.189.183.44:1337/culoares?tipProdus=JO&_limit=1000&_sort=denumire:ASC 
// var rutaClema //  setul de inregistari returnat de ruta : http://5.189.183.44:1337/optionals?tipProdus=JV&denumire=CLEME%20METAL
//Atentie rutaClema are la tipProdus="JV" asta pentru ca daca ar avea JO, ar aparea aceste cleme in lista din care se alege Ghid/Fix si nu trebuie, asa ca i-am pus tipProdus=JV



export const mpJo = (lungime=0, inaltime=0) => {     // returneaza valoarea campului mp
  return ((lungime * inaltime) / 1000000 > 0.7 ? (lungime * inaltime) / 1000000 : 0.7).toFixed(2) ; // in cazul in care mp<0.7 se ia 0.7   
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const pretJo = (optionale, culori, clema, lungime=0, inaltime=0, culoareLamela=0, optional1=0, buc=0,cleme=0) => {  // returneaza pretul  intregului produs, inclusiv optional.
    
  var vOptionale;
  var vCulori;
  var pretMP;
  var pretOptional;
  var pretClema;
  
  // extragerea in variabile a datelor necesare calcularii pretului din setul de date returnat de rutele: rutaOptionale si rutaCulori 
  vOptionale= optionale.find(optional => optional.key===optional1) 
  vCulori=culori.find(culoare => culoare.key===culoareLamela)// atentie in programul meu in rubrica Cod Culoare apare ceva ce poate fi confundat cu id-ul(key-ul) dar nu e. De ex. Cod culoare 18 are key=3
    
  // pretMP (pret pe mp) 
  if(vCulori){
    pretMP = vCulori.pret*1; 
  }else{
    pretMP = 0
  } 

  //  pretOptional(Ghid/Fix)
  if(vOptionale){  
    pretOptional = vOptionale.pret*1; 
  }else{
    pretOptional = 0
  } 
            
  //  pretCleme
  if(clema){  
    pretClema = clema.pret*1; 
  }else{
    pretClema = 0
  } 
   
  // stabilire rezultat functie 
  return ((pretMP * mpJo(lungime, inaltime)) + pretOptional*1 + (pretClema*cleme)).toFixed(2)* buc; 
  //atentie fata de varianta devco si clienti, aici numarul de cleme este per bucata si pentru toata cantitatea / de stabilit o concordanta intre ele      
}



