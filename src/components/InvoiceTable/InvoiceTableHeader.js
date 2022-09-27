import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#071a2e',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        color:'#fff',
    },
    description: {
        width: '40%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '20%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.rate}>CÓDIGO</Text>
        <Text style={styles.description}>DESCRIÇÃO</Text>
        <Text style={styles.qty}>Qtd</Text>
        <Text style={styles.rate}>PREÇO_UNIT</Text>
        <Text style={styles.amount}>MONTANTE</Text>
    </View>
  );
  
  export default InvoiceTableHeader