/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-first-prop-new-line */
import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
// import { useMediaQuery } from '@material-ui/core';
import {Card, Button, colors, Hidden} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withSnackbar } from 'notistack';
import { PDFDownloadLink } from '@react-pdf/renderer';
import './ordersfooter.css';
import ClientOffer from '../../../ClientOffer/ClientOffer'
import OrderPrint from '../../../OrderPrint/OrderPrint';
import { selectOrderCurrentOrder,selectOrderCurrentProduct} from '../../../../redux/order/order.selectors';
import { selectCurrentUser} from '../../../../redux/user/user.selectors';
import { selectLookupCurs } from 'redux/lookup/lookup.selectors';


const useStyles = makeStyles((theme) => ({
  root: {},
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
  buton:{
    margin:'15px',
    background:colors.blueGrey[500],
    [theme.breakpoints.down('sm')]: {
      margin: '2px' ,
      width: '100px' ,
      height: '30px', 
      fontSize:'7px'
    }
    
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  extendedIconGreen:{
    color:'yellow'
  },
  extendedIconRed:{
    color:'red'
  },
  extendedIconOrange:{
    color:'orange'
  }
}));

const OrdersFooter = props => {
  const classes = useStyles();
  const { currentUser, currentProduct, currentOrder,history, enqueueSnackbar, curs} = props;
  const handleBack=()=>{
    let path = '/products';
    history.push(path);
  }
 
  const vanzatorVizibilitate=()=>{
    if(currentUser.role.name==='Vanzator'){
      return true;
    }else{
      return false;
    }
  }

  return (
    <Card className={classes.container}> 
      <div> 
      
        <Button 
          className={classes.buton}
          color="primary"
          onClick={handleBack}
          size="small"
          startIcon={<ArrowBackIosIcon className={classes.extendedIconGrey}/>}
          variant="contained"
        >
        Meniu produse
        </Button>
      </div> 
      
      { currentOrder.id ?
        <div>
          <PDFDownloadLink
            document={<ClientOffer currentOrder={currentOrder}
              currentProduct={currentProduct}
              currentUser={currentUser}
              curs={curs}
            />}
            fileName="oferta.pdf"          
          >
            <Button 
          
              className={classes.buton}
              color="primary"
              size="small"
              startIcon={<GetAppIcon className={classes.extendedIconGreen}/>}
              variant="contained"
            >
            Oferta pdf
            </Button>
          </PDFDownloadLink>  
          <Hidden
            xlDown={vanzatorVizibilitate()}
            xlUp={vanzatorVizibilitate()}
          >
            <PDFDownloadLink
              document={<OrderPrint currentOrder={currentOrder}
                currentProduct={currentProduct}
                currentUser={currentUser}
                curs={curs}
              />}
              fileName="comanda.pdf"          
            >
              <Button 
                className={classes.buton}
                color="primary"
                size="small"
                startIcon={<GetAppIcon className={classes.extendedIconGreen}/>}
                variant="contained"
              >
          Comanda pdf
              </Button> 
            </PDFDownloadLink>
          </Hidden>
        </div>
        :
        <div>
          <Button 
          
            className={classes.buton}
            color="primary"
            onClick={()=>
              enqueueSnackbar('Va rog selectati o comanda.',{ 
                variant: 'warning',
                autoHideDuration:1500
              })
            }
            size="small"
            startIcon={<GetAppIcon className={classes.extendedIconGreen}/>}
            variant="contained" 
          >
        Oferta pdf
          </Button> 
          <Button 
            className={classes.buton}
            color="primary"
            onClick={()=>
              enqueueSnackbar('Va rog selectati o comanda.',{ 
                variant: 'warning',
                autoHideDuration:1500
              })
            }
            size="small"
            startIcon={<GetAppIcon className={classes.extendedIconGreen}/>}
            variant="contained"
          >
    Comanda pdf
          </Button> 
        </div>
      }
        
    </Card> 
  );
 
}

OrdersFooter.propTypes = {
  className: PropTypes.string,
  currentOrder:PropTypes.object,
  currentProduct:PropTypes.object,
  currentUser:PropTypes.object,
  history:PropTypes.object
};

const mapStateToProps=state=>({
  currentOrder:selectOrderCurrentOrder(state),
  currentProduct:selectOrderCurrentProduct(state),
  currentUser:selectCurrentUser(state),
  curs:selectLookupCurs(state)
})

export default connect(mapStateToProps)(withRouter(withSnackbar(OrdersFooter)));
