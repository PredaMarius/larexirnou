/* eslint-disable linebreak-style */
import React from 'react';
import {connect} from 'react-redux';
import {
  Card,
} from '@material-ui/core';
import { 
  GridComponent, 
  ColumnsDirective, 
  ColumnDirective, 
  Selection,
  Page, 
  Inject,
  Toolbar, 
  CommandColumn, 
  Resize, 
  ColumnMenu,
  Edit,
  ForeignKey,
  AggregateColumnDirective,
  AggregateColumnsDirective, 
  AggregateDirective, 
  AggregatesDirective,
  Aggregate
} from '@syncfusion/ej2-react-grids'; 
import { L10n, getValue} from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css'
import './ordercontent.css';
import {validation} from './validation';
import ReperEdit from './ReperEdit';
import {setLoading,setErrors } from '../../../../redux/other/other.actions';
import {selectOtherLoading, selectOtherErrors} from '../../../../redux/other/other.selectors';
import {selectOrderCurrentProduct,selectOrderOrders, selectOrderCurrentOrder,selectOrderCurrentItem, selectOrderUpdatedOrder, selectOrderDeletedItems} from '../../../../redux/order/order.selectors';
import {selectCurrentUser } from '../../../../redux/user/user.selectors';
import { selectLookupMateriale} from '../../../../redux/lookup/lookup.selectors';
import {setCurrentItem, setUpdatedOrder, setDeletedItems} from '../../../../redux/order/order.actions';
import {setOpenEditItem, resetErrors} from '../../../../redux/other/other.actions';

//---------------------------------------------------------------------------------------------------------------------------------

L10n.load({
  'ro-RO': {
    'grid': {
      'Add':'Adauga',
      'Edit':'Modifica',
      'Delete':'Sterge',
      'Update':'Actualizare',
      'Cancel': 'Abandon',
      'Save':'Salveaza',
      'Item':'reper',
      'Items':'repere',
      'EmptyRecord':'Nu exista inregistrari',
      'EditOperationAlert':'Nu ati selectat nici un reper!',
      'DeleteOperationAlert':'Nu ati selectat nici un reper!',
      'SaveButton':'Salvare',
      'CancelButton':'Abandon',
      'ConfirmDelete':'Sunteti sigur ca doriti stergerea reperului?',
      'CancelEdit':'Sunteti sigur ca doriti sa abandonati modificarile facute ?'
    },
    'pager':{
      'currentPageInfo': '{0} din {1} pagini',
      'firstPageTooltip': 'prima pagina',
      'lastPageTooltip': 'ultima pagina',
      'nextPageTooltip': 'urmatoarea pagina',
      'nextPagerTooltip': 'urmatoarea pagina',
      'previousPageTooltip': 'pagina anterioara',
      'previousPagerTooltip': 'pagina anterioara',
      'totalItemsInfo': '({0} inregistrari)'
    }
  }
}); 

//  documentatie la link-ul: https://ej2.syncfusion.com/react/documentation/grid/global-local/
//---------------------------------------------------------------------------------------------------------------------------

class OrderContentUG extends React.Component{

  constructor() {
    super(...arguments);
    this.editparams={params:{popupHeight:'300px'}};
    this.validationRule={required:true};
    this.toolbarOptions = this.props.updatedOrder.stadiu !=='TRANSMISA'?[
      { text: 'Adauga', tooltipText: 'Adauga reper noua', prefixIcon: 'e-add', id: 'Adauga' },
      { text: 'Modifica', tooltipText: 'Modifica reperul selectat', prefixIcon: 'e-edit', id: 'Modifica' },
      { text: 'Sterge', tooltipText: 'Sterge reperul selectat', prefixIcon: 'e-delete', id: 'Sterge' }
    ]:[{text:'Comanda transmisa - nu se pot face modificari', id:'Transmisa'}];
    this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Dialog', template: this.dialogTemplate , allowEditOnDblClick: false, showDeleteConfirmDialog: true };
    this.sortingOptions = {columns: [{ field: 'actionare', direction: 'Ascending' }]}
    this.selectionsettings = {checkboxMode: 'ResetOnRowClick',type: 'Single' };  
  }
  
  //----------------------------------------------------------------------------------------------------
  jsonCopy=(src)=>{
    return JSON.parse(JSON.stringify(src));
  }
  //----------------------------------------------------------------------------------------------------
   rowselect=(args)=>{
     const {setCurrentItem}=this.props
     let selRecord = args.data;
     setCurrentItem(selRecord)
   }
   //----------------------------------------------------------------------------------------------------
  rowdeselect=()=>{
    const {setCurrentItem}=this.props
    setCurrentItem({});
  }
  //----------------------------------------------------------------------------------------------------
  actionBegin=(args)=> {
    if (args.requestType === 'save') {
      if (this.masterGrid.pageSettings.currentPage !== 1 && this.masterGrid.editSettings.newRowPosition === 'Top') {
        args.index = (this.masterGrid.pageSettings.currentPage * this.masterGrid.pageSettings.pageSize) - this.masterGrid.pageSettings.pageSize;
      }
      else if (this.masterGrid.editSettings.newRowPosition === 'Bottom') {
        args.index = (this.masterGrid.pageSettings.currentPage * this.masterGrid.pageSettings.pageSize) - 1;
      }
    }
  }
  //----------------------------------------------------------------------------------------------------
  actionComplete(args) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 90 + 'px';
        args.dialog.dataBind();    
      }
    }
  }
  //----------------------------------------------------------------------------------------------------
  currencyFormatter=(field, data)=>{
    return  getValue(field, data) + ' Euro';
  }
   //----------------------------------------------------------------------------------------------------
   mpTotal=(field, data)=>{
     return  getValue('mp', data) * getValue('buc', data) ;
   }
  //----------------------------------------------------------------------------------------------------
  //...........................<specific>
  customizeCell=(args)=>{
    
    if((args.column).field === 'lungime' && args.data && args.cell) {
      if ([1].includes(getValue('tipSubprodus', args.data)) && getValue('lungime', args.data) > 3200 ){
        args.cell.classList.add('error');
      } 
    }

  }
  //...........................</specific>

  //----------------------------------------------------------------------------------------------------
  //...........................<specific moneda>
  footerTotal=(props)=>{
    return (<span><strong>{props.Sum.toFixed(2)} Euro</strong></span>)
  }
  //----------------------------------------------------------------------------------------------------
  footerTotalMp=(props)=>{
    return (<span><strong> {(props.Custom*1).toFixed(2)} mp</strong></span>)
  }
  //...........................</specific moneda>
  //----------------------------------------------------------------------------------------------------
  
  //---------------------------------------------------------------------------------------------------- 
  clickHandlerMaster=async e=>{
    const { setCurrentItem, setOpenEditItem,updatedOrder, resetErrors, enqueueSnackbar}=this.props;
    if (e.item.properties.id==='Adauga'){
      if(!updatedOrder.clientClient){
        enqueueSnackbar('Nu se pot adauga repere pana nu se completeaza Clientul!',{ 
          variant: 'warning',
          autoHideDuration:1500
        }) 
        return 
      }
      setCurrentItem({buc:1});
      resetErrors();
      setOpenEditItem({open:true, title:'Adauga reper nou',add:true});
    }
    if (e.item.properties.id==='Modifica'){
      if (this.masterGrid.getSelectedRowIndexes().length){
        validation(this.props.currentItem,this.props.errors,this.props.setErrors)
        setOpenEditItem({open:true, title:'Modifica reper',add:false})
      }else{
        enqueueSnackbar('Va rog selectati un reper',{ 
          variant: 'warning',
          autoHideDuration:1500
        })
      } 
    }
    if (e.item.properties.id==='Sterge'){
      
      confirmAlert({
        title: 'Confirmare stergere',
        message: 'Sigur doriti stergerea reperului?',
        buttons: [
          {
            label: 'Da',
            onClick: () => {
              resetErrors()
              this.stergeItem()
              this.masterGrid.refresh() 
            }
          },
          {
            label: 'Nu',
            onClick: () => {
              enqueueSnackbar('Operatia de stergere a fost abandonata.',{ 
                variant: 'warning',
                autoHideDuration:1500
              })    
            }
          }
        ]
      });
    }   
  }
  //----------------------------------------------------------------------------------------------------
adaugaItem=()=>{
  const {currentItem,setOpenEditItem, updatedOrder, enqueueSnackbar, currentProduct}=this.props;
  const newItem={
    'id':updatedOrder.comandarepers?(updatedOrder.comandarepers.length+1)*-1:-1,
    'idComanda':updatedOrder.id,
    'nrCrt':updatedOrder.comandarepers?updatedOrder.comandarepers.length+1:1,
    'tipSubprodus':currentItem.tipSubprodus?currentItem.tipSubprodus:0,
    'lungime':Number(currentItem.lungime?currentItem.lungime:0) ,
    'lungimeFinala':Number(currentItem.lungimeFinala?currentItem.lungimeFinala:0) ,
    'inaltime':Number(currentItem.inaltime?currentItem.inaltime:0),
    'inaltimeFinala':Number(currentItem.inaltimeFinala?currentItem.inaltimeFinala:0),
    'deschidere':currentItem.deschidere?currentItem.deschidere:'',
    'culoareLamela':currentItem.culoareLamela?currentItem.culoareLamela:0,
    'culoareCaseta':currentItem.culoareCaseta?currentItem.culoareCaseta:0,
    'material':currentItem.material?currentItem.material:0,
    'codMaterial':currentItem.codMaterial?currentItem.codMaterial:'',
    'lungimeSnur':Number(currentItem.lungimeSnur?currentItem.lungimeSnur:0),
    'actionare':new Date().toISOString().slice(0, 19).replace('T', ' '),
    'tipActionare':currentItem.tipActionare?currentItem.tipActionare:0,
    'actionareStDr':currentItem.actionareStDr?currentItem.actionareStDr:'',
    'ax':currentItem.ax?currentItem.ax:'',
    'culoareComponente':currentItem.culoareComponente?currentItem.culoareComponente:'',
    'optional1':currentItem.optional1?currentItem.optional1:0,
    'optional2':currentItem.optional2?currentItem.optional2:0,
    'optional3':currentItem.optional3?currentItem.optional3:0,
    'console':Number(currentItem.console?currentItem.console:0),
    'buc':Number(currentItem.buc?currentItem.buc:0),
    'mp':Number(currentItem.mp?currentItem.mp:0),
    'pretCatalog':Number(currentItem.pretCatalog?currentItem.pretCatalog:0),
    'pretCuDiscount':Number(currentItem.pretCuDiscount?currentItem.pretCuDiscount:0),
    'pretClientFinal':Number(currentItem.pretClientFinal?currentItem.pretClientFinal:0),
    'observatii':currentItem.observatii?currentItem.observatii:'',
    'tipProdus':currentItem.tipProdus?currentItem.tipProdus:currentProduct.cod,
    'denumireProdus':currentItem.denumireProdus?currentItem.denumireProdus:currentProduct.title.toUpperCase(),
    'denumireSubProdus':currentItem.denumireSubProdus?currentItem.denumireSubProdus:currentProduct.title.toUpperCase(),
    'denumireCuloareLamela':currentItem.denumireCuloareLamela?currentItem.denumireCuloareLamela:'',
    'denumireCuloareCaseta':currentItem.denumireCuloareCaseta?currentItem.denumireCuloareCaseta:'',
    'denumireMaterial':currentItem.denumireMaterial?currentItem.denumireMaterial:'',
    'denumireTipActionare':currentItem.denumireTipActionare?currentItem.denumireTipActionare:'',
    'denumireOptional1':currentItem.denumireOptional1?currentItem.denumireOptional1:'',
    'denumireOptional2':currentItem.denumireOptional2?currentItem.denumireOptional2:'',
    'denumireOptional3':currentItem.denumireOptional3?currentItem.denumireOptional3:'',
  }

  if (this.masterGrid) {
    updatedOrder.comandarepers.push(newItem)
    const TotalValoareCatalog=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretCatalog;},0)
    const TotalValoareComanda=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretCuDiscount;},0)
    const TotalValoareClientFinal=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretClientFinal;},0)
    setUpdatedOrder({...updatedOrder,'valoareCatalog':TotalValoareCatalog,'valoareComanda':TotalValoareComanda,'valoareClientFinal':TotalValoareClientFinal})
    setOpenEditItem({open:false, title:'',add:true});
    this.masterGrid.refresh()
    enqueueSnackbar('Reper adaugat cu succes',{ variant: 'success',autoHideDuration:1500})    
  }
};      
//----------------------------------------------------------------------------------------------------
modificaItem=()=>{
  const {currentItem, setOpenEditItem, updatedOrder, setUpdatedOrder, enqueueSnackbar, currentProduct}=this.props;
  if (this.masterGrid) {  
    var foundReperUpdatedOrder =  updatedOrder.comandarepers.findIndex(rep => rep.id === currentItem.id);  
    const updatedItem= { 
      'id':currentItem.id,
      'idComanda':currentItem.idComanda,
      'nrCrt':currentItem.nrCrt,
      'tipSubprodus':currentItem.tipSubprodus?currentItem.tipSubprodus:0,
      'lungime':Number(currentItem.lungime?currentItem.lungime:0) ,
      'lungimeFinala':Number(currentItem.lungimeFinala?currentItem.lungimeFinala:0) ,
      'inaltime':Number(currentItem.inaltime?currentItem.inaltime:0),
      'inaltimeFinala':Number(currentItem.inaltimeFinala?currentItem.inaltimeFinala:0),
      'deschidere':currentItem.deschidere?currentItem.deschidere:'',
      'culoareLamela':currentItem.culoareLamela?currentItem.culoareLamela:0,
      'culoareCaseta':currentItem.culoareCaseta?currentItem.culoareCaseta:0,
      'material':currentItem.material?currentItem.material:0,
      'codMaterial':currentItem.codMaterial?currentItem.codMaterial:'',
      'lungimeSnur':Number(currentItem.lungimeSnur?currentItem.lungimeSnur:0),
      'actionare':currentItem.actionare?currentItem.actionare:'',
      'tipActionare':currentItem.tipActionare?currentItem.tipActionare:0,
      'actionareStDr':currentItem.actionareStDr?currentItem.actionareStDr:'',
      'ax':currentItem.ax?currentItem.ax:'',
      'culoareComponente':currentItem.culoareComponente?currentItem.culoareComponente:'',
      'optional1':currentItem.optional1?currentItem.optional1:0,
      'optional2':currentItem.optional2?currentItem.optional2:0,
      'optional3':currentItem.optional3?currentItem.optional3:0,
      'console':Number(currentItem.console?currentItem.console:0),
      'buc':Number(currentItem.buc?currentItem.buc:0),
      'mp':Number(currentItem.mp?currentItem.mp:0),
      'pretCatalog':Number(currentItem.pretCatalog?currentItem.pretCatalog:0),
      'pretCuDiscount':Number(currentItem.pretCuDiscount?currentItem.pretCuDiscount:0),
      'pretClientFinal':Number(currentItem.pretClientFinal?currentItem.pretClientFinal:0),
      'observatii':currentItem.observatii?currentItem.observatii:'',
      'tipProdus':currentItem.tipProdus?currentItem.tipProdus:currentProduct.cod,
      'denumireProdus':currentItem.denumireProdus?currentItem.denumireProdus:currentProduct.title.toUpperCase(),
      'denumireSubProdus':currentItem.denumireSubProdus?currentItem.denumireSubProdus:currentProduct.title.toUpperCase(),
      'denumireCuloareLamela':currentItem.denumireCuloareLamela?currentItem.denumireCuloareLamela:'',
      'denumireCuloareCaseta':currentItem.denumireCuloareCaseta?currentItem.denumireCuloareCaseta:'',
      'denumireMaterial':currentItem.denumireMaterial?currentItem.denumireMaterial:'',
      'denumireTipActionare':currentItem.denumireTipActionare?currentItem.denumireTipActionare:'',
      'denumireOptional1':currentItem.denumireOptional1?currentItem.denumireOptional1:'',
      'denumireOptional2':currentItem.denumireOptional2?currentItem.denumireOptional2:'',
      'denumireOptional3':currentItem.denumireOptional3?currentItem.denumireOptional3:'',
    }      
    updatedOrder.comandarepers.splice(foundReperUpdatedOrder,1,updatedItem)
    const TotalValoareCatalog=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretCatalog;},0)
    const TotalValoareComanda=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretCuDiscount;},0)
    const TotalValoareClientFinal=updatedOrder.comandarepers.reduce((accumulator, currentValue)=> {return accumulator + currentValue.pretClientFinal;},0)
    setUpdatedOrder({...updatedOrder,'valoareCatalog':TotalValoareCatalog,'valoareComanda':TotalValoareComanda,'valoareClientFinal':TotalValoareClientFinal})
    setOpenEditItem({open:false, title:'',add:true});
    this.masterGrid.refresh()
    enqueueSnackbar('Reper modificat cu succes',{ variant: 'success', autoHideDuration:1500})    
  }
};
//----------------------------------------------------------------------------------------------------
stergeItem=()=>{
  const {currentItem, updatedOrder, setDeletedItems, deletedItems, enqueueSnackbar}=this.props;
  if (this.masterGrid) {
    const selectedRow = this.masterGrid.dataSource.findIndex(reper=>(reper.id===currentItem.id));
    if (this.masterGrid.getSelectedRowIndexes().length){
      deletedItems.push(currentItem);
      setDeletedItems(deletedItems);
      this.masterGrid.dataSource.splice(selectedRow, 1);
      setUpdatedOrder(updatedOrder);
      enqueueSnackbar('Reper sters cu succes',{variant: 'success', autoHideDuration:1500});    
    } else {
      enqueueSnackbar('Va rog selectati un reper',{ variant: 'warning', autoHideDuration:1500}) ;   
    }
  }
}
//----------------------------------------------------------------------------------------------------
headerCellInfo=(args)=>{ 
  args.node.getElementsByClassName('e-checkbox-wrapper')[0] && args.node.getElementsByClassName('e-checkbox-wrapper')[0].remove(); 
} 
//----------------------------------------------------------------------------------------------------
closeVizualizareRepere=()=>{
  const {setOpenEditItem}=this.props;
  setOpenEditItem(false)
} 
//---------------------------------------------------------------------------------------------------- 
customAggregateMp=(args)=>{
  const val = args.result.map(item => item.mp*item.buc)
  return val
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

render(){
  const {updatedOrder}=this.props;
  return (
    <Card className="control-panel">
      <div className="control-section">
        <GridComponent 
          actionBegin={this.actionBegin.bind(this)} 
          actionComplete={this.actionComplete.bind(this)}  
          allowPaging 
          allowResizing 
          allowSorting
          allowTextWrap 
          dataSource={updatedOrder.comandarepers} 
          editSettings={this.editSettings}
          enableHover={false} 
          gridLines="Both"
          headerCellInfo={this.headerCellInfo.bind(this)}
          locale="ro-RO"
          queryCellInfo={this.customizeCell}
          ref={grid => this.masterGrid = grid}
          rowDeselected={this.rowdeselect.bind(this)}
          rowSelected={this.rowselect.bind(this)} 
          selectedRowIndex={-1}
          selectionSettings={this.selectionsettings}
          sortSettings={this.sortingOptions}
          textWrapSettings={{wrapMode: 'Both'}}
          toolbar={this.toolbarOptions}
          toolbarClick={this.clickHandlerMaster}
        >
          <ColumnsDirective>
            <ColumnDirective
              allowEditing={false}
              textAlign="Center"
              type="checkbox"
              width="30"
            />
            <ColumnDirective
              field="id"
              headerText="idReper"
              isPrimaryKey
              visible={false}
              width="0"
            />
            <ColumnDirective
              field="actionare"
              headerText="ACTIONARE"
              textAlign="Center"
              visible={false}
              width="0"
            />
            <ColumnDirective
              field="nrCrt"
              format="N"
              headerText="NR"
              textAlign="Center"
              width="60"
            />
            <ColumnDirective
              field="denumireSubProdus"
              format="N"
              headerText="TIP USA GARAJ"
              textAlign="Center"
              width="120"
            />
            <ColumnDirective
              field="denumireCuloareLamela"
              headerText="CULOARE LAMELE"
              textAlign="Center"
              width="100"
            />
            <ColumnDirective
              field="denumireCuloareCaseta"
              headerText="CULOARE CASETA"
              textAlign="Center"
              width="100"
            />
            
            <ColumnDirective
              field="lungime"
              format="N"
              headerText="LATIME"
              textAlign="Center"
              width="80"
            />
            <ColumnDirective
              field="inaltime"
              format="N"
              headerText="INALTIME"
              textAlign="Center"
              width="80"
            />
            <ColumnDirective
              field="actionareStDr"
              headerText="ACTIONARE ST/DR"
              textAlign="Center"
              width="110"
            />
            <ColumnDirective
              field="denumireTipActionare"
              headerText="TIP ACTIONARE"
              textAlign="Center"
              width="110"
            />
            <ColumnDirective
              clipMode="EllipsisWithTooltip"
              field="denumireOptional1"
              headerText="OPTIONAL 1"
              textAlign="Center"
              width="100"
            />
            <ColumnDirective
              clipMode="EllipsisWithTooltip"
              field="denumireOptional2"
              headerText="OPTIONAL 2"
              textAlign="Center"
              width="100"
            />
            <ColumnDirective
              clipMode="EllipsisWithTooltip"
              field="denumireOptional3"
              headerText="OPTIONAL 3"
              textAlign="Center"
              width="100"
            />
            <ColumnDirective
              clipMode="EllipsisWithTooltip"
              field="observatii"
              headerText="OBSERVATII"
              textAlign="Left"
              width="100"
            />
            
            <ColumnDirective
              field="buc"
              format="N"
              headerText="CANT."
              textAlign="Center"
              width="70"
            />
            <ColumnDirective
              field="mp"
              format="N2"
              headerText="MP"
              textAlign="Center"
              type="number"
              valueAccessor={this.mpTotal}
              width="60"
            />
            <ColumnDirective
              field="pretCatalog"
              headerText="PRET CATALOG"
              textAlign="Right"
              valueAccessor={this.currencyFormatter}
              visible={this.vanzatorVizibilitate()}
              width="100"
            />
            <ColumnDirective
              field="pretCuDiscount"
              headerText="PRET COMANDA"
              textAlign="Right"
              valueAccessor={this.currencyFormatter}
              visible={this.vanzatorVizibilitate()}
              width="100"
            />
            <ColumnDirective
              field="pretClientFinal"
              headerText="PRET CLIENT FINAL"
              textAlign="Right"
              valueAccessor={this.currencyFormatter}
              width="100"
            />
            <ColumnDirective
              commands={this.commands}
              headerText=""
              visible={false}
              width="0"
            />
          </ColumnsDirective>
          <AggregatesDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective
                  customAggregate ={this.customAggregateMp}
                  field="mp"
                  footerTemplate={this.footerTotalMp}
                  type="Custom"
                  width="200"
                />
                <AggregateColumnDirective
                  field="pretCatalog"
                  footerTemplate={this.footerTotal}
                  type="Sum"
                  width="200"
                />
                <AggregateColumnDirective
                  field="pretCuDiscount"
                  footerTemplate={this.footerTotal}
                  type="Sum"
                  width="200"
                />
                <AggregateColumnDirective
                  field="pretClientFinal"
                  footerTemplate={this.footerTotal}
                  type="Sum"
                  width="200"
                />
              </AggregateColumnsDirective>
            </AggregateDirective>
          </AggregatesDirective>
          <Inject services={[Selection, Page,Toolbar, CommandColumn, Resize, ColumnMenu, Edit, ForeignKey,  Aggregate]}/>
        </GridComponent>
      </div>
      <ReperEdit
        adaugaItem={this.adaugaItem}
        modificaItem={this.modificaItem}
      />
    </Card>
  );
}   
}

OrderContentUG.propTypes = {
  className: PropTypes.string,
  currentItem:PropTypes.object, 
  currentProduct:PropTypes.object, 
  currentUser:PropTypes.object,
  deletedItems:PropTypes.array, 
  enqueueSnackbar:PropTypes.func, 
  resetErrors:PropTypes.func, 
  setCurrentItem:PropTypes.func,
  setDeletedItems:PropTypes.func,
  setOpenEditItem:PropTypes.func,
  setUpdatedOrder:PropTypes.func,
  updatedOrder:PropTypes.object
};


const mapStateToProps=state=>({
  currentProduct:selectOrderCurrentProduct(state),
  currentUser:selectCurrentUser(state),
  currentOrder:selectOrderCurrentOrder(state),
  currentItem:selectOrderCurrentItem(state),
  loading:selectOtherLoading(state),
  materiale:selectLookupMateriale(state),
  orders:selectOrderOrders(state),
  updatedOrder:selectOrderUpdatedOrder(state),
  deletedItems:selectOrderDeletedItems(state),
  errors:selectOtherErrors(state)
})

const mapDispatchToProps=dispatch=>({
  setLoading:boll=>dispatch(setLoading(boll)),
  setCurrentItem:item=>dispatch(setCurrentItem(item)),
  setOpenEditItem:bool=>dispatch(setOpenEditItem(bool)),
  setUpdatedOrder:orderUp=>dispatch(setUpdatedOrder(orderUp)),
  setDeletedItems:items=>dispatch(setDeletedItems(items)),
  resetErrors:()=>dispatch(resetErrors()),
  setErrors:(eroare)=>dispatch(setErrors(eroare))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withSnackbar(OrderContentUG)));


