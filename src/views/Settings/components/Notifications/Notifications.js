/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardActions,
  Divider,
  Button,
  colors
} from '@material-ui/core';
import {strapi, STRAPI_PASSWORD_RESET_URL} from '../../../../strapi/strapi.config';
import { withSnackbar } from 'notistack';
import { selectCurrentUser } from '../../../../redux/user/user.selectors'

const useStyles = makeStyles(() => ({
  root: {},
  alignButton:{
    desplay:'flex',
    justifyContent: 'flex-end' 
  },
  buton:{
    width:'100%', 
    background:colors.blueGrey[500],
    color:'white' 
  },
  header:{
    background:colors.blueGrey[700],
  }
}));

const Notifications = props => {
  const { className, enqueueSnackbar, currentUser } = props;
  const [enabled, setEnabled]=useState(true)
  const classes = useStyles();
  //----------------------------------------------------------------------------------------
  const handleSubmit= async (e)=>{
    e.preventDefault()
    setEnabled(false)
    await strapi.forgotPassword(currentUser.email, STRAPI_PASSWORD_RESET_URL)
      .catch(e=>(
        enqueueSnackbar(`Eroare : nu am putut trimite e-mailul cu codul de resetare.(${e})`,{ 
          variant: 'error',
          persist:true,  
        })
      ))
      .then(()=>{
        enqueueSnackbar('Email-ul cu codul de resetare a fost trimis cu succes.',{ 
          variant: 'success',
          autoHideDuration:1500
        })
      })
  }
  //----------------------------------------------------------------------------------------

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <form
        onSubmit={handleSubmit}
      >
        <CardHeader 
          className={classes.header}
          subheader="Pentru a reseta parola trebuie sa obtineti un cod de acces, apasand butonul de mai jos.Veti primi un email cu codul necesar resetarii parolei. Verificati primirea email-ului si in Spam."
          title="Resetare parola acces"
        />
        <Divider />
        
        <CardActions className={classes.alignButton}>
          <Button 
            className={classes.buton}
            color="primary"
            disabled={!enabled}
            type="submit"
            variant="outlined"         
          >
            OBTINE COD RESETARE PAROLA
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string,
  currentUser:PropTypes.object,
  enqueueSnackbar:PropTypes.func

};

const mapStateToProps=state=>({
  currentUser:selectCurrentUser(state)
})

export default connect(mapStateToProps)(withSnackbar(Notifications));
