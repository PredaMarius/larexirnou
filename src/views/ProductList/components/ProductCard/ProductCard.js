/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import {connect} from 'react-redux';
import {setCurrentProduct} from '../../../../redux/order/order.actions'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  // CardActions,
  Typography,
  // Grid,
  Divider,
  colors
} from '@material-ui/core';
// import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { setOrdersStart, setCurrentOrder, setCurrentItem, setUpdatedOrder} from '../../../../redux/order/order.actions';
import { setLoading, setErrors } from '../../../../redux/other/other.actions';
import { withSnackbar } from 'notistack';
import Loader from 'react-loader-spinner'

const useStyles = makeStyles(theme => ({
  root: {
    background:'#F0F5F4',
  },
  imageContainer: {
    height: 100,
    width: 100,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  icons:{
    with:30,
    height:30
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    width: '150',
    background:colors.blueGrey[400]
  },
  input: {
    display: 'none',
  }
}));

const ProductCard = props => {
  const { className, product, history, setCurrentProduct, setOrdersStart, currentUser} = props;
  const classes = useStyles();
  //--------------------------------------------------------------------------------------------
  const incarcaComenzi=()=>{
    setOrdersStart({idFirma:currentUser.idFirma.id,tipProdus:product.cod})
  }
  //--------------------------------------------------------------------------------------------
  const produsSelectat=()=>{
    return new Promise((resolve) => {
      setTimeout(async() => {
        setCurrentProduct(product)
        resolve('ok')
      },20) 
    })
  }
  //--------------------------------------------------------------------------------------------
  const handleButComanda=async ()=>{
    document.body.style.cursor = 'wait';
    await produsSelectat().then(()=>incarcaComenzi()) ;
    document.body.style.cursor = 'pointer';
    history.push('/orders');
  }
  //--------------------------------------------------------------------------------------------
  if (props.loading===false){
    return (
      <Card
        className={clsx(classes.root, className)}
      >
        <CardContent>
          <div className={classes.imageContainer}>
            <Button  onClick={handleButComanda}>  
              <img
                alt="Product"
                className={classes.image}
                src={product.imageUrl}
              />
            </Button>
          </div>
          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {product.title.toUpperCase()}
          </Typography>
          <Typography
            align="center"
            variant="body1"
          >
            {product.description}
          </Typography>
        </CardContent>
        <Divider />
        {/*<CardActions>
          <Grid
            container
            justify="space-between"
          >
            <Grid
              className={classes.statsItem}
              item
            >
            
              <Typography
                display="inline"
                variant="body2"
              >
               
                <Typography
                  display="inline"
                  variant="body2"
                >
                  <Button
                    className={classes.button}
                    color="secondary"
                    href={product.instructiuniUrl}
                    style={{fontSize:10}}
                    variant="contained"
                  >
                Instructiuni montaj
                  </Button>
                </Typography>
               
                
              
              </Typography>
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
            
              <Typography
                display="inline"
                variant="body2"
              >
                <Button
                  className={classes.button}
                  color="secondary"
                  onClick={handleButComanda}
                  variant="contained"
                >
                Comenzi <span style={{color:'#cc0000'}}> {product.cod.toUpperCase()}</span>
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </CardActions>*/}
      </Card>
    );
  }else{
    return (
      <div className="spinner">
        <Loader
          color="#00BFFF"
          height={100}
          type="Puff"
          width={100}
        />
      </div>
    );
  }
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

const mapStateToProps=state=>({
  currentProduct:state.order.currentProduct,
  currentUser:state.user.currentUser,
  loading:state.other.loading
})

const mapDispatchToProps=dispatch=>({
  setCurrentProduct:product=>dispatch(setCurrentProduct(product)),
  setOrdersStart:(idFirmaAndTipProdus)=>dispatch(setOrdersStart(idFirmaAndTipProdus)),
  setCurrentOrder:order=>dispatch(setCurrentOrder(order)),
  setLoading:boll=>dispatch(setLoading(boll)),
  setErrors:error=>dispatch(setErrors(error)),
  setCurrentItem:item=>dispatch(setCurrentItem(item)),
  setUpdatedOrder:order=>dispatch(setUpdatedOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withSnackbar(ProductCard)));
