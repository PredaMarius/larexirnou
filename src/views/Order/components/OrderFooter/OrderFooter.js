/* eslint-disable react/no-multi-comp */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Divider,
  Fab
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import { withSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './orderfooter.css';
import {strapi} from '../../../../strapi/strapi.config';
import { selectOrderCurrentOrder, selectOrderUpdatedOrder, selectOrderOrders, selectOrderDeletedItems } from '../../../../redux/order/order.selectors'
import { setOverlaySpinner } from '../../../../redux/other/other.actions';
import { setCurrentOrder, setUpdatedOrder, setOrdersSuccess, setDeletedItems } from '../../../../redux/order/order.actions'
import {setLoading } from '../../../../redux/other/other.actions';
import {selectCurrentUser } from '../../../../redux/user/user.selectors';


const useStyles = makeStyles((theme) => ({
  alignButton:{
    display:'flex',
    justifyContent: 'flex-end' 
  },
  container: {
    width:'100%',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    flexWrap:'wrap'
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIconGreen:{
    color:'green'
  },
  extendedIconRed:{
    color:'red'
  },
  extendedIconOrange:{
    color:'orange'
  }
}));

const OrderFooter = props => {
  
  const [buttonDisabled, setButtonDisabled]=useState(false);
  const { currentOrder,updatedOrder, setOrdersSuccess,orders,deletedItems,setDeletedItems, history, enqueueSnackbar, setOverlaySpinner, setCurrentOrder} = props;
  const classes = useStyles();
  //-------------------------------------------------------------------------------------------------------
  const jsonCopy=(src)=>{
    return JSON.parse(JSON.stringify(src));
  }
  //-------------------------------------------------------------------------------------------------------


  //-------------------------------------------------------------------------------------------------------

  const handleCancel=()=>{
    if (isEqual(currentOrder,updatedOrder)){
      let path = '/orders';
      setCurrentOrder({})
      history.push(path);
      
    }else{
      confirmAlert({
        title: 'Comanda are modificari',
        message: 'Sunteti sigur ca doriti sa abandonati aceste modificari?',
        buttons: [
          {
            label: 'Da',
            onClick: () => {
              let path = '/orders';
              setCurrentOrder({})
              history.push(path);
            }
          },
          {
            label: 'Nu',
            onClick: () => {
              enqueueSnackbar('Operatia de abandon a fost anulata.',{ 
                variant: 'warning',
                autoHideDuration:3000
              })    
            }
          }
        ]
      });
    }
  }
  //-------------------------------------------------------------------------------------------------------
  const salvareComandaNouaRepereNoi=async ()=>{
    const TotalValoareCatalog=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretCatalog;},0)
    const TotalValoareComanda=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretCuDiscount;},0)
    const TotalValoareClientFinal=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretClientFinal;},0)
    var comandaSalvata
    await strapi.createEntry('comandas',
      {
        'clientClient': updatedOrder.clientClient? updatedOrder.clientClient : '',
        'valoareCatalog': updatedOrder.comandarepers? TotalValoareCatalog: 0, 
        'discount': updatedOrder.discount? updatedOrder.discount : 0,
        'cursValutar': updatedOrder.cursValutar? updatedOrder.cursValutar:0,
        'valoareComanda': updatedOrder.comandarepers? TotalValoareComanda: 0, 
        'valoareClientFinal': updatedOrder.comandarepers? TotalValoareClientFinal: 0, 
        'observatii': updatedOrder.observatii? updatedOrder.observatii :'',
        'adresaLivrare': updatedOrder.adresaLivrare? updatedOrder.adresaLivrare:'',
        'stadiu': updatedOrder.stadiu?updatedOrder.stadiu:'NETRANSMISA',
        'idFirma': updatedOrder.idFirma? updatedOrder.idFirma : 0,
        'tipProdus': updatedOrder.tipProdus? updatedOrder.tipProdus :'Z'
      })
      .then(async (res)=>{
        comandaSalvata=res
        let comenzi= jsonCopy(props.orders)    
        comenzi.unshift(res)     
        setOrdersSuccess(comenzi)
        
        if(updatedOrder.comandarepers && updatedOrder.comandarepers.length>0){
          updatedOrder.comandarepers.map( async (reper,index)=>{
            if(reper.id<0 && reper.denumireProdus !=='STERGE'){
              await strapi.createEntry('comandarepers',
                {
                  'idComanda': res.id,
                  'nrCrt': index+1,
                  'tipSubprodus': reper.tipSubprodus,
                  'lungime': reper.lungime,
                  'lungimeFinala': reper.lungimeFinala,
                  'inaltime': reper.inaltime,
                  'inaltimeFinala': reper.inaltimeFinala,
                  'deschidere': reper.deschidere,
                  'culoareLamela': reper.culoareLamela,
                  'culoareCaseta': reper.culoareCaseta,
                  'codMaterial': reper.codMaterial,
                  'material': reper.material,
                  'idCod':reper.idCod,
                  'NrLam':reper.NrLam,
                  'material2': reper.material2,
                  'idCod2':reper.idCod2,
                  'NrLam2':reper.NrLam2,
                  'material3': reper.material3,
                  'idCod3':reper.idCod3,
                  'NrLam3':reper.NrLam3,                  
                  'lungimeSnur': reper.lungimeSnur,
                  'actionare': reper.actionare, // camp folosit pentru data creearii necesar la ordonare in Devco
                  'tipActionare': reper.tipActionare,
                  'actionareStDr': reper.actionareStDr,
                  'ax': reper.ax,
                  'culoareComponente': reper.culoareComponente,
                  'optional1': reper.optional1,
                  'optional2': reper.optional2,
                  'optional3': reper.optional3,
                  'console': reper.console,
                  'TipConsole': reper.TipConsole,
                  'buc': reper.buc,
                  'mp': reper.mp,
                  'pretCatalog': reper.pretCatalog,
                  'pretCuDiscount': reper.pretCuDiscount,
                  'pretClientFinal': reper.pretClientFinal,
                  'observatii': reper.observatii,
                  'tipProdus': reper.tipProdus,
                  'denumireProdus': reper.denumireProdus,
                  'denumireSubProdus': reper.denumireSubProdus,
                  'denumireCuloareLamela': reper.denumireCuloareLamela,
                  'denumireCuloareCaseta': reper.denumireCuloareCaseta,
                  'denumireMaterial': reper.denumireMaterial,
                  'denumireMaterial2': reper.denumireMaterial2,
                  'denumireMaterial3': reper.denumireMaterial3,
                  'denumireTipActionare': reper.denumireTipActionare,
                  'denumireOptional1': reper.denumireOptional1,
                  'denumireOptional2': reper.denumireOptional2,
                  'denumireOptional3': reper.denumireOptional3,
                  'denumireCod': reper.denumireCod,
                  'denumireCod2': reper.denumireCod2,
                  'denumireCod3': reper.denumireCod3,
                  'denumireConsole': reper.denumireConsole
                })
                .then((response)=>{ 
                  let foundComanda = comenzi.findIndex(com => com.id === response.idComanda.id); 
                  comenzi[foundComanda].comandarepers.push(response)
                  setOrdersSuccess(comenzi)
                })
                .catch(e=>{
                  props.enqueueSnackbar(`Eroare : nu am putut salva reperele de pe comanda.(${e})`,{ 
                    variant: 'error',
                    persist:true,                    
                  })
                  setLoading(false)
                }); 
            }
           
          })
        }      
      })
      .then(()=>{
        props.enqueueSnackbar('Salvare cu success',{ 
          variant: 'success',
          autoHideDuration:3000
        })
        
      })
      .catch(e=>{
        props.enqueueSnackbar(`Eroare : nu am putut salva comanda.(${e})`,{ 
          variant: 'error',
          persist:true,          
        })
        setLoading(false)
      });
    
    return comandaSalvata
  }
  //-------------------------------------------------------------------------------------------------------
  const salvareComandaModificata=async ()=>{
    return new Promise( (resolve, reject) => { 
      const TotalValoareCatalog=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretCatalog;},0)
      const TotalValoareComanda=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretCuDiscount;},0)
      const TotalValoareClientFinal=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretClientFinal;},0)
      
      setTimeout(async() => {
        await strapi.updateEntry('comandas',updatedOrder.id,
          {
            'clientClient': updatedOrder.clientClient? updatedOrder.clientClient : '',
            'valoareCatalog': updatedOrder.comandarepers? TotalValoareCatalog: 0, 
            'discount': updatedOrder.discount? updatedOrder.discount : 0,
            'cursValutar': updatedOrder.cursValutar? updatedOrder.cursValutar:0,
            'valoareComanda': updatedOrder.comandarepers? TotalValoareComanda: 0, 
            'valoareClientFinal': updatedOrder.comandarepers? TotalValoareClientFinal: 0, 
            'observatii': updatedOrder.observatii? updatedOrder.observatii :'',
            'adresaLivrare': updatedOrder.adresaLivrare? updatedOrder.adresaLivrare:'',
            'stadiu': updatedOrder.stadiu?updatedOrder.stadiu:'NETRANSMISA',
            'idFirma': updatedOrder.idFirma? updatedOrder.idFirma : 0,
            'tipProdus': updatedOrder.tipProdus? updatedOrder.tipProdus :'Z'
          }
        )
          .then((res)=>{ 
            let comenzi= jsonCopy(props.orders)
            let foundComanda = comenzi.findIndex(com => com.id === res.id);  
            comenzi[foundComanda]=res
            return {res, comenzi}
          })       
          .then(({comenzi, res})=>{
            setOrdersSuccess(comenzi)
            props.enqueueSnackbar('Salvare cu success',{ 
              variant: 'success',
              autoHideDuration:3000
            })
            resolve(res)
          }).catch(e=>{
            props.enqueueSnackbar(`Eroare : nu am putut salva modificarile.(${e})`,{ 
              variant: 'error',
              persist:true,
            })
            setLoading(false)
            reject('Error')
          });
      },2000)
    })
  }

  //-------------------------------------------------------------------------------------------------------
  const salvareReperNou=(reper, index)=>{
    return new Promise( (resolve, reject) => {
      setTimeout(async() => {
        
        await strapi.createEntry('comandarepers',
          {
            'idComanda': updatedOrder.id,
            'nrCrt': index+1,
            'tipSubprodus': reper.tipSubprodus,
            'lungime': reper.lungime,
            'lungimeFinala': reper.lungimeFinala,
            'inaltime': reper.inaltime,
            'inaltimeFinala': reper.inaltimeFinala,
            'deschidere': reper.deschidere,
            'culoareLamela': reper.culoareLamela,
            'culoareCaseta': reper.culoareCaseta,
            'codMaterial': reper.codMaterial,
            'material': reper.material,
            'idCod':reper.idCod,
            'NrLam':reper.NrLam,
            'material2': reper.material2,
            'idCod2':reper.idCod2,
            'NrLam2':reper.NrLam2,
            'material3': reper.material3,
            'idCod3':reper.idCod3,
            'NrLam3':reper.NrLam3,
            'lungimeSnur': reper.lungimeSnur,
            'actionare': reper.actionare,// camp folosit pentru data creearii necesar la ordonare in Devco
            'tipActionare': reper.tipActionare,
            'actionareStDr': reper.actionareStDr,
            'ax': reper.ax,
            'culoareComponente': reper.culoareComponente,
            'optional1': reper.optional1,
            'optional2': reper.optional2,
            'optional3': reper.optional3,
            'console': reper.console,
            'TipConsole': reper.TipConsole,
            'buc': reper.buc,
            'mp': reper.mp,
            'pretCatalog': reper.pretCatalog,
            'pretCuDiscount': reper.pretCuDiscount,
            'pretClientFinal': reper.pretClientFinal,
            'observatii': reper.observatii,
            'tipProdus': reper.tipProdus,
            'denumireProdus': reper.denumireProdus,
            'denumireSubProdus': reper.denumireSubProdus,
            'denumireCuloareLamela': reper.denumireCuloareLamela,
            'denumireCuloareCaseta': reper.denumireCuloareCaseta,
            'denumireMaterial': reper.denumireMaterial,
            'denumireMaterial2': reper.denumireMaterial2,
            'denumireMaterial3': reper.denumireMaterial3,
            'denumireTipActionare': reper.denumireTipActionare,
            'denumireOptional1': reper.denumireOptional1,
            'denumireOptional2': reper.denumireOptional2,
            'denumireOptional3': reper.denumireOptional3,
            'denumireCod': reper.denumireCod,
            'denumireCod2': reper.denumireCod2,
            'denumireCod3': reper.denumireCod3,
            'denumireConsole': reper.denumireConsole,
          }).then(()=>{ 
          resolve('ok')
        }).catch(e=>{
          props.enqueueSnackbar(`Eroare : nu am putut salva reperele de pe comanda.(${e})`,{ 
            variant: 'error',
            persist:true,
          })
          setLoading(false)
          reject('Error')
        });
      },1000) 
    }) 
  }
  //-------------------------------------------------------------------------------------------------------
  const salvareReperModificat=async (reper, index)=>{
    if (typeof reper.idComanda==='object'){
      var foundComanda = orders.findIndex(com => com.id === reper.idComanda.id);
    }else{
      foundComanda = orders.findIndex(com => com.id === reper.idComanda);
    }
  
    let foundReperOrders =  orders[foundComanda].comandarepers.findIndex(rep => rep.id === reper.id); 
    let foundReperUpdatedOrder =  updatedOrder.comandarepers.findIndex(rep => rep.id === reper.id); 

    if(isEqual(orders[foundComanda].comandarepers[foundReperOrders], updatedOrder.comandarepers[foundReperUpdatedOrder])===false){
      return new Promise((resolve, reject) => {
        setTimeout(async() => {
          
          await strapi.updateEntry('comandarepers', reper.id,
            {
              'idComanda': updatedOrder.id,
              'nrCrt': index+1,
              'tipSubprodus': reper.tipSubprodus,
              'lungime': reper.lungime,
              'lungimeFinala': reper.lungimeFinala,
              'inaltime': reper.inaltime,
              'inaltimeFinala': reper.inaltimeFinala,
              'deschidere': reper.deschidere,
              'culoareLamela': reper.culoareLamela,
              'culoareCaseta': reper.culoareCaseta,
              'codMaterial': reper.codMaterial,
              'material': reper.material,
              'idCod':reper.idCod,
              'NrLam':reper.NrLam,
              'material2': reper.material2,
              'idCod2':reper.idCod2,
              'NrLam2':reper.NrLam2,
              'material3': reper.material3,
              'idCod3':reper.idCod3,
              'NrLam3':reper.NrLam3,
              'lungimeSnur': reper.lungimeSnur,
              'tipActionare': reper.tipActionare,
              'actionareStDr': reper.actionareStDr,
              'ax': reper.ax,
              'culoareComponente': reper.culoareComponente,
              'optional1': reper.optional1,
              'optional2': reper.optional2,
              'optional3': reper.optional3,
              'console': reper.console,
              'TipConsole': reper.TipConsole,
              'buc': reper.buc,
              'mp': reper.mp,
              'pretCatalog': reper.pretCatalog,
              'pretCuDiscount': reper.pretCuDiscount,
              'pretClientFinal': reper.pretClientFinal,
              'observatii': reper.observatii,
              'tipProdus': reper.tipProdus,
              'denumireProdus': reper.denumireProdus,
              'denumireSubProdus': reper.denumireSubProdus,
              'denumireCuloareLamela': reper.denumireCuloareLamela,
              'denumireCuloareCaseta': reper.denumireCuloareCaseta,
              'denumireMaterial': reper.denumireMaterial,
              'denumireMaterial2': reper.denumireMaterial2,
              'denumireMaterial3': reper.denumireMaterial3,
              'denumireTipActionare': reper.denumireTipActionare,
              'denumireOptional1': reper.denumireOptional1,
              'denumireOptional2': reper.denumireOptional2,
              'denumireOptional3': reper.denumireOptional3,
              'denumireCod': reper.denumireCod,
              'denumireCod2': reper.denumireCod2,
              'denumireCod3': reper.denumireCod3,
              'denumireConsole': reper.denumireConsole,

            }).then(()=>{ 
            resolve('ok')
          }).catch(e=>{
            props.enqueueSnackbar(`Eroare : nu am putut salva  modificarile la reperele de pe comanda.(${e})`,{ 
              variant: 'error',
              persist:true,
            })
            setLoading(false)
            reject('Error')
          });
        },1000)
      }) 
    }  
  }
  //-------------------------------------------------------------------------------------------------------
  const stergereReper=async (reper)=>{
    if (typeof reper.idComanda==='object'){
      var foundComanda = orders.findIndex(com => com.id === reper.idComanda.id);
    }else{
      // eslint-disable-next-line no-redeclare
      foundComanda = orders.findIndex(com => com.id === reper.idComanda);
    }
    let foundReperOrders =  orders[foundComanda].comandarepers.findIndex(rep => rep.id === reper.id); 
    
    if(foundReperOrders !==-1){
      return new Promise((resolve, reject) => {
        setTimeout(async() => {
          await strapi.deleteEntry('comandarepers', reper.id)
            .then(()=>{
              resolve('ok')
            }).catch(e=>{
              props.enqueueSnackbar(`Eroare : nu am putut salva modificarile la reperele de pe comanda.(${e})`,{ 
                variant: 'error',
                persist:true,
              })
              setLoading(false)
              reject('Error')
            });
        },1000)
      }) 
    }  
  }
  //-------------------------------------------------------------------------------------------------------
  const handleSave= async ()=>{

    if (!updatedOrder.clientClient){
      props.enqueueSnackbar('Nu ati completat clientul!',{ 
        variant: 'error',
      })
      return
    }
    // if (!updatedOrder.adresaLivrare){
    //   props.enqueueSnackbar('Nu ati completat adresa de livrare!',{ 
    //     variant: 'error',
    //   })
    //   return
    // }

    setOverlaySpinner(true)
    setButtonDisabled(true)
    //-----salvare comanda noua-----------------
    if (!isEqual(currentOrder,updatedOrder)){
      if(updatedOrder.id===0){
        await salvareComandaNouaRepereNoi()
      }           
      //-----salvare repere comanda-----------------
      if(updatedOrder.comandarepers && updatedOrder.comandarepers.length>0){
        updatedOrder.comandarepers.map( async (reper,index)=>{
          if(reper.id<0 && reper.denumireProdus !=='STERGE' && reper.idComanda !==0){
            await salvareReperNou(reper,index)
          }
          if(reper.id>0){
            await salvareReperModificat(reper,index)
          }
        })
      }
      //-----stergere repere comanda----------------- (acolo unde denumireProdus='STERGE' && id>0)
      if(deletedItems && deletedItems.filter((item=>(item.id>0))).length>0){
        deletedItems.filter((item=>(item.id>0))).map(async (rep)=>{
          await stergereReper(rep)   
        })
      }
      //-----salvare comanda modificata-----------------
      if(updatedOrder.id>0 && isEqual(updatedOrder,currentOrder)===false){
        await salvareComandaModificata()
      }
      setDeletedItems([])
            
    }
    // props.closeSnackbar()
    
    setCurrentOrder({})
    setTimeout(()=>{
      setButtonDisabled(false)
      setOverlaySpinner(false)
      history.push('/orders')
    },1000)
    
  }

  //-------------------------------------------------------------------------------------------------------
  const handleTrimite= async ()=>{
    var comandaSal
    var idComanda
    if (!updatedOrder.clientClient){
      props.enqueueSnackbar('Nu ati completat clientul!',{ 
        variant: 'error',
      })
      return
    }
    // if (!updatedOrder.adresaLivrare){
    //   props.enqueueSnackbar('Nu ati completat adresa de livrare!',{ 
    //     variant: 'error',
    //   })
    //   return
    // }
    setOverlaySpinner(true)
    setButtonDisabled(true)
    //-----salvare comanda noua-----------------
    if (!isEqual(currentOrder,updatedOrder)){
      if(updatedOrder.id===0){
        comandaSal= await salvareComandaNouaRepereNoi()
      }           
      //-----salvare repere comanda-----------------
      if(updatedOrder.comandarepers && updatedOrder.comandarepers.length>0){
        updatedOrder.comandarepers.map( async (reper,index)=>{
          if(reper.id<0 && reper.denumireProdus !=='STERGE' && reper.idComanda !==0){
            await salvareReperNou(reper,index)
          }
          if(reper.id>0){
            await salvareReperModificat(reper,index)
          }
        })
      }
      //-----stergere repere comanda----------------- (acolo unde denumireProdus='STERGE' && id>0)
      if(deletedItems && deletedItems.filter((item=>(item.id>0))).length>0){
        deletedItems.filter((item=>(item.id>0))).map(async (rep)=>{
          await stergereReper(rep)   
        })
      }
      //-----salvare comanda modificata-----------------
      if(updatedOrder.id>0 && isEqual(updatedOrder,currentOrder)===false){
        await salvareComandaModificata()
      }
      setDeletedItems([])        
    }

    //------update stadiu comanda la 'TRANSMISA'
    // let idComanda = comandaSal?comandaSal.id:updatedOrder.id   -schimbata de vazut daca are efect mutarea intr-un then dupa salvare

    async function alocare(){
      idComanda = comandaSal?comandaSal.id:updatedOrder.id
    }
    await alocare();

    await strapi.updateEntry('comandas',idComanda,{'stadiu': 'TRANSMISA',})
      .catch(e=>{
        props.enqueueSnackbar(`Eroare : nu am putut trimite comanda.(${e})`,{ 
          variant: 'error',
          persist:true,
        })
        setLoading(false)
      })
      .then((res)=>{ 
        let comenzi= jsonCopy(props.orders)
        let foundComanda = comenzi.findIndex(com => com.id === res.id); 
        if (foundComanda !==-1){
          comenzi[foundComanda]=res
        }else{
          comenzi.unshift(res)     
        }
        return comenzi
      })
      .then((comenzi)=>{
        setOrdersSuccess(comenzi)
        props.enqueueSnackbar('Trimitere cu succes',{ 
          variant: 'success',
          autoHideDuration:3000
        })
      })
    //-----update indicator comenzi noi la 1
    await strapi.updateEntry('indicators',1,{
      'Valoare': 1,
    } )
      .catch(e=>{
        props.enqueueSnackbar(`Eroare : nu am putut reseta indicatorul de comenzi noi.(${e})`,{ 
          variant: 'error',
          persist:true,
        })
        setLoading(false)
      })
      .then(()=>{
        props.enqueueSnackbar('Trimitere cu success',{ 
          variant: 'success',
          autoHideDuration:1500
        })
      })

    // props.closeSnackbar()
   
    setCurrentOrder({})
    setTimeout(()=>{
      setButtonDisabled(false)
      setOverlaySpinner(false)
      history.push('/orders')
    },1000)
  }

  //-------------------------------------------------------------------------------------------------------
  const trimiteComanda=async ()=>{
    confirmAlert({
      title: 'Confirmare trimitere comanda',
      message: 'Odata transmisa, o comanda nu mai poate suferi modificari si va fi considerata o comanda ferma. Sunteti sigur ca doriti sa trimiteti aceasta comanda?',
      buttons: [
        {
          label: 'Da',
          onClick: async() => {
            setButtonDisabled(true)
            handleTrimite() 
            
          
          }
        },
        {
          label: 'Nu',
          onClick: () => {
            enqueueSnackbar('Operatia de transmitere a fost anulata.',{ 
              variant: 'warning',
              autoHideDuration:3000
            })    
          }
        }
      ]
    });
    setButtonDisabled(false)
  }
  //----------------------------------------------------------------------------------------------------
  const vanzatorVizibilitate=()=>{
    const {currentUser}=props;
    if(currentUser.role.name==='Vanzator'){
      return false;
    }else{
      return true;
    }
  }


  return ( 
    <Card
      className={classes.alignButton}
    >
      <Divider />
      <CardContent className={classes.container}>
        <div style={{display:'flex'}}>
          <Fab 
            aria-label="like" 
            className={classes.fab} 
            disabled={currentOrder.stadiu!=='TRANSMISA' && vanzatorVizibilitate()?buttonDisabled:true}
            onClick={trimiteComanda}
            size="small"
            variant="extended"
          >
            <SendIcon 
              className={classes.extendedIconOrange} 
            />
      Trimite
          </Fab>       
        </div>
        <div style={{display:'flex'}}>
          <Fab 
            aria-label="like" 
            className={classes.fab} 
            disabled={currentOrder.stadiu!=='TRANSMISA' ?buttonDisabled:true}
            onClick={handleSave}
            size="small"
            variant="extended"
          >
            <SaveIcon className={classes.extendedIconGreen} />
            Salvare
          </Fab>        
          <Fab 
            aria-label="like" 
            className={classes.fab} 
            disabled={buttonDisabled}
            onClick={handleCancel}
            size="small"
            variant="extended"
          >
            <CancelIcon className={classes.extendedIconRed} />
            Abandon
          </Fab>   
        </div>        
      </CardContent>
    </Card>
  
  );
 
}

OrderFooter.propTypes = {
  className: PropTypes.string,
  currentOrder:PropTypes.object,
  deletedItems:PropTypes.array, 
  enqueueSnackbar:PropTypes.func,
  history:PropTypes.object,
  orders:PropTypes.array,
  setDeletedItems:PropTypes.func, 
  setOrdersSuccess:PropTypes.func, 
  updatedOrder:PropTypes.object
};


const mapStateToProps=state=>({
  currentUser:selectCurrentUser(state),
  currentOrder:selectOrderCurrentOrder(state),
  updatedOrder:selectOrderUpdatedOrder(state),
  orders:selectOrderOrders(state),
  deletedItems:selectOrderDeletedItems(state),
})

const mapDispatchToProps=dispatch=>({
  setCurrentOrder:order=>dispatch(setCurrentOrder(order)),
  setUpdatedOrder:order=>dispatch(setUpdatedOrder(order)),
  setOrdersSuccess:orders=>dispatch(setOrdersSuccess(orders)),
  setDeletedItems:items=>dispatch(setDeletedItems(items)),
  setOverlaySpinner:bool=>dispatch(setOverlaySpinner(bool)),
  setLoading:boll=>dispatch(setLoading(boll)),
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withSnackbar(OrderFooter)));
