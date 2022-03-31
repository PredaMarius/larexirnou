/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import Popup from 'reactjs-popup'
import {connect} from 'react-redux';
import {dynamicSort} from '../../../../utils/functiiComune'
import {selectOrderCurrentProduct, selectOrderCurrentOrder, selectOrderCurrentItem} from '../../../../redux/order/order.selectors'
import {selectLookupOptionale,  selectLookupCulori} from '../../../../redux/lookup/lookup.selectors'
import {selectOtherLoading,selectOtherOpenEditItem, selectOtherErrors} from '../../../../redux/other/other.selectors'
import {selectCurrentUser} from '../../../../redux/user/user.selectors'
import {setLoading,setOpenEditItem, setErrors, resetErrors, setErrorsAsync} from '../../../../redux/other/other.actions'
import {setCurrentItem} from '../../../../redux/order/order.actions'
import {mpJo, pretJo} from './functii';
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
    this.optionale=props.optionale?props.optionale.filter(optional=>optional.tipProdus==='JO').sort(dynamicSort('denumire')):[];
    this.culori=props.culori?props.culori.sort(dynamicSort('codCuloare')):[]
    this.clema=props.optionale?props.optionale.filter(optional=>optional.tipProdus==='JV' && optional.key===2)[0]:[];
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
      value = e.target.value?this.culori.filter(culoare=>culoare.codCuloare===e.target.value)[0].key:0
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
    
    onChangeOptional1= (e)=>{ // FIXAREA
      e.persist()
      const {setCurrentItem, currentItem}=this.props;
      let key = 'optional1';
      let key2='denumireOptional1'
      let value=null;
      let value2='';
      if (currentItem){
        value = e.target.value?this.optionale.filter(optional=>optional.denumire===e.target.value)[0].key:0
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
    onChange= (e)=> {
      let key = e.target.name;
      let value = e.target.value;
      this.props.setCurrentItem({...this.props.currentItem, [key]: value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}) 
      if(key==='lungime' || key==='inaltime' || key==='culoareLamela' || key==='console' || key==='buc'){
        debounce(this.calculPretCatalog,500)()
      }
      if(key==='lungime' || key==='inaltime'){
        debounce(this.calculMp,500)()
      }
      setTimeout(() => {
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
      }, 50);
    }
   
    //-------------------------------------------------------------------------------------------------------------------
    calculMp= async ()=>{
      const {setCurrentItem,currentItem}=this.props;
      setCurrentItem({...currentItem, mp:mpJo( currentItem.lungime, currentItem.inaltime)}) 
    }
    //-------------------------------------------------------------------------------------------------------------------
    calculPretCatalog= async()=>{      
      const {currentItem, setCurrentItem,currentUser}=this.props 
      const discount=currentUser.idFirma.discountJO
      const adaos=currentUser.idFirma.adaosJO
      const pretCatalog=pretJo(this.optionale, this.culori, this.clema, currentItem.lungime, currentItem.inaltime, currentItem.culoareLamela, currentItem.optional1, currentItem.buc, currentItem.console).toFixed(2);
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
     handleAtentionareCuloareLamela=(e)=>{
       const {currentItem, enqueueSnackbar}=this.props;
       if (currentItem){
         if(e.target.value){
           var mesaj=this.culori.filter(culoare=>culoare.denumire===currentItem.denumireCuloareLamela)[0]?this.culori.filter(culoare=>culoare.key===currentItem.culoareLamela)[0].atentionare:''
           var denumireCuloareLamela=this.culori.filter(culoare=>culoare.denumire===currentItem.denumireCuloareLamela)[0]?this.culori.filter(culoare=>culoare.key===currentItem.culoareLamela)[0].denumire:''
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
      const {currentItem, enqueueSnackbar}=this.props;
      if (currentItem){
        if(e.target.value){
          var mesaj=this.optionale.filter(optional=>optional.denumire===currentItem.denumireOptional1)[0]?this.optionale.filter(optional=>optional.key===currentItem.optional1 && optional.activ==='DA')[0].atentionare:''
          var denumireOptional1=this.optionale.filter(optional=>optional.denumire===currentItem.denumireOptional1)[0]?this.optionale.filter(optional=>optional.key===currentItem.optional1 && optional.activ==='DA')[0].denumire:''
        }
        if(mesaj){
          enqueueSnackbar(denumireOptional1+':'+mesaj,{ 
            variant: 'warning',
          },20000)
        }
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
    //-------------------------------------------------------------------------------------------------------------------
    
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
                className={'header'}
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
                    lg={1}
                    xs={12}
                  >
                    <TextField
                      error={errors.m2m.mesaj? true:false}
                      fullWidth
                      helperText={errors.m2m.mesaj? errors.m2m.mesaj + ' ':''}
                      InputLabelProps={{shrink:true}}
                      inputProps={{style: { textAlign: 'right' }}}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      label="Latime"
                      margin="dense"
                      name="lungime"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      required
                      value={currentItem.lungime || ''}
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
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      label="Inaltime"
                      margin="dense"
                      name="inaltime"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      required
                      value={currentItem.inaltime || ''}
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
                      label="Actionare"
                      margin="dense"
                      name="actionareStDr"
                      onChange={this.onChange}
                      required
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
                    lg={2}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{shrink:true}}
                      label="Fixare (Ghid/DownFix)"
                      margin="dense"
                      name="optional1"
                      onChange={this.onChangeOptional1}
                      required
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
                      {this.optionale ?
                        this.optionale.map(option => (
                          <option
                            key={option.key}
                            value={option.denumire}
                          >
                            {option.denumire}
                          </option>
                        )):0}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    lg={2}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      InputLabelProps={{shrink:true}}
                      label="Cod culoare"
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
                      {this.culori.filter(culoare=>culoare.activ.toUpperCase()!=='NU')?
                        this.culori.filter(culoare=>culoare.activ.toUpperCase()!=='NU').map(option => (
                          <option
                            key={option.key}
                            value={option.codCuloare}
                          >
                            {option.codCuloare}
                          </option>
                        )):0}
                    </TextField>
                  </Grid>
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
                      label="Cod culoare 2"
                      margin="dense"
                      name="culoareComponente"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      value={currentItem.culoareComponente || ''}
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
                      label="Lung. betisor"
                      margin="dense"
                      name="lungimeSnur"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      value={currentItem.lungimeSnur || ''}
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
                        endAdornment: <InputAdornment position="end">cleme</InputAdornment>,
                      }}
                      label="Cleme met."
                      margin="dense"
                      name="console"
                      onChange={this.onChange}
                      onKeyDown={this.handlerKeyDown}
                      value={currentItem.console || ''}
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
                        value={currentItem.mp || 0}
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
                          error={errors.m1m.mesaj ?true:false}
                          fullWidth
                          helperText={errors.m1m.mesaj ? (errors.m1m.mesaj? errors.m1m.mesaj + ' ':''):''}
                          InputLabelProps={{shrink:true}}
                          inputProps={{style: { textAlign: 'right' }}}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">Lei</InputAdornment>,
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
                            endAdornment: <InputAdornment position="end">Lei</InputAdornment>,
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
                          endAdornment: <InputAdornment position="end">Lei</InputAdornment>,
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
              <CardActions style={{ display:'flex', justifyContent: 'flex-end'}}>
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
  optionale:selectLookupOptionale(state),
  culori:selectLookupCulori(state),
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