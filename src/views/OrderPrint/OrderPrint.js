/* eslint-disable react/no-multi-comp */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import { Header } from './components';
import { ContentJV} from './components';
import { ContentRO} from './components';
import { ContentRE} from './components';
import { ContentUG} from './components';
import { ContentPI} from './components';
import { ContentJO} from './components';
import { Footer } from './components';

// Create styles
const styles = StyleSheet.create({
  page: {
    display:'flex',
    flexDirection: 'column',
    justifyContent:'flex-start'
  },
  section: {
    margin: 5,
    padding: 5,
   
  }
});
const OrderPrint = (props) => {
  const {currentProduct, currentOrder}=props
  const product = () => {
    switch(currentProduct.cod) {
      case 'jv':   
        return <ContentJV currentOrder={currentOrder} />;
      case 'ro':   
        return <ContentRO currentOrder={currentOrder} />;
      case 're':   
        return <ContentRE currentOrder={currentOrder} />;
      case 'ug':   
        return <ContentUG currentOrder={currentOrder} />;
      case 'pi':  
        return <ContentPI currentOrder={currentOrder} />;
      case 'jo':  
        return <ContentJO currentOrder={currentOrder} />;
      default: 
        return <h1>Nici un tip de produs nu este setat</h1>
    }
  }
 
  return(
    <Document>
      <Page
        orientation={props.currentProduct.cod==='jv'? 'portrait':'landscape'}
        size="A4"
        style={styles.page}
      >
        <Header currentOrder={props.currentOrder} currentProduct={props.currentProduct} currentUser={props.currentUser}/>
        {product()}
        
        <Footer currentOrder={props.currentOrder} currentProduct={props.currentProduct}/>
      </Page>
    </Document>
  )  
};


export default OrderPrint
