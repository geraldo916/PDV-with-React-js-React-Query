import React from 'react';
import FolderZip from '@mui/icons-material/FolderZip';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { useSales } from '../hooks/sales-hook';

export default function MounthInvoices(){
    const {getMounthInvoices} = useSales()
    return(
        <div className='component card mounthToday' >
            <FolderZip className='icon'/>
            <div className='info' >
                <p>Facturas deste Mês</p>
                <span className='qtd'><ArrowUpward className='icon-less' /> {getMounthInvoices()} </span>
            </div>
        </div>
    )
    
}