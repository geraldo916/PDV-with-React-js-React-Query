import React from 'react';
import TodayInvoices from './TodayInvoices';
import MounthInvoices from './MounthInvoices';
import TodaySales from './TodaySales'
import MounthSales from './MounthSales';
import '../styles/Cards.css'

export default function Cards(){
    return(
        <div className="cards" >
            <TodayInvoices/>
            <MounthInvoices/>
            <TodaySales/>
            <MounthSales/>
        </div>    
    )
}