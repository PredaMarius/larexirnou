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

const Cell = styled.Text`
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
  font-size: 10px;
  margin-left:-1px;
  margin-top:-1px;
  text-align: right;
  width:100%;
`;

// Create Document Component
const ContentJV = (props) => (
  <View style={styles.section}>
    <View style={styles.row}>
      <Cell fixed>Nr. crt</Cell>
      <Cell fixed>Lungime</Cell>
      <Cell fixed>Inaltime</Cell>
      <Cell fixed>Tip desc.</Cell>
      <Cell fixed>Material</Cell>
      <Cell fixed>Cod culoare</Cell>
      <Cell fixed>Lungime snur</Cell>
      <Cell fixed>Console</Cell>
      <Cell fixed>Cantitate</Cell>
      <Cell fixed>Pret(lei)</Cell>
    </View>
    {props.currentOrder.comandarepers?
      props.currentOrder.comandarepers.sort((a, b) => {
        return new Date(a.actionare) - new Date(b.actionare)}).map(item=>
        <View style={styles.row} key={item.id}>
          <Cell fixed>{item.nrCrt}</Cell>
          <Cell fixed>{item.lungime}</Cell>
          <Cell fixed>{item.inaltime}</Cell>
          <Cell fixed>{item.deschidere}</Cell>
          <Cell fixed>{item.denumireMaterial}</Cell>
          <Cell fixed>{item.codMaterial}</Cell>
          <Cell fixed>{item.lungimeSnur}</Cell>
          <Cell fixed>{item.console}</Cell>
          <Cell fixed>{item.buc}</Cell>
          <Cell fixed>{item.pretCuDiscount}</Cell>
        </View>
      )
      
      :<Text>Comanda nu are inregistrari</Text>
    }
    <View style={styles.row}>
      <CellTotal fixed>{`Total: ${props.currentOrder.valoareComanda} lei`}</CellTotal>
    </View>
  </View>
);



export default ContentJV