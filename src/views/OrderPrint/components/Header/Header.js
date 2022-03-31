/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { dataFormatRO } from '../../../../utils/functiiComune';


// Create styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    display:'flex',
    flexDirection: 'column',
  },
  denumireFirma:{
    marginTop: 25,
    marginLeft:25,
    marginBottom:0,
  },
  linie:{
    marginTop:-15,
    marginLeft:25,
    padding:0,
  },
  dateFirma:{
    marginTop: 0,
    marginLeft:25,
    fontSize:10,
  },

  titlu:{
    marginTop: 25,
    marginLeft:25,
    marginBottom:25,
    textAlign:'center',
    fontWeight:'900'
  },
  dateComanda:{
    marginTop: 0,
    marginLeft:25,
    marginBottom:0,
    fontSize:12,
    
  }
});

// Create Document Component
const Header = (props) => {
  return(
    <View style={styles.section}>
      <Text style={styles.denumireFirma}>{props.currentUser.idFirma.denumire}</Text>
      <Text style={styles.linie}>____________________________________________________________________________</Text>
      <Text style={styles.dateFirma}>{`Cod fiscal:${props.currentUser.idFirma.atributCodFiscal===null?'':props.currentUser.idFirma.atributCodFiscal}${props.currentUser.idFirma.codFiscal}`}</Text>
      <Text style={styles.dateFirma}>{`Reg. com.:${props.currentUser.idFirma.regCom}`}</Text>
      <Text style={styles.dateFirma}>{`Adresa:${props.currentUser.idFirma.oras}, ${props.currentUser.idFirma.adresa}`}</Text>
      <Text style={styles.dateFirma}>{`Telefon:${props.currentUser.idFirma.telefon}`}</Text>
      <Text style={styles.dateFirma}>{`Email:${props.currentUser.idFirma.email}`}</Text>

      <Text style={styles.titlu}>{`COMANDA ${props.currentProduct.title.toUpperCase()}`} </Text>
      

      <Text style={styles.dateComanda}>{`Numar: ${props.currentOrder.id}     Data: ${dataFormatRO(props.currentOrder.dataComanda)}   Stadiu: ${props.currentOrder.stadiu}`}</Text>
      <Text style={styles.dateComanda}>{`Observatii: ${props.currentOrder.observatii}`}</Text>
      <Text style={styles.dateComanda}>{`Adresa livrare: ${props.currentOrder.adresaLivrare}`}</Text>
      
    </View>
  )
};

export default Header