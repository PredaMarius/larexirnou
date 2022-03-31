/* eslint-disable linebreak-style */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Typography,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    width: 200,
    height: 200,
  },
  info: {
    marginTop: 1,
    marginLeft:1,
    color:colors.grey[700],
    fontSize:15
  },
  header:{
    background:colors.blueGrey[700],
  }, 
  body:{
    background:colors.blueGrey[100],
   
  }
}));

const Informatii = props => {

  const { className } = props;

  const classes = useStyles();
  const inf = {
    logo: '/images/logos/logoMediu.ico',
    adresa: 'Strada Soldat Ene Modoran, Nr.6 Bucuresti',
    cui:' RO 24130091',
    regcom: 'J40/11378/02.07.2008',
    telefon:'0738 455 555',
    email:'office@larexir.ro',
    obs:'Raspundem cinci zile pe saptamana, in intervalul 09:00-17:30'
  };
  

  return (
    <Card
      className={clsx(classes.root, className)}
    >
     
      <CardHeader
        className={classes.header} 
        title="DATE DE CONTACT"
      />
      <Divider />
      <CardContent className={classes.body} >
        <Grid
          container
          spacing={1}
        >
          <Grid
            alignItems="center"
            container
            justify="center"
          >
            <img
              alt="Logo"
              className={classes.logo}
              src={inf.logo}
              to="/"
            />
           
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              align="center"
              variant="h3"
            >
              SC LAREXIR DECOR SRL
            </Typography>
            <Divider 
             
              variant="fullWidth"
            />
          </Grid>
          
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              className={classes.info}
              variant="h4"
            >
              {inf.adresa}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              className={classes.info}
              variant="h4"
            >
              {inf.cui}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              className={classes.info}
              variant="h4"
            >
              {inf.regcom}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              className={classes.info}
              variant="h4"
            >
                  Telefon: {inf.telefon}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              className={classes.info}
              variant="h4"
            >
                  Email: {inf.email}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              align="center"
              className={classes.info}
              style={{background:colors.red[700], color:'white'}}
              variant="h4"
            >
              {inf.obs}
            </Typography>
          </Grid>
              
        </Grid>
            
            
      </CardContent>
        
    </Card>
  );
};

Informatii.propTypes = {
  className: PropTypes.string
};

const mapStateToProps=state=>({
  currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(Informatii);
