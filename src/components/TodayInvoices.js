import React from 'react'
import DescriptionIcon from '@mui/icons-material/Description';
import { useSales } from '../hooks/sales-hook';

export default function TodayInvoices(){
    const {getTodayInvoices} = useSales()
    return(
        <div className='component card invoiceToday' >
            <DescriptionIcon className='icon'/>
            <div className='info' >
                <p>Facturas de Hoje</p>
                <span className='qtd'>+{getTodayInvoices()}</span>
            </div>
        </div>
    )
}