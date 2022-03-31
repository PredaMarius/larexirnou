/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {connect} from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  colors
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import {strapi} from '../../../../strapi/strapi.config';
import AccountListaAdrese from '../AccountListaAdrese/AccountListaAdrese'
import { setDeliveryAddressesStart} from '../../../../redux/user/user.actions';
import {selectCurrentUser, selectDeliveryAddresses} from '../../../../redux/user/user.selectors';


const useStyles = makeStyles(() => ({
  root: {},
  alignButton:{
    desplay:'flex',
    justifyContent: 'flex-end' 
  },
  buton:{
    background:colors.blueGrey[500],
  },
  header:{
    background:colors.blueGrey[700],
    color:'white'
  },
  buttonSalvare:{
    
    color:'black'
  },
  buttonAbandon:{
    
    color:'red'
  }
}));

const AccountAdrese = props => {
  const { className,currentUser,deliveryAddresses,setDeliveryAddressesStart, enqueueSnackbar} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(true);
  const [data, setdata] = useState({
    id:null,
    numeLocatie: '',
    oras: '',
    adresa: '',
    judet: '',
    codPostal: '',
    telefon: '',
    observatii: '',
    idFirma: currentUser.idFirma.id
  });
  //-------------------------------------------------------
  const handleClose = () => {
    setOpen(false);
  };
  //-------------------------------------------------------
  const handleChange = event => {
    setdata({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  //-------------------------------------------------------
  const handleAdd = ()=>{
    setdata({
      id:'',
      numeLocatie: '',
      oras: '',
      adresa: '',
      judet: '',
      codPostal: '',
      telefon: '',
      observatii: '',
      idFirma: currentUser.idFirma.id
    });
    setOpen(true);
    setAdd(true)
  }
  //-------------------------------------------------------

  const handleEdit = (id)=>{
    setdata(deliveryAddresses.filter(a=>(a.id===id))[0].item)
    setOpen(true);
    setAdd(false)
  }
  //-------------------------------------------------------

  const handleSubmit = async e => {
    e.preventDefault()
    // eslint-disable-next-line no-unused-vars
    const {id,idFirma,created_at,updated_at, ...rest}=data
    if (!add){
      await strapi.updateEntry('adresaLivrares', data.id, rest)
        .catch(e=>{
          enqueueSnackbar(`Eroare : nu am putut salva modificarile.(${e})`,{ 
            variant: 'error',
            persist:true,  
          })
        })
        .then(()=>{
          enqueueSnackbar('Modificarile la adresa de livrare au fost salvate cu succes.',{ 
            variant: 'success',
            autoHideDuration:1500
          })
        })
        .then(()=>setDeliveryAddressesStart(currentUser.idFirma.id))
    }else{
      await strapi.createEntry('adresaLivrares',{idFirma:currentUser.idFirma.id,...rest})
        .catch(e=>{
          enqueueSnackbar(`Eroare : nu am putut salva adresa de livrare.(${e})`,{ 
            variant: 'error',
            persist:true,  
          })
        })
        .then(()=>
          enqueueSnackbar('Adresa de livrare a fost salvata cu succes.',{ 
            variant: 'success',
            autoHideDuration:1500
          })
        )
        .then(()=>setDeliveryAddressesStart(currentUser.idFirma.id))
    }
    setOpen(false);
  }; 

  //-------------------------------------------------------
  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >   
          <DialogTitle
            className={classes.header}
            id="form-dialog-title"
          >{add?'Adaugare adresa de livrare':'Editare adresa de livrare'}</DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Nume locatie"
                  margin="dense"
                  name="numeLocatie"
                  onChange={handleChange}
                  required
                  value={data.numeLocatie || ''}
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
                xs={12}
              >
                <TextField
                  fullWidth
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
                md={4}
                xs={4}
              >
                <TextField
                  fullWidth
                  label="Cod postal"
                  margin="dense"
                  name="codPostal"
                  onChange={handleChange}
                  required
                  value={data.codPostal || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={8}
                xs={8}
              >
                <TextField
                  fullWidth
                  label="Telefon"
                  margin="dense"
                  name="telefon"
                  onChange={handleChange}
                  required
                  value={data.telefon || ''}
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
                  label="Observatii"
                  margin="dense"
                  name="observatii"
                  onChange={handleChange}
                  value={data.observatii || ''}
                  variant="outlined"
                />
              </Grid>
            </Grid>
              
          </DialogContent>
          <DialogActions>
            <Button 
              className={classes.buttonAbandon}
              color="primary"
              onClick={handleClose}
            >
              Abandon
            </Button>
            <Button
              className={classes.buttonSalvare}
              color="primary"
              type="submit"
            >
              Salvare
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <AccountListaAdrese handleEdit={handleEdit}/>
      <Divider />
      <CardActions className={classes.alignButton}>
        <Button
          className={classes.buton}
          color="primary"
          onClick={handleAdd}
          variant="contained"
        >
           Adauga adresa livrare
        </Button>
      </CardActions>
    </Card>
  );
};

AccountAdrese.propTypes = {
  className: PropTypes.string,
  currentUser:PropTypes.object,
  deliveryAddresses:PropTypes.array,
  enqueueSnackbar:PropTypes.func,
  setDeliveryAddressesStart:PropTypes.func
};

const mapStateToProps=state=>({
  currentUser:selectCurrentUser(state),
  deliveryAddresses:selectDeliveryAddresses(state)
})

const mapDispatchToProps=dispatch=>({
  setDeliveryAddressesStart:idFirma=>dispatch(setDeliveryAddressesStart(idFirma))
})

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AccountAdrese));
