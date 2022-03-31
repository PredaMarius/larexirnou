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
  width:12%;
  text-align: center;
`;

const CellCod = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:6%;
  text-align: center;
`;
const CellMaterial = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:8%;
  text-align: center;
`;
const CellDimensiuni = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:6%;
  text-align: center;
`;
const CellActionare = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:6%;
  text-align: center;
`;

const CellAx = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:5%;
  text-align: center;
`;

const CellCuloareComp = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:6%;
  text-align: center;
`;
const CellOptional = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:6%;
  text-align: center;
`;
const CellCantitate = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:5%;
  text-align: center;
`;
const CellPret = styled.Text`
  padding:5px;
  font-size: 8px;
  margin-left:-1px;
  margin-top:-1px;
  border:1px solid ;
  width:8%;
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
const ContentRO = (props) => (
  <View style={styles.section}>
    <View style={styles.row}>
      <CellNrCrt fixed>Nr. crt</CellNrCrt>
      <CellTipSubprodus fixed>Tip roleta</CellTipSubprodus>
      <CellCod fixed>Cod</CellCod>
      <CellMaterial fixed>Material</CellMaterial>
      <CellDimensiuni fixed>Lungime PANZA</CellDimensiuni>
      <CellDimensiuni fixed>Lungime FINALA</CellDimensiuni>
      <CellDimensiuni fixed>Inaltime PANZA</CellDimensiuni>
      <CellDimensiuni fixed>Inaltime FINALA</CellDimensiuni>
      <CellActionare fixed>Actionare</CellActionare>
      <CellAx fixed>Ax</CellAx>
      <CellCuloareComp fixed>Culoare comp.</CellCuloareComp>
      <CellOptional fixed>Optional 1</CellOptional>
      <CellOptional fixed>Optional 2</CellOptional>
      <CellOptional fixed>Optional 3</CellOptional>
      <CellCantitate fixed>Cant.</CellCantitate>
      <CellPret fixed>Pret(lei)</CellPret>
    </View>
    {props.currentOrder.comandarepers?
      props.currentOrder.comandarepers.sort((a, b) => {
        return new Date(a.actionare) - new Date(b.actionare)}).map(item=>
        <View style={styles.row} key={item.id}>
          <CellNrCrt fixed>{item.nrCrt}</CellNrCrt>
          <CellTipSubprodus fixed>{item.denumireSubProdus}</CellTipSubprodus>
          <CellCod fixed>{item.codMaterial}</CellCod>
          <CellMaterial fixed>{item.denumireMaterial}</CellMaterial>
          <CellDimensiuni fixed>{item.lungime}</CellDimensiuni>
          <CellDimensiuni fixed>{item.lungimeFinala}</CellDimensiuni>
          <CellDimensiuni fixed>{item.inaltime}</CellDimensiuni>
          <CellDimensiuni fixed>{item.inaltimeFinala}</CellDimensiuni>
          <CellActionare fixed>{item.actionareStDr}</CellActionare>
          <CellAx fixed>{item.ax}</CellAx>
          <CellCuloareComp fixed>{item.denumireCuloareLamela}</CellCuloareComp>
          <CellOptional fixed>{item.denumireOptional1}</CellOptional>
          <CellOptional fixed>{item.denumireOptional2}</CellOptional>
          <CellOptional fixed>{item.denumireOptional3}</CellOptional>
          <CellCantitate fixed>{item.buc}</CellCantitate>
          <CellPret fixed>{item.pretClientFinal}</CellPret>
        </View>
      )
      
      :<Text>Comanda nu are inregistrari</Text>
    }
    <View style={styles.row}>
      <CellTotal fixed>{`Total: ${props.currentOrder.valoareClientFinal} lei`}</CellTotal>
    </View>
  </View>
);



export default ContentRO