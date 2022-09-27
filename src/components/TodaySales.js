import React from 'react';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { useSales } from '../hooks/sales-hook';

export default function TodayInvoices(){
    const {getTodaySales} = useSales()
    return(
        <div className='component card todaySales' >
            <ShoppingBag className='icon'/>
            <div className='info' >
                <p>Vendas de Hoje</p>
                <span className='qtd'><ArrowUpward className='icon-less' />Kz {getTodaySales()},00</span>
            </div>
        </div>
    )
    
}