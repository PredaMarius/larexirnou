/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {connect} from 'react-redux';
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
import { withSnackbar } from 'notistack';
import {STRAPI_MAIL_POST_URL, LAREXIR_MAIL_FOR_CONTACT} from '../../../../strapi/strapi.config';
import LZString from 'lz-string';

const useStyles = makeStyles(() => ({
  root: {},
  alignButton:{
    desplay:'flex',
    justifyContent: 'flex-end' 
  },
  buton:{
    width:'20%',
    background:colors.blueGrey[500],
    color:'white'
  },
  header:{
    background:colors.blueGrey[700],
  } 
}));

const Email = props => {
  const { className, currentUser, enqueueSnackbar } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    email: currentUser.email,
    subiect: '',
    continut:''
  });
  //-----------------------------------------------------------------
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  //-----------------------------------------------------------------
  const handleSubmit = async e => {
    e.preventDefault()
    const TOKEN = LZString.decompress(localStorage.getItem('jwt'));
    await fetch(STRAPI_MAIL_POST_URL,{
      method:'post',
      headers:{ 'Authorization': `Bearer ${TOKEN}`,
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Accept-Charset':'utf-8'
      },
      body: JSON.stringify({
        to:LAREXIR_MAIL_FOR_CONTACT,
        replayTo:values.email,
        subject:values.subiect,
        text:values.continut
      })
    }).catch(e=>(
      enqueueSnackbar(`Eroare : mesajul nu a putut fi trimis.(${e})`,{ 
        variant: 'error',
        persist:true,  
      })
    ))
      .then((res)=>{
        if(res.status ===200){
          enqueueSnackbar('Mesaj trimis cu succes.',{ 
            variant: 'success',
            autoHideDuration:1500
          })
          setValues({
            email: currentUser.email,
            subiect: '',
            continut:''
          });
        }
      }) 
  };
  //-----------------------------------------------------------------
  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader
          className={classes.header}
          title="FORMULAR CONTACT"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            InputLabelProps={{shrink:true}}
            label="Email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={values.email || ''}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            InputLabelProps={{shrink:true}}
            label="Subiect"
            name="subiect"
            onChange={handleChange}
            required
            style={{ marginTop: '1rem' }}
            type="text"
            value={values.subiect || ''}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            label="Mesaj"
            multiline
            name="continut"
            onChange={handleChange}
            required
            rows={6}
            style={{ marginTop: '1rem' }}
            type="text"
            value={values.continut || ''}
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
            TRIMITE
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Email.propTypes = {
  className: PropTypes.string,
  currentUser:PropTypes.object,
  enqueueSnackbar:PropTypes.func
};

const mapStateToProps=state=>({
  currentUser:state.user.currentUser
})
export default connect(mapStateToProps)(withSnackbar(Email));
