/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import Popup from 'reactjs-popup'
import {connect} from 'react-redux';
import {dynamicSort} from '../../../../utils/functiiComune';
import {selectOrderCurrentProduct, selectOrderCurrentOrder, selectOrderCurrentItem} from '../../../../redux/order/order.selectors'
import {selectLookupOptionale, selectLookupMateriale} from '../../../../redux/lookup/lookup.selectors'
import {selectOtherLoading,selectOtherOpenEditItem, selectOtherErrors} from '../../../../redux/other/other.selectors'
import {selectCurrentUser} from '../../../../redux/user/user.selectors'
import {setLoading,setOpenEditItem, setErrors, resetErrors, setErrorsAsync} from '../../../../redux/other/other.actions'
import {setCurrentItem} from '../../../../redux/order/order.actions'
import {mpJV, actJV, pretJV, carucioareJV} from './functii';
import './reperedit.css';
import debounce from 'lodash.debounce'
import {validation} from './validation'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  InputAdornment,
  colors,
  Hidden
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { ContactSupportOutlined } from '@material-ui/icons';


class ReperEdit extends React.Component {
  constructor(props) {
    super(props);  
    this.fieldsMaterial = { text: 'denumire', value: 'key' };
    this.fieldsDeschidere={ text: 'denumire', value: 'value' };
    this.deschideri=[
      {denumire:'1',key:'1', atentionare:'Ati selectat o actionare prin care lamelele se vor strange in partea cu snurul de actionare (stanga sau dreapta).'},
      {denumire:'2',key:'2', atentionare:'Ati selectat o actionare prin care lamelele se vor strange in partea opusa snurului de actionare (stanga sau dreapta).'},
      {denumire:'3',key:'3', atentionare:'Ati selectat o actionare prin care lamelele se vor strange stanga-dreapta, tip[ Cortina (jumatate stangasi cealata jumatate in dreapta).'}, 
      {denumire:'4',key:'4', atentionare:'Ati selectat o actionare prin care lamelele se vor strange invers tip Cortina (toate pe mijlocul garnisei).'},
      {denumire:'L',key:'L', atentionare:'Doriti sa dati in executie doar lamelele de jaluzele, fara garnisa (trebuie sa introduceti la casuta Lungime numarul de lamele, ex.23).'}, 
      {denumire:'DA',key:'DA', atentionare:'Doriti sa dati in executie o garnisa cu dubla actionare (snurul de actionare de ambele parti, care actioneaza independent lungimi diferite de garnisa).'}]
    this.tipConsole=[
      {denumire:'SIMPLE 10cm', key:1},
      {denumire:'REGLABILE 10-15cm', key:2},
      {denumire:'PRELUNGITOR 10-20cm', key:3}
    ]

  }


  
  //-------------------------------------------------------------------------------------------------------------------
    onChangeMaterial= (e)=>{ 
      e.persist()
      const {setCurrentItem, currentItem, materiale}=this.props;
      let key = 'material';
      let key2='denumireMaterial'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?materiale.filter(mat=>mat.denumire===e.target.value)[0].key:0
        value2=e.target.value?e.target.value:''

        if( currentItem.idCod || currentItem.denumireCod || currentItem.NrLam) {
          setCurrentItem({...currentItem, [key]: value, [key2]:value2, idCod:0, denumireCod:'', NrLam:0})
        } else{
          setCurrentItem({...currentItem, [key]: value, [key2]:value2});
        }
      }
      debounce(this.calculPretCatalog,500)()
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        this.handleAtentionareMaterial(e)
      }, 501);
    }

     //-------------------------------------------------------------------------------------------------------------------
     onChangeMaterial2= (e)=>{ 
       e.persist()
       const {setCurrentItem, currentItem, materiale}=this.props;
       let key = 'material2';
       let key2='denumireMaterial2'
       let value=null;
       let value2='';
       if (currentItem){
         value = e.target.value?materiale.filter(mat=>mat.denumire===e.target.value)[0].key:0
         value2=e.target.value?e.target.value:''
         
         if( currentItem.idCod2 || currentItem.denumireCod2 || currentItem.NrLam2) {
           setCurrentItem({...currentItem, [key]: value, [key2]:value2, idCod2:0, denumireCod2:'', NrLam2:0})
         } else{
           setCurrentItem({...currentItem, [key]: value, [key2]:value2});
         }
       }
       debounce(this.calculPretCatalog,500)()
       setTimeout(() => {
         validation(this.props.currentItem,this.props.errors,this.props.setErrors)
         this.handleAtentionareMaterial(e)
       }, 501);
     }

      //-------------------------------------------------------------------------------------------------------------------
      onChangeMaterial3= (e)=>{ 
        e.persist()
        const {setCurrentItem, currentItem, materiale}=this.props;
        let key = 'material3';
        let key2='denumireMaterial3'
        let value=null;
        let value2='';
        if (currentItem){
          value = e.target.value?materiale.filter(mat=>mat.denumire===e.target.value)[0].key:0
          value2=e.target.value?e.target.value:''

          if( currentItem.idCod3 || currentItem.denumireCod3 || currentItem.NrLam3) {
            setCurrentItem({...currentItem, [key]: value, [key2]:value2, idCod3:0, denumireCod3:'', NrLam3:0})
          } else{
            setCurrentItem({...currentItem, [key]: value, [key2]:value2});
          }
        }
        debounce(this.calculPretCatalog,500)()
        setTimeout(() => {
          validation(this.props.currentItem,this.props.errors,this.props.setErrors)
          this.handleAtentionareMaterial(e)
        }, 501);
      }
    //-------------------------------------------------------------------------------------------------------------------
    onChangeCod= (e)=>{ 
      e.persist()
      const {setCurrentItem, currentItem, materiale}=this.props;
      let key = 'idCod';
      let key2='denumireCod'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?materiale.filter(material=>material.key===currentItem.material)[0].coduris.filter(cod=>cod.denumire===e.target.value && cod.tipProdus==='jv' )[0].key:0
        value2=e.target.value?e.target.value:''
        if(currentItem.NrLam) {
          setCurrentItem({...currentItem, [key]: value, [key2]:value2});
        } else{
          setCurrentItem({...currentItem, [key]: value, [key2]:value2 , NrLam:this.handleCarucioare()})
        }
      }

      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        this.handleAtentionareCod(e)
      }, 501);
    }
     //-------------------------------------------------------------------------------------------------------------------
     onChangeCod2= (e)=>{ 
       e.persist()
       const {setCurrentItem, currentItem, materiale}=this.props;
       let key = 'idCod2';
       let key2='denumireCod2'
       let value=null;
       let value2='';
       if (currentItem){
         value = e.target.value?materiale.filter(material=>material.key===currentItem.material2)[0].coduris.filter(cod=>cod.denumire===e.target.value && cod.tipProdus==='jv' )[0].key:0
         value2=e.target.value?e.target.value:''
       }
       setCurrentItem({...currentItem, [key]: value, [key2]:value2})
       setTimeout(() => {
         validation(this.props.currentItem,this.props.errors,this.props.setErrors)
         this.handleAtentionareCod2(e)
       }, 501);
     }
    //-------------------------------------------------------------------------------------------------------------------
    onChangeCod3= (e)=>{ 
      e.persist()
      const {setCurrentItem, currentItem, materiale}=this.props;
      let key = 'idCod3';
      let key2='denumireCod3'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?materiale.filter(material=>material.key===currentItem.material3)[0].coduris.filter(cod=>cod.denumire===e.target.value && cod.tipProdus==='jv' )[0].key:0
        value2=e.target.value?e.target.value:''
      }
      setCurrentItem({...currentItem, [key]: value, [key2]:value2})
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        this.handleAtentionareCod3(e)
      }, 501);
    }

    //-------------------------------------------------------------------------------------------------------------------
    onChangeTipConsole= (e)=>{ 
      e.persist()
      const {setCurrentItem, currentItem}=this.props;
      let key = 'TipConsole';
      let key2='denumireConsole'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?this.tipConsole.filter(tip=>tip.denumire===e.target.value)[0].key:0
        value2=e.target.value?e.target.value:''
      }
      setCurrentItem({...currentItem, [key]: value, [key2]:value2})
    }

    //-------------------------------------------------------------------------------------------------------------------
    
    onChangeDeschidere= (e)=>{
      e.persist()
      const {setCurrentItem, currentItem}=this.props;
      let key = 'deschidere';
      let value = ''; 
      if (currentItem){
        value=e.target.value
      }
      setCurrentItem({...currentItem, [key]: value})
      debounce(this.calculPretCatalog,500)()
      setTimeout(() => {
        this.handleAtentionareDeschidere(e)
      }, 501);
    }
    //-------------------------------------------------------------------------------------------------------------------
    onChange= (e)=> {
      let key = e.target.name;
      let value = e.target.value;
      this.props.setCurrentItem({...this.props.currentItem, [key]: value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}) 
      if(key==='console'){
        debounce(this.handleAtentionareConsole,500)()
        debounce(this.calculPretCatalog,500)()
      }

      if(key==='inaltime'){
        debounce(this.calculLungimeSnur,500)()
        debounce(this.calculPretCatalog,500)()
        debounce(this.calculMp,500)()
      }
      if(key==='lungime'){
        debounce(this.calculLungimeSnur,500)()
        debounce(this.calculPretCatalog,500)()
        debounce(this.calculMp,500)()
      }
      if(key==='buc'){
        debounce(this.calculPretCatalog,500)()
        debounce(this.calculMp,500)()
      }

      if(key==='NrLam' || key==='NrLam2' || key==='NrLam3' ){
        debounce(this.calculPretCatalog,500)()
      }

      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
      }, 50);
    }
    //-------------------------------------------------------------------------------------------------------------------
    calculLungimeSnur= async ()=>{
      const {setCurrentItem,currentItem}=this.props;
      setCurrentItem({...currentItem, lungimeSnur:actJV(currentItem.inaltime)})  
    }
    //-------------------------------------------------------------------------------------------------------------------
    calculMp= async ()=>{
      const {setCurrentItem,currentItem}=this.props;
      setCurrentItem({...currentItem, mp:mpJV(currentItem.lungime, currentItem.inaltime,currentItem.deschidere)})  
    }
    //-------------------------------------------------------------------------------------------------------------------
    calculPretCatalog= async()=>{
      const pretConsole=this.props.optionale.filter(optional=>optional.key===1)[0].pret 
      
      const {currentItem, setCurrentItem, materiale,currentUser}=this.props 
      const pretMaterialSelectat1=materiale.filter(mat=>(mat.key===currentItem.material))[0]?materiale.filter(mat=>(mat.key===currentItem.material))[0].pret:0
      const pretMaterialSelectat2=materiale.filter(mat=>(mat.key===currentItem.material2))[0]?materiale.filter(mat=>(mat.key===currentItem.material2))[0].pret:0
      const pretMaterialSelectat3=materiale.filter(mat=>(mat.key===currentItem.material3))[0]?materiale.filter(mat=>(mat.key===currentItem.material3))[0].pret:0
      const discount=currentUser.idFirma.discountJV
      const adaos=currentUser.idFirma.adaosJV
      const nrTotalLamele = (currentItem.NrLam*1 || 0) + (currentItem.NrLam2*1 || 0) + (currentItem.NrLam3*1 || 0)
      console.log(nrTotalLamele,'nrTotalLamele')

      const proportieLam1= (nrTotalLamele && currentItem.NrLam)? currentItem.NrLam*1/nrTotalLamele:1
      const proportieLam2= (nrTotalLamele && currentItem.NrLam2)? currentItem.NrLam2*1/nrTotalLamele:0
      const proportieLam3= (nrTotalLamele&& currentItem.NrLam3)? currentItem.NrLam3*1/nrTotalLamele:0
      console.log(proportieLam1,'proportieLam1')
      console.log(proportieLam2,'proportieLam2')
      console.log(proportieLam3,'proportieLam3')

      const pretCatalog1=pretJV(mpJV(currentItem.lungime, currentItem.inaltime, currentItem.deschidere),pretMaterialSelectat1,0,0,currentItem.buc) * proportieLam1
      console.log(pretCatalog1,'pretCatalog1')
      const pretCatalog2=pretJV(mpJV(currentItem.lungime, currentItem.inaltime, currentItem.deschidere),pretMaterialSelectat2,0,0,currentItem.buc)* proportieLam2
      console.log(pretCatalog2,'pretCatalog2')
      const pretCatalog3=pretJV(mpJV(currentItem.lungime, currentItem.inaltime, currentItem.deschidere),pretMaterialSelectat3,0,0,currentItem.buc)* proportieLam3
      console.log(pretCatalog3,'pretCatalog3')
      const pretCatalogConsole=pretJV(0,0,currentItem.console,pretConsole,currentItem.buc)
      console.log(pretCatalogConsole,'pretCatalogConsole')
      const pretCatalog=(pretCatalog1*1 + pretCatalog2*1 + pretCatalog3*1 + pretCatalogConsole*1).toFixed(2)
      console.log(pretCatalog,'pretCatalog')
      
      const pretCuDiscount=(pretCatalog*(1-(discount?discount/100:0))).toFixed(2)
      const pretClientFinal=(pretCatalog*(1+(adaos?adaos/100:0))).toFixed(2)
      setCurrentItem({...currentItem, pretCatalog:pretCatalog,pretCuDiscount:pretCuDiscount,pretClientFinal:pretClientFinal})
    }
     
    //-------------------------------------------------------------------------------------------------------------------  
    closeModal=()=> {
      const {setOpenEditItem}=this.props;
      setOpenEditItem({open:false, title:'',add:true});
    } 
    //-------------------------------------------------------------------------------------------------------------------
    handlerSumbit=async (e)=>{
      e.preventDefault()
      const {openEditItem, adaugaItem, modificaItem, enqueueSnackbar, currentItem}=this.props;
      const validare=await validation(this.props.currentItem,this.props.errors,this.props.setErrors)
      
      if (validare===false){
        enqueueSnackbar('Datele introduse nu respecta regulile de validare. Nu se poate salva inregistrarea.',{ 
          variant: 'error',
        })
        return 
      }

       
      if (((currentItem.NrLam || 0)*1 + (currentItem.NrLam2 || 0)*1 + (currentItem.NrLam3 ||0)*1)!==this.handleCarucioare()){
        enqueueSnackbar('Numarul total de lamele trebuie sa fie egal cu numarul de carucioare:'+ this.handleCarucioare()  + ' # Nr total lamele: '+ (currentItem.NrLam*1 + currentItem.NrLam2*1 + currentItem.NrLam3*1) +' !',{ 
          variant: 'error',
        })
        return 
      }
      if(openEditItem.add===true){
        return adaugaItem()
      }else{
        return modificaItem()
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handlerKeyDown=(e)=>{
      if(e.keyCode === 13) {
        e.preventDefault();
        return false;
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareMaterial=(e)=>{
      const {currentItem, materiale, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=materiale.filter(mat=>mat.denumire===e.target.value)[0].atentionare
          var denumireMaterial=materiale.filter(mat=>mat.denumire===e.target.value)[0].denumire 
        }
        if(mesaj){
          enqueueSnackbar(denumireMaterial+':'+mesaj,{ 
            variant: 'warning',
          },15000)
        } 
      }
    }
   
    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareCod=(e)=>{
      const {currentItem, materiale, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=materiale.filter(material=>material.denumire===currentItem.material)[0]?materiale.filter(material=>material.denumire===currentItem.material)[0].coduris.filter(cod=>cod.denumire===currentItem.idcod && cod.activ==='DA')[0].atentionare:''
          var denumireCod=materiale.filter(material=>material.denumire===currentItem.material)[0]?materiale.filter(material=>material.denumire===currentItem.material)[0].coduris.filter(cod=>cod.denumire===currentItem.idcod && cod.activ==='DA')[0].denumire:''
        }
        if(mesaj){
          enqueueSnackbar(denumireCod+':'+mesaj,{ 
            variant: 'warning',
          },20000)
        }
      }
    }

    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareCod2=(e)=>{
      const {currentItem, materiale, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=materiale.filter(material=>material.denumire===currentItem.material2)[0]?materiale.filter(material=>material.denumire===currentItem.material2)[0].coduris.filter(cod=>cod.denumire===currentItem.idcod && cod.activ==='DA')[0].atentionare:''
          var denumireCod=materiale.filter(material=>material.denumire===currentItem.material2)[0]?materiale.filter(material=>material.denumire===currentItem.material2)[0].coduris.filter(cod=>cod.denumire===currentItem.idcod && cod.activ==='DA')[0].denumire:''
        }
        if(mesaj){
          enqueueSnackbar(denumireCod+':'+mesaj,{ 
            variant: 'warning',
          },20000)
        }
      }
    }

    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareCod3=(e)=>{
      const {currentItem, materiale, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=materiale.filter(material=>material.denumire===currentItem.material3)[0]?materiale.filter(material=>material.denumire===currentItem.material3)[0].coduris.filter(cod=>cod.denumire===currentItem.idcod && cod.activ==='DA')[0].atentionare:''
          var denumireCod=materiale.filter(material=>material.denumire===currentItem.material3)[0]?materiale.filter(material=>material.denumire===currentItem.material3)[0].coduris.filter(cod=>cod.denumire===currentItem.idcod && cod.activ==='DA')[0].denumire:''
        }
        if(mesaj){
          enqueueSnackbar(denumireCod+':'+mesaj,{ 
            variant: 'warning',
          },20000)
        }
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareDeschidere=(e)=>{
      const {currentItem, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=this.deschideri.filter(des=>des.denumire===e.target.value)[0].atentionare
          var denumireDeschidere=this.deschideri.filter(des=>des.denumire===e.target.value)[0].denumire 
        }
        if(mesaj){
          enqueueSnackbar('Tip deschidere: ' + denumireDeschidere+' - '+ mesaj,{ 
            variant: 'warning',
          },20000)
        }
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareConsole=(e)=>{
      const {enqueueSnackbar}=this.props
      enqueueSnackbar('Va rugam sa specificati la observatii ce tip de console se doresc: SIMPLE 10cm , REGLABILE 10-15cm, PRELUNGITOR 10-20cm.',{ 
        variant: 'warning',
      },20000)
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleCarucioare=()=>{
      const {currentItem, materiale}=this.props
      let tipMaterial = materiale.filter(material=>material.key===currentItem.material)[0] ? materiale.filter(material=>material.key===currentItem.material)[0].tipMaterial:'0'
      return carucioareJV(currentItem.lungime, currentItem.deschidere, tipMaterial)*1
    }

    //----------------------------------------------------------------------------------------------------
    vanzatorVizibilitate=()=>{
      const { currentUser}=this.props;
      if(currentUser.role.name==='Vanzator'){
        return false;
      }else{
        return true;
      }
    }

    render() { 
      const {currentItem, openEditItem, materiale, errors}=this.props   
      return (
        <Popup
          closeOnDocumentClick={false}
          /* onclose={}*/
          open={openEditItem.open}
        >
          <Card>
            <form
              autoComplete="off"
              onSubmit={this.handlerSumbit}
            >
              <CardHeader 
                title={openEditItem.title.toUpperCase()}
              />
              <Divider />
              <CardContent style={{overflow:'scroll', maxHeight:'350px'}} >
                <Grid
                  container
                  spacing={1}
                >
                  {/** ---------------------- LATIME-------------------------- **/}
                  <Grid
                    item
                    lg={2}
                    xs={12}
                  >
                    <TextField
                      autoFocus
                      error={errors.m1m.mesaj || errors.m2m.mesaj?true:false}
                      fullWidth
                      helperText={errors.m1m.mesaj?errors.m1m.mesaj:'' + errors.m2m.mesaj?errors.m2m.mesaj:''}
                      InputLabelProps={{shrink:true}}
                      inputProps={{style: { textAlign: 'right' }}}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      label="Latime(garnisa)"
                      margin="dense"
                      name="lungime"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      required
                      value={currentItem.lungime || ''}
                      variant="outlined"
                      
                    />
                  </Grid>
                  {/** ---------------------- INALTIME -------------------------- **/}
                  <Grid
                    item
                    lg={2}
                    xs={12}
                  >
                    <TextField
                      error={errors.m3m.mesaj || errors.m4m.mesaj?true:false}
                      fullWidth
                      helperText={errors.m3m.mesaj?errors.m3m.mesaj:'' + errors.m4m.mesaj?errors.m4m.mesaj:''}
                      InputLabelProps={{shrink:true}}
                      inputProps={{style: { textAlign: 'right' }}}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      label="Inaltime"
                      margin="dense"
                      name="inaltime"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      required={currentItem.denumireMaterial!=='GARNISA' ?true:false}
                      value={currentItem.inaltime || ''}
                      variant="outlined"
                    />
                  </Grid>
                  {/** ---------------------- TIP DESCHIDERE -------------------------- **/}
                  <Grid
                    item
                    lg={1}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{shrink:true}}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">T</InputAdornment>,
                      }}
                      label="Tip desc."
                      margin="dense"
                      name="deschidere"
                      onChange={this.onChangeDeschidere}
                      required
                      select
                      SelectProps={{
                        native: true,
                        MenuProps: {
                        }
                      }}
                      value={currentItem.deschidere || ''}
                      variant="outlined"
                    >
                      <option
                        key={''}
                        value={''}
                      >
                        {''}
                      </option>
                      {this.deschideri.map(option => (
                        <option
                          key={option.key}
                          value={option.denumire}
                        >
                          {option.denumire}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  {/** ---------------------- COD CULOARE (DEZACTIVAT) -------------------------- **/}
                  {/** fost cod culoare vechi
                  <Grid
                    item
                    lg={1}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{shrink:true}}
                      label=" Cod culoare"
                      margin="dense"
                      name="codMaterial"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      value={currentItem.codMaterial || ''}
                      variant="outlined"
                    />
                  </Grid> 
                     **/}

                  {/** ---------------------- LUNGIME SNUR -------------------------- **/}
                  <Grid
                    item
                    lg={2}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{shrink:true}}
                      inputProps={{style: { textAlign: 'right' }}}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      label="Lungime snur"
                      margin="dense"
                      name="lungimeSnur"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      value={currentItem.lungimeSnur || ''}
                      variant="outlined"
                    />
                  </Grid>
                  {/** ---------------------- CONSOLE -------------------------- **/}
                  <Grid
                    item
                    lg={1}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{
                        shrink:true
                      }}
                      inputProps={{style: { textAlign: 'right' }}}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">cons.</InputAdornment>,
                      }}
                      label="Console"
                      margin="dense"
                      name="console"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      value={currentItem.console || ''}
                      variant="outlined"
                    />
                  </Grid>
                  {/** ---------------------- TIP CONSOLE -------------------------- **/}
                  <Grid
                    item
                    lg={2}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{shrink:true}}
                      label="Tip console"
                      margin="dense"
                      name="TipConsole"
                      onChange={this.onChangeTipConsole}
                      required={currentItem.console >0 ?true:false}
                      select
                      SelectProps={{
                        native: true,
                        MenuProps: {
                        }
                      }}
                      value={currentItem.denumireConsole || ''}
                      variant="outlined"
                    > 
                      <option
                        key={null}
                        value={''}
                      >
                        {''}
                      </option>
                      {this.tipConsole.map(option => (
                        <option
                          key={option.key}
                          value={option.denumire}
                        >
                          {option.denumire}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                 
                  {/** ------------------------------------------ GRUP MATERIAL 1 ------------------------- -------------------------- **/}
                  <Grid
                    container
                    spacing={1}
                  >
                    {/** ---------------------- MATERIAL 1 -------------------------- **/}
                    <Grid
                      item
                      lg={2}
                      xs={6}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Material 1"
                        margin="dense"
                        name="material"
                        onChange={this.onChangeMaterial}
                        required
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireMaterial || ''}
                        variant="outlined"
                      > 
                        <option
                          key={null}
                          value={''}
                        >
                          {''}
                        </option>
                        {materiale.filter(material=>material.activ.toUpperCase()!=='NU').sort(dynamicSort('denumire')).map(option => (
                          <option
                            key={option.key}
                            value={option.denumire}
                          >
                            {option.denumire}
                          </option>
                        ))}
                      </TextField>
                    </Grid> 

                    {/** ---------------------- COD 1 -------------------------- **/} 
                    <Grid
                      item
                      lg={2}
                      xs={3}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Cod 1"
                        margin="dense"
                        name="idCod"
                        onChange={this.onChangeCod}
                        required={currentItem.denumireMaterial!=='GARNISA' ?true:false}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireCod || ''}
                        variant="outlined"
                      > 
                        <option
                          key={null}
                          value={''}
                        >
                          {''}
                        </option>
                        {materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material)[0]?
                          materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material)[0].coduris.filter(cod=>cod.activ.toUpperCase()!=='NU' && cod.tipProdus==='jv')[0]?
                            materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material)[0].coduris.filter(cod=>cod.activ.toUpperCase()!=='NU' && cod.tipProdus==='jv').sort(dynamicSort('denumire')).map(option => (
                              <option
                                key={option.key}
                                value={option.denumire}
                              >
                                {option.denumire}
                              </option>
                            )):0:0}
                      </TextField>
                    </Grid>

                    {/** ---------------------- NRLAM 1 -------------------------- **/}
                    <Grid
                      item
                      lg={1}
                      xs={3}
                    >
                      <TextField
                        error={((currentItem.NrLam || 0)*1 + (currentItem.NrLam2 || 0)*1 + (currentItem.NrLam3 ||0)*1)!==this.handleCarucioare()?true:false}
                        fullWidth
                        helperText={((currentItem.NrLam || 0)*1 + (currentItem.NrLam2 || 0)*1 + (currentItem.NrLam3 ||0)*1)!==this.handleCarucioare() && currentItem.denumireCod ?'Lamele # Carucioare!':''}
                        InputLabelProps={{
                          shrink:true
                        }}
                        inputProps={{style: { textAlign: 'right' }}}
                        label="Nr.lam.1"
                        margin="dense"
                        name="NrLam"
                        onBlur={this.calculPretCatalog}
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        required={currentItem.denumireMaterial!=='GARNISA' ?true:false}
                        value={currentItem.NrLam || ''}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>   

                  {/** ------------------------------------------ GRUP MATERIAL 2 ------------------------- -------------------------- **/}
                  <Grid
                    container
                    spacing={1}
                  >
                    {/** ---------------------- MATERIAL 2 -------------------------- **/}
                    <Grid
                      item
                      lg={2}
                      xs={6}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Material 2"
                        margin="dense"
                        name="material2"
                        onChange={this.onChangeMaterial2}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireMaterial2 || ''}
                        variant="outlined"
                      > 
                        <option
                          key={null}
                          value={''}
                        >
                          {''}
                        </option>
                        {materiale.filter(material=>material.activ.toUpperCase()!=='NU').sort(dynamicSort('denumire')).map(option => (
                          <option
                            key={option.key}
                            value={option.denumire}
                          >
                            {option.denumire}
                          </option>
                        ))}
                      </TextField>
                    </Grid> 

                    {/** ---------------------- COD 2 -------------------------- **/} 
                    <Grid
                      item
                      lg={2}
                      xs={3}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Cod 2"
                        margin="dense"
                        name="idCod2"
                        onChange={this.onChangeCod2}
                        required={currentItem.denumireMaterial2?true:false}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireCod2 || ''}
                        variant="outlined"
                      > 
                        <option
                          key={null}
                          value={''}
                        >
                          {''}
                        </option>
                        {materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material2)[0]?
                          materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material2)[0].coduris.filter(cod=>cod.activ.toUpperCase()!=='NU' && cod.tipProdus==='jv')[0]?
                            materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material2)[0].coduris.filter(cod=>cod.activ.toUpperCase()!=='NU' && cod.tipProdus==='jv').sort(dynamicSort('denumire')).map(option => (
                              <option
                                key={option.key}
                                value={option.denumire}
                              >
                                {option.denumire}
                              </option>
                            )):0:0}
                      </TextField>
                    </Grid>

                    {/** ---------------------- NRLAM 2 -------------------------- **/}
                    <Grid
                      item
                      lg={1}
                      xs={3}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{
                          shrink:true
                        }}
                        inputProps={{style: { textAlign: 'right' }}}
                        label="Nr.lam.2"
                        margin="dense"
                        name="NrLam2"
                        onBlur={this.calculPretCatalog}
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        required={currentItem.denumireMaterial2?true:false}
                        value={currentItem.NrLam2 || ''}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid> 
                  
                  {/** ------------------------------------------ GRUP MATERIAL 3 ------------------------- -------------------------- **/}
                  <Grid
                    container
                    spacing={1}
                  >
                    {/** ---------------------- MATERIAL 3 -------------------------- **/}
                    <Grid
                      item
                      lg={2}
                      xs={6}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Material 3"
                        margin="dense"
                        name="material3"
                        onChange={this.onChangeMaterial3}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireMaterial3 || ''}
                        variant="outlined"
                      > 
                        <option
                          key={null}
                          value={''}
                        >
                          {''}
                        </option>
                        {materiale.filter(material=>material.activ.toUpperCase()!=='NU').sort(dynamicSort('denumire')).map(option => (
                          <option
                            key={option.key}
                            value={option.denumire}
                          >
                            {option.denumire}
                          </option>
                        ))}
                      </TextField>
                    </Grid> 

                    {/** ---------------------- COD 3 -------------------------- **/} 
                    <Grid
                      item
                      lg={2}
                      xs={3}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Cod 3"
                        margin="dense"
                        name="idCod3"
                        onChange={this.onChangeCod}
                        required={currentItem.denumireMaterial3?true:false}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireCod3 || ''}
                        variant="outlined"
                      > 
                        <option
                          key={null}
                          value={''}
                        >
                          {''}
                        </option>
                        {materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material3)[0]?
                          materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material3)[0].coduris.filter(cod=>cod.activ.toUpperCase()!=='NU' && cod.tipProdus==='jv')[0]?
                            materiale.filter(material=>material.activ.toUpperCase()!=='NU' && material.key===currentItem.material3)[0].coduris.filter(cod=>cod.activ.toUpperCase()!=='NU' && cod.tipProdus==='jv').sort(dynamicSort('denumire')).map(option => (
                              <option
                                key={option.key}
                                value={option.denumire}
                              >
                                {option.denumire}
                              </option>
                            )):0:0}
                      </TextField>
                    </Grid>

                    {/** ---------------------- NRLAM 3 -------------------------- **/}
                    <Grid
                      item
                      lg={1}
                      xs={3}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{
                          shrink:true
                        }}
                        inputProps={{style: { textAlign: 'right' }}}
                        label="Nr.lam.3"
                        margin="dense"
                        name="NrLam3"
                        onBlur={this.calculPretCatalog}
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        required={currentItem.denumireMaterial3?true:false}
                        value={currentItem.NrLam3 || ''}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>   

                  {/** ---------------------- OBSERVATII -------------------------- **/}
                  <Grid
                    item
                    lg={10}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{
                        shrink:true
                      }}
                      inputProps={{style: { textAlign: 'left' }}}
                     
                      label="Observatii"
                      margin="dense"
                      name="observatii"
                      onChange={this.onChange}
                      value={currentItem.observatii || ''}
                      variant="outlined"
                    />
                  </Grid>
                  
                  {/** ---------------------- CANTITATE -------------------------- **/}
                  <Grid
                    item
                    lg={2}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{
                        shrink:true
                      }}
                      inputProps={{style: { textAlign: 'right' }}}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">buc</InputAdornment>,
                      }}
                      label="Cantitate"
                      margin="dense"
                      name="buc"
                      onBlur={this.calculPretCatalog}
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      required
                      value={currentItem.buc || ''}
                      variant="outlined"
                    />
                  </Grid>
                  {/** ---------------------- CAMPURI DE TOTAL(GRI) -------------------------- **/}
                  <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                  >
                    <Divider style={{background:colors.blueGrey[700]}} />
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    spacing={1}
                    style={{background:colors.blueGrey[100]}} 
                  >
                    <Grid
                      item
                      lg={1}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        inputProps={{style: { textAlign: 'right' }}}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">buc</InputAdornment>,
                          readOnly: true,
                        }}
                        label="Carucioare"
                        margin="dense"
                        name="carucioare"
                        value={this.handleCarucioare()}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      lg={1}
                      xs={12}
                    >
                      <TextField
                      
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        inputProps={{style: { textAlign: 'right' }}}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">mp</InputAdornment>,
                          readOnly: true,
                        }}
                        label="MP/buc"
                        margin="dense"
                        name="mp"
                        onChange={this.onChange} 
                        onKeyDown={this.handlerKeyDown}
                        required
                        value={currentItem.mp || ''}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      lg={1}
                      xs={12}
                    >
                      <TextField
                      
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        inputProps={{style: { textAlign: 'right' }}}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">mp</InputAdornment>,
                          readOnly: true,
                        }}
                        label="TOTAL MP"
                        margin="dense"
                        name="mp"
                        onChange={this.onChange} 
                        onKeyDown={this.handlerKeyDown}
                        required
                        value={currentItem.mp && currentItem.buc? currentItem.mp* currentItem.buc :0}
                        variant="outlined"
                      />
                    </Grid>
                    <Hidden
                      xlDown={!this.vanzatorVizibilitate()}
                      xlUp={!this.vanzatorVizibilitate()}
                    >
                      <Grid
                        item
                        lg={2}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          InputLabelProps={{shrink:true}}
                          inputProps={{style: { textAlign: 'right' }}}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">lei</InputAdornment>,
                            readOnly: true,
                          }}
                          label="Pret catalog"
                          margin="dense"
                          name="pretCatalog"
                          onChange={this.onChange}  
                          onKeyDown={this.handlerKeyDown}
                          required
                          value={currentItem.pretCatalog || 0}
                          variant="outlined"
                        />
                   
                      </Grid>
                      <Grid
                        item
                        lg={2}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          InputLabelProps={{shrink:true}}
                          inputProps={{style: { textAlign: 'right' }}}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">lei</InputAdornment>,
                            readOnly: true,
                          }}
                          label="Pret comanda"
                          margin="dense"
                          name="pretCuDiscount"
                          onChange={this.onChange}  
                          onKeyDown={this.handlerKeyDown}
                          required
                          value={currentItem.pretCuDiscount || 0}
                          variant="outlined"
                        />
                      </Grid>
                    </Hidden>
                    <Grid
                      item
                      lg={2}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        inputProps={{style: { textAlign: 'right' }}}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">lei</InputAdornment>,
                        }}
                        label="Pret client"
                        margin="dense"
                        name="pretClientFinal"
                        onChange={this.onChange}  
                        onKeyDown={this.handlerKeyDown}
                        required
                        value={currentItem.pretClientFinal || 0}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                
              </CardContent>
              <Divider />
              <p>*)rubrica pret client este editabila</p>
              <p style={{color:'maroon'}}>Atentie! Inaltimea trebuie sa cuprinda si grosimea garnisei inclusiv la comenzile care contin doar lamele de material.(Tip desc.: L)</p>
              <CardActions style={{ display:'flex', justifyContent: 'flex-end'}} >
                <Button 
                  color="primary"
                  style={{background:colors.blueGrey[500], color:'white'}}
                  type="submit"
                  variant="contained"
                >
                  Salvare
                </Button>
                <Button 
                  color="primary"
                  onClick={this.closeModal}
                  style={{background:colors.red[900], color:'white'}}
                  variant="contained"
                >
                  Abandon
                </Button>
              </CardActions>
            </form>
          </Card>
        </Popup>
      );
    }

}

const mapStateToProps=state=>({
  currentProduct:selectOrderCurrentProduct(state),
  currentUser:selectCurrentUser(state),
  currentOrder:selectOrderCurrentOrder(state),
  currentItem:selectOrderCurrentItem(state),
  loading:selectOtherLoading(state),
  materiale:selectLookupMateriale(state),
  optionale:selectLookupOptionale(state),
  openEditItem:selectOtherOpenEditItem(state),
  errors:selectOtherErrors(state)
})
  
const mapDispatchToProps=dispatch=>({
  setLoading:boll=>dispatch(setLoading(boll)),
  setCurrentItem:item=>dispatch(setCurrentItem(item)),
  setOpenEditItem:bool=>dispatch(setOpenEditItem(bool)),
  setErrors:error=>dispatch(setErrors(error)),
  resetErrors:()=>dispatch(resetErrors()),
  setErrorsAsync:()=>dispatch(setErrorsAsync()),
})
export default connect(mapStateToProps,mapDispatchToProps)(withSnackbar(ReperEdit));