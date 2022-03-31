/* eslint-disable linebreak-style */
//--------------------------------------------------------------------------------------------
export const mpJV=(vLungime=0, vInaltime=0,vDeschidere=0)=>{
  switch(vInaltime*1){
    case 0:
      return (vLungime / 1000).toFixed(2)
    default:
      if(vDeschidere==='L'){
        return ((vLungime * 116 * (vInaltime > 1500 ? vInaltime*1 : 1500) * 6 / 10) / 1000000).toFixed(2)
      }else{
        return (vLungime * (vInaltime > 1500 ? vInaltime*1 : 1500) / 1000000).toFixed(2)
      }
  }
}
//--------------------------------------------------------------------------------------------
export const actJV=(vInaltime=0)=>{
  switch(true){
    case (vInaltime <= 800):
      return 800
    case (vInaltime > 800 && vInaltime <= 900) :
      return (vInaltime / 100).toFixed(0)
    case (vInaltime > 900 && vInaltime <= 1200) :
      return ((vInaltime - 100) / 100).toFixed(0) * 100
    case (vInaltime > 1200 && vInaltime <= 2000) :
      return ((vInaltime*1 - 200) / 100).toFixed(0) * 100
    case (vInaltime > 2000) :
      return ((vInaltime*1 - 300) / 100).toFixed(0) * 100
    default:
      return 0
  } 
}
//--------------------------------------------------------------------------------------------
export const pretJV=(vMP=0,vPretMaterial=0,vConsole=0,vPretConsole=0,vBuc)=>{
  return ((vMP * vPretMaterial + vConsole * vPretConsole) * vBuc).toFixed(2)
}
//--------------------------------------------------------------------------------------------

export const carucioareJV = (vLungime=0, vDeschidere='0', vTipMaterial='0') => {
  let paritate;
  if (vTipMaterial==='89'){
    switch(vDeschidere){
      case '1':
      case '2':
      case 'DA':
        return round40( (vLungime*1 - 20) / 89 );
      case '3':
        paritate=round40( (vLungime*1 - 20) / 89 ) % 2 === 0 ? 0 : 1;
        if(paritate===0){
          return round40( (vLungime*1 - 20) / 89 );
        }else{
          return round40( (vLungime*1 - 20) / 89 ) + 1;
        }
      case '4':
        paritate=round49( (vLungime*1 - 20) / 89 ) % 2 === 0 ? 0 : 1;
        if(paritate===0){
          return round49( (vLungime*1 - 20) / 89 );
        }else{
          return round49( (vLungime*1 - 20) / 89 ) + 1;
        }
      case 'L':
        return round49(vLungime*1);
      default:
        return 0
    }
    
  }else{

    switch(vDeschidere){
      case '1':
      case '2':
      case 'DA':
        return round49( vLungime*1 / 116 )
      case '3':
        paritate=round40( (vLungime*1) / 116 ) % 2 === 0 ? 0 : 1
        if(paritate===0){
          return round40( (vLungime*1) / 116 )
        }else{
          return round40( (vLungime*1) / 116 ) + 1
        }
      case '4':
        paritate=round49( (vLungime*1) / 116 ) % 2 === 0 ? 0 : 1
        if(paritate===0){
          return round49( (vLungime*1) / 116 )
        }else{
          return round49( (vLungime*1) / 116 ) + 1
        }
      case 'L':
        return round49(vLungime*1)
      default:
        return 0
    }
  }
}

//----------------------------------------------------------------------------------------------

export const round49 = (n=0) => {
  let nr = n*1 - Math.floor(n)
  if(nr<=49/100){
    return Math.floor(n)
  }else{
    return Math.floor(n) + 1
  }
}

//----------------------------------------------------------------------------------------------
export const round40 = (n=0) => {
  let nr =  n*1 - Math.floor(n);
  if(nr<=40/100){
    return Math.floor(n)
  }else{
    return Math.floor(n) + 1
  }
}
