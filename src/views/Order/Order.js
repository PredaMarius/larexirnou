/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { makeStyles } from '@material-ui/styles';
import { OrderHeader } from './components';
import { OrderContentJV} from './components';
import { OrderContentRO} from './components';
import { OrderContentRE} from './components';
import { OrderContentUG} from './components';
import { OrderContentPI} from './components';
import { OrderContentJO} from './components';
import { OrderFooter } from './components';
import { selectOtherOverlaySpinner } from '../../redux/other/other.selectors'
import { selectOrderCurrentProduct } from '../../redux/order/order.selectors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const Order = (props) => {
  const classes = useStyles();
  const {overlaySpinner, currentProduct}=props
  const product = () => {
    switch(currentProduct.cod) {
      case 'jv':   
        return <OrderContentJV/>;
      case 'ro':   
        return <OrderContentRO/>;
      case 're':   
        return <OrderContentRE/>;
      case 'ug':   
        return <OrderContentUG/>;
      case 'pi':  
        return <OrderContentPI/>;
      case 'jo':  
        return <OrderContentJO/>;
      default: 
        return <h1>Nici un tip de produs nu este setat</h1>
    }
  }

  return (
   
    <LoadingOverlay
      active={overlaySpinner}
      spinner
      text="Loading ..."
    >
      <div className={classes.root}>
        <OrderHeader/>
        {product()}
        <OrderFooter/>
      </div>
    </LoadingOverlay>
    
  );
};

const mapStateToProps=state=>({
  overlaySpinner:selectOtherOverlaySpinner(state),
  currentProduct:selectOrderCurrentProduct(state)

})


export default connect(mapStateToProps)(Order) ;
