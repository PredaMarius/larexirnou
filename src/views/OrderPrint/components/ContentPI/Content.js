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
const CellTipSubprodus = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:15%;
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
  width:7%;
  text-align: center;
`;

const CellTipActionare = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:7%;
  text-align: center;
`;

const CellOptional = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:15%;
  text-align: center;
`;
const CellCantitate = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:7%;
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
const CellObservatii = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:17%;
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
const ContentPI = (props) => (
  <View style={styles.section}>
    <View style={styles.row}>
      <CellNrCrt fixed>Nr. crt</CellNrCrt>
      <CellTipSubprodus fixed>Tip rulou</CellTipSubprodus>
      <CellCulori fixed>Culoare</CellCulori>
      <CellDimensiuni fixed>Lungime</CellDimensiuni>
      <CellDimensiuni fixed>Inaltime</CellDimensiuni>
      <CellTipActionare fixed>Cota</CellTipActionare>
      <CellOptional fixed>Optional</CellOptional>
      <CellObservatii>Observatii</CellObservatii>
      <CellCantitate fixed>Cant.</CellCantitate>
      <CellPret fixed>Pret(euro)</CellPret>
      
    </View>
    {props.currentOrder.comandarepers?
      props.currentOrder.comandarepers.sort((a, b) => {
        return new Date(a.actionare) - new Date(b.actionare)}).map(item=>
        <View style={styles.row} key={item.id}>
          <CellNrCrt fixed>{item.nrCrt}</CellNrCrt>
          <CellTipSubprodus fixed>{item.denumireSubProdus}</CellTipSubprodus>
          <CellCulori fixed>{item.denumireCuloareCaseta}</CellCulori>
          <CellDimensiuni fixed>{item.lungime}</CellDimensiuni>
          <CellDimensiuni fixed>{item.inaltime}</CellDimensiuni>
          <CellTipActionare fixed>{item.denumireTipActionare}</CellTipActionare>
          <CellOptional fixed>{item.denumireOptional1}</CellOptional>
          <CellObservatii>{item.observatii}</CellObservatii>
          <CellCantitate fixed>{item.buc}</CellCantitate>
          <CellPret fixed>{item.pretCuDiscount}</CellPret>
        </View>
      )
      :<Text>Comanda nu are inregistrari</Text>
    }
    <View style={styles.row}>
      <CellTotal fixed>{`Total: ${props.currentOrder.valoareComanda} Euro`}</CellTotal>
    </View>
  </View>
);

export default ContentPI