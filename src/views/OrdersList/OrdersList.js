import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { OrdersTable } from './components';
import { OrdersHeader } from './components';
import { OrdersFooter } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const OrdersList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <OrdersHeader/>
      <OrdersTable/>
      <OrdersFooter/>
      <div style={{color:'grey', marginTop:'15px'}}>
        <p>Atentie! Cursul valutar luat in calcul pentru produsele a caror pret este in Euro este cursul BNR+ 1% de la data in care preluam comanda.</p>
        <p>Preluarea comenzilor se face in timpul programului de lucru (Luni-Vineri intre orele 09:00-17:00, exceptie facand sarbatorile legale). Pentru comenzile transmise inafara programului de lucru, data preluarii este urmatoarea zi lucratoare.</p>
        <p>Din acest motiv, va rugam sa luati in calcul eventuala fluctuatie a cursului la momentul ofertarii catre clientul final.</p>
      </div>
    </div>
    
  );
};

export default OrdersList;
