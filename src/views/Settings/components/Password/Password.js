/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  colors
} from '@material-ui/core';
import {strapi} from '../../../../strapi/strapi.config';
import { withSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {},
  alignButton:{
    desplay:'flex',
    justifyContent: 'flex-end' 
  },
  buton:{
    width:'35%',
    background:colors.blueGrey[500],
    color:'white'
  },
  header:{
    background:colors.blueGrey[700],
  }
}));

const Password = props => {
  const { className, enqueueSnackbar } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: '',
    cod:''
  });
  //--------------------------------------------------------------------------
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  //--------------------------------------------------------------------------
  const handleSubmit = async e => {
    e.preventDefault()
    if (values.password===values.confirm){
      await strapi.resetPassword(values.cod, values.password, values.confirm)
        .catch(e=>(
          enqueueSnackbar(`Eroare : nu am putut trimite datele setarii noii parole.(${e})`,{ 
            variant: 'error',
            persist:true,  
          })
        ))
        .then(()=>{
          enqueueSnackbar('Parola noua a fost setata cu succes.',{ 
            variant: 'success',
            autoHideDuration:1500
          })
          setValues({
            password: '',
            confirm: '',
            cod:''
          })
        })
    } else{
      enqueueSnackbar('Rubrica Parola  nu este egal cu rubrica Confirmare parola!',{ 
        variant: 'error',
      })
    }
  };
  //--------------------------------------------------------------------------
  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader 
          className={classes.header}
          title="Parola noua"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            InputLabelProps={{shrink:true}}
            label="Parola"
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={values.password || ''}
            variant="outlined"
          />
          <TextField
            fullWidth
            InputLabelProps={{shrink:true}}
            label="Confirmare parola"
            name="confirm"
            onChange={handleChange}
            required
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm || ''}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            InputLabelProps={{shrink:true}}
            label="Cod resetare"
            name="cod"
            onChange={handleChange}
            required
            style={{ marginTop: '1rem' }}
            type="text"
            value={values.cod || ''}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions className={classes.alignButton}>
          <Button
            className={classes.buton}
            color="primary"
            type="submit"
            variant="outlined"
          >
            RESETEAZA
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string,
  enqueueSnackbar:PropTypes.func
};

export default withSnackbar(Password);
