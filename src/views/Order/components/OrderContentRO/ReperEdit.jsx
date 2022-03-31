/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import Popup from 'reactjs-popup'
import {connect} from 'react-redux';
import {dynamicSort} from '../../../../utils/functiiComune';
import {selectOrderCurrentProduct, selectOrderCurrentOrder, selectOrderCurrentItem} from '../../../../redux/order/order.selectors'
import {selectLookupProduse} from '../../../../redux/lookup/lookup.selectors'
import {selectOtherLoading,selectOtherOpenEditItem, selectOtherErrors} from '../../../../redux/other/other.selectors'
import {selectCurrentUser} from '../../../../redux/user/user.selectors'
import {setLoading,setOpenEditItem, setErrors, resetErrors, setErrorsAsync} from '../../../../redux/other/other.actions'
import {setCurrentItem} from '../../../../redux/order/order.actions'
import {mpRo, pretRo} from './functii';
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


class ReperEdit extends React.Component {
  constructor(props) {
    super(props);
    this.produse=props.produse?props.produse.filter(produs=>produs.tipProdus==='RO'):[];   
  }
  
  //-------------------------------------------------------------------------------------------------------------------
    onChangeTipSubprodus= (e)=>{ 
      e.persist()
      const {setCurrentItem, currentItem}=this.props;
      let key = 'tipSubprodus';
      let key2='denumireSubProdus'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?this.produse.filter(produs=>produs.denumire===e.target.value)[0].key:0
        value2=e.target.value?e.target.value:''
      }
      if(currentItem.material || currentItem.denumireMaterial || currentItem.optional1 || currentItem.denumireOptional1 || currentItem.optional2 || currentItem.denumireOptional2  || currentItem.optional3 || currentItem.denumireOptional3 || currentItem.culoareLamela || currentItem.denumireCuloareLamela || currentItem.actionareStDr || currentItem.ax || currentItem.lungime || currentItem.lungimeFinala || currentItem.inaltime || currentItem.inaltimeFinala || currentItem.codMaterial) {
        setCurrentItem({...currentItem, [key]: value, [key2]:value2, material:0, denumireMaterial:'', optional1:0, denumireOptional1:'', optional2:0, denumireOptional2:'',optional3:0, denumireOptional3:'', culoareLamela:0, denumireCuloareLamela:'', actionareStDr:'', ax:'', lungime:'',lungimeFinala:'',inaltime:'', inaltimeFinala:'', codMaterial:''})
      } else{
        setCurrentItem({...currentItem, [key]: value, [key2]:value2});
      }

      debounce(this.calculPretCatalog,500)()
      debounce(this.calculMp,500)()
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors);
        resetErrors();
        this.handleAtentionareTipSubprodus(e)
      }, 501);
    }

    //-------------------------------------------------------------------------------------------------------------------
    onChangeMaterial= (e)=>{ 
      e.persist()
      const {setCurrentItem, currentItem}=this.props;
      let key = 'material';
      let key2='denumireMaterial'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].materialeCompatibile.filter(material=>material.denumire===e.target.value)[0].key:0
        value2=e.target.value?e.target.value:''
      }
      setCurrentItem({...currentItem, [key]: value, [key2]:value2})
      debounce(this.calculPretCatalog,500)()
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        this.handleAtentionareMaterial(e)
      }, 501);
      
    }

    //-------------------------------------------------------------------------------------------------------------------
    onChangeAx= (e)=>{ 
      e.persist()
      const {setCurrentItem, currentItem}=this.props;
      let key = 'ax';
      let value = e.target.value;
      
      setCurrentItem({...currentItem, [key]: value, optional1:0, denumireOptional1:'', optional2:0, denumireOptional2:'',optional3:0, denumireOptional3:''}) 
      debounce(this.calculPretCatalog,500)()
        
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
      }, 50);
    }


    //-------------------------------------------------------------------------------------------------------------------
    onChangeCuloareLamela= (e)=>{ 
      e.persist() 
      const {setCurrentItem, currentItem}=this.props;
      let key = 'culoareLamela';
      let key2='denumireCuloareLamela'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].culoriCompatibile.filter(culoare=>culoare.denumire===e.target.value && culoare.componenta==='COMPONENTA' )[0].key:0
        value2=e.target.value?e.target.value:''
      }
      setCurrentItem({...currentItem, [key]: value, [key2]:value2})
      debounce(this.calculPretCatalog,500)()
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        this.handleAtentionareCuloareLamela(e)
      }, 501);
      
    }
    //-------------------------------------------------------------------------------------------------------------------
    
    onChangeOptional1= (e)=>{ 
      e.persist()
      const {setCurrentItem, currentItem}=this.props;
      let key = 'optional1';
      let key2='denumireOptional1'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.denumire===e.target.value)[0].key:0
        value2=e.target.value?e.target.value:''
      }
      setCurrentItem({...currentItem, [key]: value, [key2]:value2})
      debounce(this.calculPretCatalog,500)()
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        this.handleAtentionareOptional1(e)
      }, 501);
      
    }

    //-------------------------------------------------------------------------------------------------------------------
    
    onChangeOptional2= (e)=>{
      e.persist() 
      const {setCurrentItem, currentItem}=this.props;
      let key = 'optional2';
      let key2='denumireOptional2'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.denumire===e.target.value)[0].key:0
        value2=e.target.value?e.target.value:''
      }
      setCurrentItem({...currentItem, [key]: value, [key2]:value2})
      debounce(this.calculPretCatalog,500)()
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        this.handleAtentionareOptional2(e)
      }, 501);
      
    }
    //-------------------------------------------------------------------------------------------------------------------
    
    onChangeOptional3= (e)=>{
      e.persist() 
      const {setCurrentItem, currentItem}=this.props;
      let key = 'optional3';
      let key2='denumireOptional3'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.denumire===e.target.value)[0].key:0
        value2=e.target.value?e.target.value:''
      }
      setCurrentItem({...currentItem, [key]: value, [key2]:value2})
      debounce(this.calculPretCatalog,500)()
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        this.handleAtentionareOptional3(e)
      }, 501);
      
    }
    //-------------------------------------------------------------------------------------------------------------------
    onChange= (e)=> {
      let key = e.target.name;
      let value = e.target.value;
      this.props.setCurrentItem({...this.props.currentItem, [key]: value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}) 
      if(key==='lungime' || key==='lungimeFinala' || key==='inaltime' || key==='inaltimeFinala' || key==='ax' || key==='buc'){
        debounce(this.calculPretCatalog,500)()
        debounce(this.calculMp,500)()
      }
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
      }, 50);
    }
   
    //-------------------------------------------------------------------------------------------------------------------
    calculMp= async ()=>{
      const {setCurrentItem,currentItem}=this.props;
      setCurrentItem({...currentItem, mp:mpRo(currentItem.lungime,currentItem.lungimeFinala, currentItem.inaltime, currentItem.inaltimeFinala,currentItem.tipSubprodus, currentItem.ax)}) 
    }
    //-------------------------------------------------------------------------------------------------------------------
    calculPretCatalog= async()=>{      
      const {currentItem, setCurrentItem,currentUser}=this.props 
      const discount=currentUser.idFirma.discountRO
      const adaos=currentUser.idFirma.adaosRO
      const pretCatalog=pretRo(this.produse, currentItem.tipSubprodus, currentItem.material, currentItem.lungime, currentItem.lungimeFinala, currentItem.inaltime, currentItem.inaltimeFinala, currentItem.ax, currentItem.optional1, currentItem.optional2, currentItem.optional3,currentItem.culoareLamela, currentItem.buc).toFixed(2);
      const pretCuDiscount=(pretCatalog*(1-(discount?discount/100:0))).toFixed(2)
      const pretClientFinal=(pretCatalog *(1+(adaos?adaos/100:0))).toFixed(2)
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
      const {openEditItem, adaugaItem, modificaItem, enqueueSnackbar}=this.props;
      const validare=await validation(this.props.currentItem,this.props.errors,this.props.setErrors)
      
      if (validare===false){
        enqueueSnackbar('Datele introduse nu respecta regulile de validare. Nu se poate salva inregistrarea.',{ 
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
    handleAtentionareTipSubprodus=(e)=>{
      const {currentItem, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].atentionare:''
          var denumireTipSubprodus=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].denumire:''
        }
        if(mesaj){
          enqueueSnackbar(denumireTipSubprodus+':'+mesaj,{ 
            variant: 'warning',
          },20000)
        }
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    
    handleAtentionareMaterial=(e)=>{
      const {currentItem, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].materialeCompatibile.filter(material=>material.key===currentItem.material)[0].atentionare:''
          var denumireMaterial=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].materialeCompatibile.filter(material=>material.key===currentItem.material)[0].denumire:''
        }
        if(mesaj){
          enqueueSnackbar(denumireMaterial+':'+mesaj,{ 
            variant: 'warning',
          },15000)
        }
      }
    }

    //-------------------------------------------------------------------------------------------------------------------

    handleAtentionareCuloareLamela=(e)=>{
      const {currentItem, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].culoriCompatibile.filter(culoare=>culoare.key===currentItem.culoareLamela && culoare.componenta==='COMPONENTA' && culoare.activ==='DA')[0].atentionare:''
          var denumireCuloareLamela=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].culoriCompatibile.filter(culoare=>culoare.key===currentItem.culoareLamela && culoare.componenta==='COMPONENTA' && culoare.activ==='DA')[0].denumire:''
        }
        if(mesaj){
          enqueueSnackbar(denumireCuloareLamela+':'+mesaj,{ 
            variant: 'warning',
          },20000)
        }
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareOptional1=(e)=>{
      const {currentItem, produse, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.key===currentItem.optional1 && optional.ax===currentItem.ax)[0].atentionare:''
          var denumireOptional1=produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.key===currentItem.optional1 && optional.ax===currentItem.ax)[0].denumire :''
        }
        if(mesaj){
          enqueueSnackbar(denumireOptional1+':'+mesaj,{ 
            variant: 'warning',
          },15000)
        }
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareOptional2=(e)=>{
      const {currentItem, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.key===currentItem.optional2 && optional.ax===currentItem.ax)[0].atentionare:''
          var denumireOptional2=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.key===currentItem.optional2 && optional.ax===currentItem.ax)[0].denumire :''
        }
        if(mesaj){
          enqueueSnackbar(denumireOptional2+':'+mesaj,{ 
            variant: 'warning',
          },15000)
        }
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleAtentionareOptional3=(e)=>{
      const {currentItem, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.key===currentItem.optional3 && optional.ax===currentItem.ax)[0].atentionare:''
          var denumireOptional3=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].optionaleCompatibile.filter(optional=>optional.key===currentItem.optional3 && optional.ax===currentItem.ax)[0].denumire :''
        }
        if(mesaj){
          enqueueSnackbar(denumireOptional3+':'+mesaj,{ 
            variant: 'warning',
          },15000)
        }
      }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleCotePanza=()=>{
      const {currentItem, produse}=this.props;
      if (currentItem){
        if(currentItem.tipSubprodus){
          let cotePanza=produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].cotePanza:'DA'
          return cotePanza==='NU'? true:false
        }
        return false
      }
    }
     //-------------------------------------------------------------------------------------------------------------------
     handleCoteFinale=()=>{
       const {currentItem}=this.props;
       if (currentItem){
         if(currentItem.tipSubprodus){
           let coteFinale=this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0]?this.produse.filter(produs=>produs.denumire===currentItem.denumireSubProdus)[0].coteFinale:'NU'
           return coteFinale==='NU'? true:false
         }
         return true
       }
     }
      //-------------------------------------------------------------------------------------------------------------------
      handleActionare=()=>{
        const {currentItem}=this.props;
        if (currentItem){
          if(currentItem.tipSubprodus){
            let dezactivareActionare=[7,8].includes(currentItem.tipSubprodus)?true:false
            return dezactivareActionare
          }
          return false
        }
      }
       //-------------------------------------------------------------------------------------------------------------------
       handleAx=()=>{
         const {currentItem}=this.props;
         if (currentItem){
           if(currentItem.tipSubprodus){
             let dezactivareAx=[7,8].includes(currentItem.tipSubprodus)?true:false
             return dezactivareAx
           }
           return false
         }
       }

       handleLungimeRequired=()=>{
         const {currentItem}=this.props;
         if (currentItem){
           if(currentItem.tipSubprodus){
             let require=[1,4].includes(currentItem.tipSubprodus)?false:true
             return require
           }
           return true
         }
       }

       handleInaltimeRequired=()=>{
         const {currentItem}=this.props;
         if (currentItem){
           if(currentItem.tipSubprodus){
             let require=[1,4].includes(currentItem.tipSubprodus)?false:true
             return require
           }
           return true
         }
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
        const {currentItem, openEditItem, errors}=this.props   
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

                    <Grid
                      item
                      lg={4}
                      xs={12}
                    >
                      <TextField
                        autoFocus
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Tip roleta"
                        margin="dense"
                        name="tipSubprodus"
                        onChange={this.onChangeTipSubprodus}
                        required
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireSubProdus || ''}
                        variant="outlined"
                      >
                        <option
                          key={''}
                          value={''}
                        >
                          {''}
                        </option>
                        {this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU').sort(dynamicSort('denumire')).map(option => (
                          <option
                            key={option.key}
                            value={option.denumire}
                          >
                            {option.denumire}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid
                      item
                      lg={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label=" Cod"
                        margin="dense"
                        name="codMaterial"
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        required
                        value={currentItem.codMaterial || ''}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      lg={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}} 
                        label="Material"
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
                          key={''}
                          value={''}
                        >
                          {''}
                        </option>
                        {this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0]?
                          this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].materialeCompatibile[0]?
                            this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].materialeCompatibile.filter(material=>material.activ.toUpperCase()!=='NU')[0]?
                              this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].materialeCompatibile.filter(material=>material.activ.toUpperCase()!=='NU').sort(dynamicSort('denumire')).map(option => (
                                <option
                                  key={option.key}
                                  value={option.denumire}
                                >
                                  {option.denumire}
                                </option>
                              )):0:0:0}
                      </TextField>
                    </Grid>

                    <Grid
                      item
                      lg={2}
                      xs={12}
                    >
                      <TextField
                        disabled={this.handleCotePanza()}
                        error={errors.m1m.mesaj || errors.m6m.mesaj || errors.m11m.mesaj || errors.m13m.mesaj || errors.m14m.mesaj ? true:false}
                        fullWidth
                        helperText={errors.m1m.mesaj || errors.m6m.mesaj || errors.m11m.mesaj || errors.m13m.mesaj || errors.m14m.mesaj ? (errors.m1m.mesaj? errors.m1m.mesaj + ' ':'')+ (errors.m6m.mesaj? errors.m6m.mesaj + ' ':'') + (errors.m11m.mesaj? errors.m11m.mesaj + ' ':'')+ (errors.m13m.mesaj? errors.m13m.mesaj + ' ':'')+ (errors.m14m.mesaj? errors.m14m.mesaj + ' ':''):''}
                        InputLabelProps={{shrink:true}}
                        inputProps={{style: { textAlign: 'right' }}}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                        }}
                        label="Latime PANZA"
                        margin="dense"
                        name="lungime"
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        required={this.handleLungimeRequired()}
                        value={currentItem.lungime || ''}
                        variant="outlined"
                      
                      />
                    </Grid>

                    <Grid
                      item
                      lg={2}
                      xs={12}
                    >
                      <TextField
                        disabled={this.handleCoteFinale()}
                        error={errors.m9m.mesaj || errors.m10m.mesaj ?true:false}
                        fullWidth
                        helperText={errors.m9m.mesaj || errors.m10m.mesaj ? (errors.m9m.mesaj? errors.m9m.mesaj + ' ':'') + (errors.m10m.mesaj? errors.m10m.mesaj + ' ':'') :''}
                        InputLabelProps={{shrink:true}}
                        inputProps={{style: { textAlign: 'right' }}}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                        }}
                        label="Latime FINALA"
                        margin="dense"
                        name="lungimeFinala"
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        value={currentItem.lungimeFinala || ''}
                        variant="outlined"
                    
                      />
                    </Grid>

                    <Grid
                      item
                      lg={2}
                      xs={12}
                    >
                      <TextField
                        disabled={this.handleCotePanza()}
                        error={errors.m2m.mesaj || errors.m3m.mesaj || errors.m4m.mesaj || errors.m8m.mesaj?true:false}
                        fullWidth
                        helperText={errors.m2m.mesaj || errors.m3m.mesaj || errors.m4m.mesaj || errors.m8m.mesaj? (errors.m2m.mesaj? errors.m2m.mesaj + ' ':'') + (errors.m3m.mesaj? errors.m3m.mesaj + ' ':'') + (errors.m4m.mesaj? errors.m4m.mesaj + ' ':'') + (errors.m8m.mesaj? errors.m8m.mesaj + ' ':'') :''}
                        InputLabelProps={{shrink:true}}
                        inputProps={{style: { textAlign: 'right' }}}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                        }}
                        label="Inaltime PANZA"
                        margin="dense"
                        name="inaltime"
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        required={this.handleInaltimeRequired()}
                        value={currentItem.inaltime || ''}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      lg={2}
                      xs={12}
                    >
                      <TextField
                        disabled={this.handleCoteFinale()}
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        inputProps={{style: { textAlign: 'right' }}}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                        }}
                        label="Inaltime FINALA"
                        margin="dense"
                        name="inaltimeFinala"
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        value={currentItem.inaltimeFinala || ''}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      lg={1}
                      xs={12}
                    >
                      <TextField
                        disabled={this.handleActionare()}
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Actionare"
                        margin="dense"
                        name="actionareStDr"
                        onChange={this.onChange}
                        required={!this.handleActionare()}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.actionareStDr || ''}
                        variant="outlined"
                      >
                        <option
                          key={''}
                          value={''}
                        >
                          {''}
                        </option>
                        <option
                          key={'Stanga'}
                          value={'Stanga'}
                        >
                          {'Stanga'}
                        </option>
                        <option
                          key={'Dreapta'}
                          value={'Dreapta'}
                        >
                          {'Dreapta'}
                        </option>
                      </TextField>
                    </Grid>

                    <Grid
                      item
                      lg={1}
                      xs={12}
                    >
                      <TextField
                        disabled={this.handleAx()}
                        error={errors.m5m.mesaj || errors.m7m.mesaj || errors.m12m.mesaj ? true:false}
                        fullWidth
                        helperText={errors.m5m.mesaj || errors.m7m.mesaj || errors.m12m.mesaj ? (errors.m5m.mesaj? errors.m5m.mesaj + ' ':'') + (errors.m7m.mesaj? errors.m7m.mesaj + ' ':'')+(errors.m12m.mesaj? errors.m12m.mesaj + ' ':'') :''}
                        InputLabelProps={{shrink:true}}
                        label="Ax"
                        margin="dense"
                        name="ax"
                        onChange={this.onChangeAx}
                        required={!this.handleAx()}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.ax || ''}
                        variant="outlined"
                      >
                        <option
                          key={''}
                          value={''}
                        >
                          {''}
                        </option>
                        <option
                          key={'MIC'}
                          value={'MIC'}
                        >
                          {'MIC'}
                        </option>
                        <option
                          key={'MARE'}
                          value={'MARE'}
                        >
                          {'MARE'}
                        </option>
                      </TextField>
                    </Grid>

                    <Grid
                      item
                      lg={2}
                      xs={12}
                    >
                      {/*<TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label=" Culoare componente"
                        margin="dense"
                        name="culoareComponente"
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        required
                        value={currentItem.culoareComponente || ''}
                        variant="outlined"
                      />*/}


                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Culoare componente"
                        margin="dense"
                        name="denumireCuloareLamela"
                        onChange={this.onChangeCuloareLamela}
                        required
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireCuloareLamela || ''}
                        variant="outlined"
                      >
                        <option
                          key={''}
                          value={''}
                        >
                          {''}
                        </option>
                        {this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0]?
                          this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].culoriCompatibile.filter(culoare=>culoare.activ.toUpperCase()!=='NU' && culoare.componenta==='COMPONENTA')[0]?
                            this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].culoriCompatibile.filter(culoare=>culoare.activ.toUpperCase()!=='NU' && culoare.componenta==='COMPONENTA').sort(dynamicSort('denumire')).map(option => (
                              <option
                                key={option.key}
                                value={option.denumire}
                              >
                                {option.denumire}
                              </option>
                            )):0:0}
                      </TextField>



                    </Grid>

                    <Grid
                      item
                      lg={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Optional 1"
                        margin="dense"
                        name="optional1"
                        onChange={this.onChangeOptional1}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireOptional1 || ''}
                        variant="outlined"
                      >
                        <option
                          key={''}
                          value={''}
                        >
                          {''}
                        </option>
                        {this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)?
                          this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0]?
                            this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].optionaleCompatibile.filter(optional=>optional.ax===currentItem.ax && optional.activ.toUpperCase()!=='NU')[0]?
                              this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].optionaleCompatibile.filter(optional=>optional.ax===currentItem.ax && optional.activ.toUpperCase()!=='NU').sort(dynamicSort('denumire')).map(option => (
                                <option
                                  key={option.key}
                                  value={option.denumire}
                                >
                                  {option.denumire}
                                </option>
                              )):0:0:0}
                      </TextField>
                    </Grid>

                    <Grid
                      item
                      lg={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Optional 2"
                        margin="dense"
                        name="optional2"
                        onChange={this.onChangeOptional2}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireOptional2}
                        variant="outlined"
                      >
                        <option
                          key={''}
                          value={''}
                        >
                          {''}
                        </option>
                        {this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)?
                          this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0]?
                            this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].optionaleCompatibile.filter(optional=>optional.ax===currentItem.ax && optional.activ.toUpperCase()!=='NU')[0]?
                              this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].optionaleCompatibile.filter(optional=>optional.ax===currentItem.ax && optional.activ.toUpperCase()!=='NU').sort(dynamicSort('denumire')).map(option => (
                                <option
                                  key={option.key}
                                  value={option.denumire}
                                >
                                  {option.denumire}
                                </option>
                              )):0:0:0}
                      </TextField>
                    </Grid>

                    <Grid
                      item
                      lg={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{shrink:true}}
                        label="Optional 3"
                        margin="dense"
                        name="optional3"
                        onChange={this.onChangeOptional3}
                        select
                        SelectProps={{
                          native: true,
                          MenuProps: {
                          }
                        }}
                        value={currentItem.denumireOptional3}
                        variant="outlined"
                      >
                        <option
                          key={''}
                          value={''}
                        >
                          {''}
                        </option>
                        {this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)?
                          this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0]?
                            this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].optionaleCompatibile.filter(optional=>optional.ax===currentItem.ax && optional.activ.toUpperCase()!=='NU')[0]?
                              this.produse.filter(produs=>produs.activ.toUpperCase()!=='NU' && produs.key===currentItem.tipSubprodus)[0].optionaleCompatibile.filter(optional=>optional.ax===currentItem.ax && optional.activ.toUpperCase()!=='NU').sort(dynamicSort('denumire')).map(option => (
                                <option
                                  key={option.key}
                                  value={option.denumire}
                                >
                                  {option.denumire}
                                </option>
                              )):0:0:0}
                      </TextField>
                    </Grid>


                    <Grid
                      item
                      lg={12}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        InputLabelProps={{
                          shrink:true
                        }}
                        label="Observatii"
                        margin="dense"
                        name="observatii"
                        onChange={this.onChange}
                        onKeyDown={this.handlerKeyDown}
                        value={currentItem.observatii || ''}
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
                            endAdornment: <InputAdornment position="end">mp</InputAdornment>,
                            readOnly: true,
                          }}
                          label="MP/buc"
                          margin="dense"
                          name="mp"
                          onChange={this.onChange} 
                          onKeyDown={this.handlerKeyDown}
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
  produse:selectLookupProduse(state),
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