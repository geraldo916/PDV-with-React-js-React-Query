import React from 'react';
import { Page, Document, Image, StyleSheet, View } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import CompanyInfo from './CompanyInfo'
import ClienteInfo from './ClienteInfo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logoSection:{
        borderBottom:1
    },
    infos:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:20,
        marginBottom:20
    }
  });
  
  const Invoice = ({invoice}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.logoSection} >
                        <Image style={styles.logo} src={'http://localhost:8000/logo'} />
                    </View>
                    <View style={styles.infos} >
                        <CompanyInfo invoice={invoice}/>
                        <ClienteInfo invoice={invoice}/>
                    </View>
                    <InvoiceItemsTable invoice={invoice} />
                </Page>
            </Document>
        );
  
  export default Invoice