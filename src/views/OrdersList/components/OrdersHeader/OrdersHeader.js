/* eslint-disable linebreak-style */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Divider,
} from '@material-ui/core';
import { selectOrderCurrentProduct } from '../../../../redux/order/order.selectors'

const useStyles = makeStyles(() => ({
  container: {
    width:'100%',
    textAlign:'center',
    color:'grey' 
  },
}));

const OrdersHeader = props => {
  const {currentProduct} = props;
  const classes = useStyles();
  return (
    <div>
      <Card
        className={classes.alignButton }
      >
        <Divider />
        <CardContent className={classes.container}>
          <div><h2>{currentProduct.title.toUpperCase()}</h2></div>
        </CardContent>
      </Card>
    </div>
  );
}

OrdersHeader.propTypes = {
  className: PropTypes.string,
  currentProduct:PropTypes.object
};

const mapStateToProps=state=>({
  currentProduct:selectOrderCurrentProduct(state),
})


export default connect(mapStateToProps)(withRouter(OrdersHeader));
