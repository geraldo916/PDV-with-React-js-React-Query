import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
  });


  const ClienteInfo = ({invoice}) => (
        <Fragment>
            <View>
                <Text> FACTURA Nº {invoice.id_venda}  </Text>
                <Text> Nome do Cliente: {invoice.nome_cliente}  </Text>
                <Text> Endereço: Uige Dunga Rua H  </Text>
                <Text> Contacto: 9547845454  </Text>
            </View>
            {
                /*
                    <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Invoice No:</Text>
                <Text style={styles.invoiceDate}>{invoice.id}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Date: </Text>
                <Text >{invoice.data}</Text>
            </View >
                */
            }
            
        </Fragment>
  );
  
  export default ClienteInfo