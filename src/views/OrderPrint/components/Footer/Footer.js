/* eslint-disable linebreak-style */
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { dataFormatRO } from '../../../../utils/functiiComune';
// Create styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text:{
    color:'grey',
    marginLeft:25,
    fontSize:10
  }
});

// Create Document Component
const Footer = (props) => (
  <View style={styles.section}>
    <Text style={styles.text}>{`Ultima modificare/transmitere: ${dataFormatRO(props.currentOrder.updated_at)}`}</Text>
  </View>
      
);

export default Footer