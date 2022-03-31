/* eslint-disable linebreak-style */
import React from 'react';
import {connect} from 'react-redux';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  colors
} from '@material-ui/core';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { withSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert';
import {strapi} from '../../../../strapi/strapi.config';
import {setDeliveryAddressesStart} from '../../../../redux/user/user.actions';


const useStyles = makeStyles(() => ({
  root: {
    padding:'12px'
  },
  content: {
    padding: 0
  },
  inner: {
    width:'auto'
  },
  header:{
    background:colors.blueGrey[700],
  },
  buttonEditare:{
    color:colors.blueGrey[700],
  },
  buttonStergere:{
    color:colors.red[500],
  }

}));


const AccountListaAdrese = props => {
  const { className,deliveryAddresses,setDeliveryAddressesStart,handleEdit, currentUser, enqueueSnackbar } = props;
  const classes = useStyles();
  //--------------------------------------------------------------------
  const handleDelete=async(id)=>{
    confirmAlert({
      title: 'Confirmare stergere',
      message: 'Sunteti sigur ca doriti stergerea acestei adrese de livrare din lista?',
      buttons: [
        {
          label: 'Da',
          onClick: async () => {
            await strapi.deleteEntry('adresaLivrares',id)
              .catch(e=>{
                enqueueSnackbar(`Eroare : nu am putut sterge adresa de livrare.(${e})`,{ 
                  variant: 'error',
                  persist:true,  
                })
              })
              .then(()=>{
                enqueueSnackbar('Adresa de livrare a fost stearsa cu succes.',{ 
                  variant: 'success',
                  autoHideDuration:1500
                })
              })
              .then(()=>setDeliveryAddressesStart(currentUser.idFirma.id))
          }
        },
        {
          label: 'Nu',
          onClick: () => {
            enqueueSnackbar('Operatia de stergere a fost abandonata.',{ 
              variant: 'warning',
              autoHideDuration:1500
            })    
          }
        }
      ]
    });   
  }
  //--------------------------------------------------------------------
  return (
    <Card
      
      className={clsx(classes.root, className)}
    >
      <CardHeader 
        className={classes.header}
        title="ADRESE DE LIVRARE"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableBody>
                {deliveryAddresses.map(adresa => (
                  <TableRow
                    hover
                    key={adresa.id}
                  >
                    <TableCell>{adresa.adresa}</TableCell>
                    <TableCell >
                      <Button className={classes.buttonEditare} onClick={()=>{handleEdit(adresa.id)}}>Editare</Button>
                      <Button className={classes.buttonStergere} onClick={()=>{handleDelete(adresa.id)}}>Sterge</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      
    </Card>
  );
};

AccountListaAdrese.propTypes = {
  className: PropTypes.string,
  currentUser:PropTypes.object,
  deliveryAddresses:PropTypes.array,
  enqueueSnackbar:PropTypes.func,
  handleEdit:PropTypes.func,
  setDeliveryAddressesStart:PropTypes.func
};

const mapStateToProps=state=>({
  currentUser:state.user.currentUser,
  deliveryAddresses:state.user.deliveryAddresses
})

const mapDispatchToProps=dispatch=>({
  setDeliveryAddressesStart:idFirma=>dispatch(setDeliveryAddressesStart(idFirma))
})

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AccountListaAdrese));
