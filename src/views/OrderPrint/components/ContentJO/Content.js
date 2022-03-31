/* eslint-disable linebreak-style */
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';


// Create styles
const styles = StyleSheet.create({
  section: {
    marginLeft: 25,
    marginTop:5,
    marginBottom:5
  },
  row: {
    display: 'flex',
    flexDirection:'row',
    marginTop:0,
    marginBottom:0,
    marginLeft: 5,
    marginRight: 5,
  },
});

const CellNrCrt = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:3%;
  text-align: center; 
`;

const CellCulori = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:12%;
  text-align: center;
`;
const CellDimensiuni = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:8%;
  text-align: center;
`;
const CellActionare = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:10%;
  text-align: center;
`;

const CellTipActionare = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:10%;
  text-align: center;
`;

const CellOptional = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:10%;
  text-align: center;
`;
const CellCantitate = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:6%;
  text-align: center;
`;
const CellPret = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:10%;
  text-align: center;
`;

const CellTotal = styled.Text`
  padding:15px;
  font-size: 15px;
  margin-left:-1px;
  margin-top:-1px;
  text-align: right;
  width:100%;
`;

// Create Document Component
const ContentJO = (props) => (
  <View style={styles.section}>
    <View style={styles.row}>
      <CellNrCrt fixed>Nr. crt</CellNrCrt>
      <CellDimensiuni fixed>Lungime</CellDimensiuni>
      <CellDimensiuni fixed>Inaltime</CellDimensiuni>
      <CellActionare fixed>Actionare</CellActionare>
      <CellOptional fixed>Fixare</CellOptional>
      <CellCulori fixed>Cod culoare</CellCulori>
      <CellCulori fixed>Cod culoare 2</CellCulori>
      <CellTipActionare fixed>Lungime betisor actionare</CellTipActionare>
      <CellTipActionare fixed>Cleme prindere metal</CellTipActionare>
      <CellCantitate fixed>Cant.</CellCantitate>
      <CellPret fixed>Pret(Lei)</CellPret>
      
    </View>
    {props.currentOrder.comandarepers?
      props.currentOrder.comandarepers.sort((a, b) => {
        return new Date(a.actionare) - new Date(b.actionare)}).map(item=>
        <View style={styles.row} key={item.id}>
          <CellNrCrt fixed>{item.nrCrt}</CellNrCrt>
          <CellDimensiuni fixed>{item.lungime}</CellDimensiuni>
          <CellDimensiuni fixed>{item.inaltime}</CellDimensiuni>
          <CellActionare fixed>{item.actionareStDr}</CellActionare>
          <CellOptional fixed>{item.denumireOptional1}</CellOptional>
          <CellCulori fixed>{item.denumireCuloareLamela}</CellCulori>
          <CellCulori fixed>{item.culoareComponente}</CellCulori>
          <CellTipActionare fixed>{item.lungimeSnur}</CellTipActionare>
          <CellTipActionare fixed>{item.console}</CellTipActionare>
          <CellCantitate fixed>{item.buc}</CellCantitate>
          <CellPret fixed>{item.pretCuDiscount}</CellPret>
        </View>
      )
      :<Text>Comanda nu are inregistrari</Text>
    }
    <View style={styles.row}>
      <CellTotal fixed>{`Total: ${props.currentOrder.valoareComanda} Lei`}</CellTotal>
    </View>
  </View>
);

export default ContentJO