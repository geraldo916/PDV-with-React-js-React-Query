import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const CompanyInfo = ({invoice}) => {
    console.log(invoice)
    return(
        <View>
            <Text> {invoice.empresa.nome_empresa}  </Text>
            <Text> Endereço: {invoice.empresa.endereco_empresa}  </Text>
            <Text> NIF: {invoice.empresa.nif_empresa}  </Text>
            <Text> Contacto: {invoice.empresa.telefone_empresa}  </Text>
            <Text> Email: {invoice.empresa.email_empresa}  </Text>
            <Text> Vendedor: {invoice.nome_vendedor}</Text>
        </View>
    )
  }
    

  export default CompanyInfo