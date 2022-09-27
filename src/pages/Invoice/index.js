import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image
} from '@react-pdf/renderer'
import {useParams} from 'react-router-dom'
import Invoice from '../../components/InvoiceTable/Invoice'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core'
import React, { Fragment, Component } from 'react';
import { useQuery } from 'react-query'

//Create Styles
const styles = StyleSheet.create({
    page:{
        color: "#ccc",
    },
    section:{
        margin: 10,
        padding: 10,
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    logoSection:{
        borderBottomWidth:1,
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        margin: 10,
        padding: 10,
    },  
    logo:{
        width:140,
    },
    infos:{
        fontSize:12,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        margin: 10,
        padding: 10,
    },
    data:{
        fontSize:10,
        textAlign:'center'
    },
    headers:{
        fontSize:12
    }
})

class InvoiceFocument extends Component {
    render() {
    var invoice = this.props.invoice
      return (
          <Fragment>
              <PDFViewer width={window.innerWidth} height={window.innerHeight} className="app" >
                  <Invoice invoice={invoice}/>
              </PDFViewer>
          </Fragment>
      );
    }
  }

//Create Document Component
export default function BasicDocument(){
    const {id} = useParams()
    const  {isError,isLoading,isSuccess,data} = useQuery(["invoices",id],async ()=>{
        return await axios.get(`http://localhost:8000/invoice/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    },{
        enabled:!!id
    })

    if(isLoading) return <CircularProgress/>
    if(isError) return <p>Ocorreu um erro</p>
    console.log(data.data)
    return( <InvoiceFocument invoice={data.data} /> )
}


