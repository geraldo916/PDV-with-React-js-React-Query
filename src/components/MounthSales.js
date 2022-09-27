import React from 'react';
import CreditScore from '@mui/icons-material/CreditScore';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { useSales } from '../hooks/sales-hook';

export default function MounthSales(){
    const {getMonthSales} = useSales()
    return(
        <div className='component card mounthSales' >
            <CreditScore className='icon'/>
            <div className='info' >
                <p>Vendas deste Mês</p>
                <span className='qtd'><ArrowUpward className='icon-less' />Kz {getMonthSales()},00</span>
            </div>
        </div>
    )
    
}