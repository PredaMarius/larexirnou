/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {connect} from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  colors 
} from '@material-ui/core';
import './accountdetails.css';
import {strapi} from '../../../../strapi/strapi.config';
import {setCurrentUserSuccess} from '../../../../redux/user/user.actions';
import {setUser} from '../../../../strapi/strapi.utils';

const useStyles = makeStyles(() => ({
  root: {color:'white'},
  card:{
    marginTop:20
  },
  alignButton:{
    display:'flex',
    justifyContent: 'flex-end' 
  },
  buton:{
    width:'35%',
    background:colors.blueGrey[500],
  },
  header:{
    background:colors.blueGrey[700],
  }
}));

const AccountDetails = props => {
  const { className,currentUser,setCurrentUserSuccess, enqueueSnackbar} = props;
  const classes = useStyles();
  const [data, setdata] = useState({
    denumire: currentUser.idFirma.denumire,
    codFiscal: currentUser.idFirma.codFiscal,
    atributFiscal: currentUser.idFirma.atributFiscal,
    regCom: currentUser.idFirma.regCom,
    oras: currentUser.idFirma.oras,
    adresa: currentUser.idFirma.adresa,
    judet:currentUser.idFirma.judet,
    telefon:currentUser.idFirma.telefon,
    email:currentUser.idFirma.email,
    cont:currentUser.idFirma.cont,
    banca:currentUser.idFirma.banca,
    persoanaContact: currentUser.idFirma.persoanaContact,
    discountJV: currentUser.idFirma.discountJV,
    discountRO: currentUser.idFirma.discountRO,
    discountRE: currentUser.idFirma.discountRE,
    discountUG: currentUser.idFirma.discountUG,
    discountPI: currentUser.idFirma.discountPI,
    discountJO: currentUser.idFirma.discountJO,
    discountCO: currentUser.idFirma.discountCO,
    atentionare: currentUser.idFirma.atentionare,
    adaosJV: currentUser.idFirma.adaosJV,
    adaosRO: currentUser.idFirma.adaosRO,
    adaosRE: currentUser.idFirma.adaosRE,
    adaosUG: currentUser.idFirma.adaosUG,
    adaosPI: currentUser.idFirma.adaosPI,
    adaosJO: currentUser.idFirma.adaosJO,
    adaosCO: currentUser.idFirma.adaosCO,
  });
  //-------------------------------------------------------
  const handleChange = event => {
    setdata({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  //-------------------------------------------------------
  const handleSubmit = async e => {
    e.preventDefault()
    await strapi.updateEntry('firmas', currentUser.idFirma.id,data)
      .catch(e=>(
        enqueueSnackbar(`Eroare : nu am putut salva modificarile.(${e})`,{ 
          variant: 'error',
          persist:true,  
        })
      ))
      .then((res)=>{
        setUser({...currentUser, idFirma:res,comandas:[]})
        setCurrentUserSuccess({...currentUser, idFirma:res,comandas:[]})
        enqueueSnackbar('Modificari salvate cu succes.',{ 
          variant: 'success',
          autoHideDuration:1500
        })
      })
  }; 
  //-------------------------------------------------------
  
  return (
    <div>
      <Card
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CardHeader 
            className={classes.header}
            subheader="Informatiile pot fi editate"
            title="DATE SOCIETATE"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Denumire firma"
                  margin="dense"
                  name="denumire"
                  onChange={handleChange}
                  required
                  value={data.denumire || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={4}
                xs={6}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="CUI"
                  margin="dense"
                  name="codFiscal"
                  onChange={handleChange}
                  required
                  value={data.codFiscal || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={6}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Atr. fiscal"
                  margin="dense"
                  name="atributFiscal"
                  onChange={handleChange}
                  value={data.atributFiscal || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={5}
                xs={12}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Reg. com."
                  margin="dense"
                  name="regCom"
                  onChange={handleChange}
                  value={data.regCom || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={6}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Oras"
                  margin="dense"
                  name="oras"
                  onChange={handleChange}
                  required
                  value={data.oras || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={6}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Judet"
                  margin="dense"
                  name="judet"
                  onChange={handleChange}
                  required
                  value={data.judet || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Adresa"
                  margin="dense"
                  name="adresa"
                  onChange={handleChange}
                  required
                  value={data.adresa || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Email"
                  margin="dense"
                  name="email"
                  onChange={handleChange}
                  required
                  value={data.email || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Telefon"
                  margin="dense"
                  name="telefon"
                  onChange={handleChange}
                  required
                  type="number"
                  value={data.telefon || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Cont bancar"
                  margin="dense"
                  name="cont"
                  onChange={handleChange}
                  value={data.cont || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Banca"
                  margin="dense"
                  name="banca"
                  onChange={handleChange}
                  value={data.banca || ''}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="Persoana contact"
                  margin="dense"
                  name="persoanaContact"
                  onChange={handleChange}
                  required
                  value={data.persoanaContact || ''}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions className={classes.alignButton}>
            <Button 
              className={classes.buton}
              color="primary"
              type="submit"
              variant="contained"
            >
            Salvare
            </Button>
          </CardActions>
        </form>
      </Card>

      <Card
        className={clsx(classes.root, className, classes.card)}
      >
        <form
          autoComplete="off"
          noValidate
        >
          <CardHeader 
            className={classes.header}
            subheader="Discounturi acordate de Larexir Decor conform intelegerilor contractuale"
            title="DISCOUNTURI"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={1}
            > 

              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  disabled
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="JV"
                  margin="dense"
                  name="discountJV"
                  onChange={handleChange}
                  value={data.discountJV || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  disabled
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="RO"
                  margin="dense"
                  name="discountRO"
                  onChange={handleChange}
                  value={data.discountRO || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  disabled
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="RE"
                  margin="dense"
                  name="discountRE"
                  onChange={handleChange}
                  value={data.discountRE || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  disabled
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="UG"
                  margin="dense"
                  name="discountUG"
                  onChange={handleChange}
                  value={data.discountUG || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  disabled
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="PI"
                  margin="dense"
                  name="discountPI"
                  onChange={handleChange}
                  value={data.discountPI || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  disabled
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="JO"
                  margin="dense"
                  name="discountJO"
                  onChange={handleChange}
                  value={data.discountJO || ''}
                  variant="outlined"
                />
              </Grid>

            </Grid>
          </CardContent>
        </form>
      </Card>



      <Card
        className={clsx(classes.root, className, classes.card)}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CardHeader 
            className={classes.header}
            subheader="Adaosuri peste pretul de catalog aplicate clientului final"
            title="ADAOSURI"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={1}
            > 

              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="JV"
                  margin="dense"
                  name="adaosJV"
                  onChange={handleChange}
                  value={data.adaosJV || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="RO"
                  margin="dense"
                  name="adaosRO"
                  onChange={handleChange}
                  value={data.adaosRO || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="RE"
                  margin="dense"
                  name="adaosRE"
                  onChange={handleChange}
                  value={data.adaosRE || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="UG"
                  margin="dense"
                  name="adaosUG"
                  onChange={handleChange}
                  value={data.adaosUG || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="PI"
                  margin="dense"
                  name="adaosPI"
                  onChange={handleChange}
                  value={data.adaosPI || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={2}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{shrink:true}}
                  label="JO"
                  margin="dense"
                  name="adaosJO"
                  onChange={handleChange}
                  value={data.adaosJO || ''}
                  variant="outlined"
                />
              </Grid>

            </Grid>
          </CardContent>
          <Divider />
          <CardActions className={classes.alignButton}>
            <Button 
              className={classes.buton}
              color="primary"
              type="submit"
              variant="contained"
            >
            Salvare
            </Button>
          </CardActions>
        </form>
      </Card>




    </div>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  currentUser:PropTypes.object,
  enqueueSnackbar:PropTypes.func,
  setCurrentUserSuccess:PropTypes.func
};

const mapStateToProps=state=>({
  currentUser:state.user.currentUser
})

const mapDispatchToProps=dispatch=>({
  setCurrentUserSuccess:user=>dispatch(setCurrentUserSuccess(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AccountDetails));
