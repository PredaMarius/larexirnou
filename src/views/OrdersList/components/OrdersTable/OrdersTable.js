/* eslint-disable linebreak-style */
import React, {useRef} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Loader from 'react-loader-spinner';
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
  Sort, 
  CommandColumn, 
  Resize, 
  ColumnMenu,
  Edit,
  ForeignKey
} from '@syncfusion/ej2-react-grids';
import { L10n, getValue} from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { withSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './orderstable.css';
import { dataFormatRO } from '../../../../utils/functiiComune';
import {strapi} from '../../../../strapi/strapi.config';
import { setOrdersSuccess, setCurrentOrder, setCurrentItem, setUpdatedOrder, setDeletedItems, setOrdersStart} from '../../../../redux/order/order.actions';
import { selectOrderCurrentProduct, selectOrderOrders }from '../../../../redux/order/order.selectors';
import { selectCurrentUser }from '../../../../redux/user/user.selectors';
import { selectOtherLoading}from '../../../../redux/other/other.selectors';

L10n.load({
  'ro-RO': {
    'grid': {
      'Add':'Adauga',
      'Edit':'Modifica',
      'Delete':'Sterge',
      'Update':'Actualizare',
      'Cancel': 'Abandon',
      'Save':'Salveaza',
      'Item':'comanda',
      'Items':'comenzi',
      'EmptyRecord':'Nu exista inregistrari',
      'EditOperationAlert':'Nu ati selectat nici o comanda!',
      'DeleteOperationAlert':'Nu ati selectat nici o comanda!',
      'SaveButton':'Salvare',
      'CancelButton':'Abandon',
      'ConfirmDelete':'Sunteti sigur ca doriti stergerea comenzii?',
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

const useStyles = makeStyles(() => ({
  spinner:{
    textAlign: 'center',
    padding:'200px'
  },
  netransmisa:{
    color:'orange'
  }
}));

const OrdersTable = props => {
  const { currentUser,currentProduct,history,setOrdersSuccess,setCurrentOrder, loading, setCurrentItem, setUpdatedOrder, orders, setDeletedItems, enqueueSnackbar,} = props;
  const toolbarOptions =[
    { text: 'Adauga', tooltipText: 'Adauga comanda noua', prefixIcon: 'e-add', id: 'Adauga' },
    { text: 'Modifica', tooltipText: 'Modifica comanda selectata', prefixIcon: 'e-edit', id: 'Modifica' },
    { text: 'Sterge', tooltipText: 'Sterge comanda selectata', prefixIcon: 'e-delete', id: 'Sterge' },
  ];
  const editSettings = { allowDeleting: false, mode: 'Dialog', allowEditOnDblClick: false, showDeleteConfirmDialog: true };
  const sortingOptions = {columns: [{ field: 'id', direction: 'Descending' }]}
  const selectionsettings = {checkboxMode: 'ResetOnRowClick',type: 'Single' };
  const classes = useStyles();
  const masterGrid = useRef(null)

  //----------------------------------------------------------------------------------------------------
  const jsonCopy=(src)=>{
    return JSON.parse(JSON.stringify(src));
  }
  //----------------------------------------------------------------------------------------------------
  const rowselect=(args)=>{
    let selRecord = args.data;
    vizualizareComandaSetCurentOrder(selRecord)
    vizualizareComandaSetUpdatedOrder(selRecord)
  }
  //----------------------------------------------------------------------------------------------------
  const rowdeselect=()=>{
    setCurrentOrder({});
  }
  //----------------------------------------------------------------------------------------------------
  const actionBegin=(args)=> {
    if (args.requestType === 'save') {
      if (masterGrid.pageSettings.currentPage !== 1 && masterGrid.editSettings.newRowPosition === 'Top') {
        args.index = (masterGrid.pageSettings.currentPage * masterGrid.pageSettings.pageSize) - masterGrid.pageSettings.pageSize;
      }
      else if (masterGrid.editSettings.newRowPosition === 'Bottom') {
        args.index = (masterGrid.pageSettings.currentPage * masterGrid.pageSettings.pageSize) - 1;
      }
    }
  }
  //----------------------------------------------------------------------------------------------------
  const actionComplete=(args)=>{
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 90 + 'px';
        args.dialog.dataBind();    
      }
    }
  }
  //----------------------------------------------------------------------------------------------------

  const currencyFormatter=(field, data)=>{
    if (currentProduct.cod==='jv' || currentProduct.cod==='ro'|| currentProduct.cod==='jo'){
      return  getValue(field, data) + ' Lei';
    }else{
      return  getValue(field, data) + ' Euro';
    }

  }
  //----------------------------------------------------------------------------------------------------
  const dateFormatter=(field, data)=>{
    return  dataFormatRO(getValue(field, data)).substring(0, 10);
  }
  //----------------------------------------------------------------------------------------------------
  const customizeCell=(args)=>{
    if((args.column).field === 'stadiu' && args.data && args.cell) {
      if (getValue('stadiu', args.data) ==='NETRANSMISA'){
        args.cell.classList.add('netransmisa');
      } 
    }
  }
  //----------------------------------------------------------------------------------------------------
  const headerCellInfo=(args)=>{ 
    args.node.getElementsByClassName('e-checkbox-wrapper')[0] && args.node.getElementsByClassName('e-checkbox-wrapper')[0].remove(); 
  } 
  //----------------------------------------------------------------------------------------------------
  const clickHandlerMaster=async e=>{
    const { setCurrentOrder,setUpdatedOrder}=props;
    //.....................................
    if (e.item.properties.id==='Adauga'){
      switch(currentProduct.cod){
        case 'jv':
          setCurrentOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountJV, id:0, comandarepers:[]})
          setUpdatedOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountJV, id:0, comandarepers:[]})
          break;
        case 'ro':
          setCurrentOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountRO, id:0, comandarepers:[]})
          setUpdatedOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountRO, id:0, comandarepers:[]})
          break;
        case 're':
          setCurrentOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountRE, id:0, comandarepers:[]})
          setUpdatedOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountRE, id:0, comandarepers:[]})
          break;
        case 'ug':
          setCurrentOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountUG, id:0, comandarepers:[]})
          setUpdatedOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountUG, id:0, comandarepers:[]})
          break;
        case 'pi':
          setCurrentOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountPI, id:0, comandarepers:[]})
          setUpdatedOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountPI, id:0, comandarepers:[]})
          break;
        case 'jo':
          setCurrentOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountJO, id:0, comandarepers:[]})
          setUpdatedOrder({tipProdus:currentProduct.cod,idFirma:currentUser.idFirma.id,discount:currentUser.idFirma.discountJO, id:0, comandarepers:[]})
          break;
        default:
          alert('Eroare. Nu ma gasit nici un produs selectat!')
      }
      
      setDeletedItems([])
      let path = '/order';
      history.push(path);
    }
    //.....................................
    if (e.item.properties.id==='Modifica'){
      if (masterGrid.current.getSelectedRowIndexes().length){
        await vizualizareComandaSetCurentOrder(orders.filter(com=>(com.id===masterGrid.current.selectionModule.data.id))[0])
        await vizualizareComandaSetUpdatedOrder(orders.filter(com=>(com.id===masterGrid.current.selectionModule.data.id))[0])
        setDeletedItems([])
        setCurrentItem({}) 
        history.push('/order')
      }else{
        enqueueSnackbar('Nu ati selectat nici o comanda.',{ 
          variant: 'error',
          autoHideDuration:1500
        })
      } 
    }
    //.....................................
    if (e.item.properties.id==='Sterge'){
      if(masterGrid.current.selectionModule.data.stadiu ==='NETRANSMISA'){
        confirmAlert({
          title: 'Confirmare stergere',
          message: 'Sunteti sigur ca doriti stergerea comenzii selectate?',
          buttons: [
            {
              label: 'Da',
              onClick: async () => {
                document.body.style.cursor = 'wait';
                await strapi.deleteEntry('comandas',masterGrid.current.selectionModule.data.id)
                  .catch(e=>(
                    props.enqueueSnackbar(`Eroare : nu am putut sterge comanda.(${e})`,{ 
                      variant: 'error',
                      persist:true,  
                    })
                  ))
                  .then(()=>{
                    setOrdersSuccess(orders.filter(order=>(order.id!==masterGrid.current.selectionModule.data.id)))
                    enqueueSnackbar('Comanda a fost stearsa cu succes.',{ 
                      variant: 'success',
                      autoHideDuration:1500
                    })
                    document.body.style.cursor = 'pointer';
                    masterGrid.current.refresh();
                  })
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
      }else{
        enqueueSnackbar('Doar comenzile NETRANSMISE se pot sterge',{ 
          variant: 'warning',
        })
      }
    }   
  }
  //----------------------------------------------------------------------------------------------------
  const vizualizareComandaSetCurentOrder=(selectedRow)=>{
    return new Promise( (resolve) => { 
      setTimeout(async() => {
        setCurrentOrder(jsonCopy(selectedRow))
        resolve('ok')
      },50)
    })
  }
  //----------------------------------------------------------------------------------------------------
  const vizualizareComandaSetUpdatedOrder=(selectedRow)=>{
    return new Promise( (resolve) => { 
      setTimeout(async() => {
        setUpdatedOrder(jsonCopy(selectedRow))
        resolve('ok')
      },50)
    })
  }
  //----------------------------------------------------------------------------------------------------
  const vanzatorVizibilitate=()=>{
    if(currentUser.role.name==='Vanzator'){
      return false;
    }else{
      return true;
    }
  }
   
  if (loading===false) {
    return (
      <Card className="control-panel">
        <div className="control-section">
          <GridComponent 
            actionBegin={actionBegin.bind(this)} 
            actionComplete={actionComplete.bind(this)}  
            allowPaging 
            allowResizing 
            allowSorting 
            allowTextWrap 
            dataSource={orders} 
            editSettings={editSettings}
            enableHover={false} 
            gridLines="Both"
            headerCellInfo={headerCellInfo}
            locale="ro-RO"
            pageSettings={{ pageCount: 20 }}
            queryCellInfo={customizeCell}
            ref={masterGrid}
            rowDeselected={rowdeselect.bind(this)}
            rowSelected={rowselect.bind(this)} 
            selectedRowIndex={-1}
            selectionSettings={selectionsettings}
            sortSettings={sortingOptions}
            textWrapSettings={{wrapMode: 'Both'}}
            toolbar={toolbarOptions}
            toolbarClick={clickHandlerMaster}
          >
            <ColumnsDirective>
              <ColumnDirective
                allowEditing={false}
                headerText="SEL"
                textAlign="Center"
                type="checkbox"
                width="30"
              />
              <ColumnDirective
                field="id"
                headerText="NUMAR COMANDA"
                isPrimaryKey
                textAlign="Center"
                width="110"
              />
              <ColumnDirective
                field="dataComanda"
                headerText="DATA"
                textAlign="Center"
                valueAccessor={dateFormatter}
                width="110"
              />
              <ColumnDirective
                field="clientClient"
                headerText="CLIENT"
                width="150"
              />
              <ColumnDirective
                field="valoareComanda"
                headerText="VALOARE COMANDA"
                textAlign="Right"
                valueAccessor={currencyFormatter}
                visible={vanzatorVizibilitate()}
                width="120"
              />
              <ColumnDirective
                field="valoareClientFinal"
                headerText="VALOARE CLIENT FINAL"
                textAlign="Right"
                valueAccessor={currencyFormatter}
                width="120"
              />
              <ColumnDirective
                field="stadiu"
                headerText="STADIU"
                textAlign="Center"
                width="150"
              />
            </ColumnsDirective>
            
            <Inject services={[Selection, Page, Sort,Toolbar, CommandColumn, Resize, ColumnMenu, Edit, ForeignKey]}/>
          </GridComponent>
        </div>
      </Card>
    )
  } else {
    return (
      <div className={classes.spinner}>
        <Loader
          color="#00BFFF"
          height={100}
          type="Puff"
          width={100}
        />
      </div>
    );
  }
}

OrdersTable.propTypes = {
  className: PropTypes.string,
  currentProduct:PropTypes.object,
  currentUser:PropTypes.object,
  loading:PropTypes.bool,
  orders:PropTypes.array
};

const mapStateToProps=state=>({
  currentProduct:selectOrderCurrentProduct(state),
  orders:selectOrderOrders(state),
  currentUser:selectCurrentUser(state),
  loading:selectOtherLoading(state),
})

const mapDispatchToProps=dispatch=>({
  setOrdersSuccess:(orders)=>dispatch(setOrdersSuccess(orders)),
  setCurrentOrder:order=>dispatch(setCurrentOrder(order)),
  setCurrentItem:item=>dispatch(setCurrentItem(item)),
  setUpdatedOrder:order=>dispatch(setUpdatedOrder(order)),
  setDeletedItems:items=>dispatch(setDeletedItems(items)),
  setOrdersStart:(idFirmaAndTipProdusAndTipProdus)=>dispatch(setOrdersStart(idFirmaAndTipProdusAndTipProdus)),
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withSnackbar(OrdersTable)));
