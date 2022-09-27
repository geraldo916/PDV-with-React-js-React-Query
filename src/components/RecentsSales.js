import React from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';
import '../styles/recentSale.css'
import { useSales } from '../hooks/sales-hook';
import getFormatedDate from '../services/getFormatedDate';

export default function RecentsSales(){
    const {dados,getTotal,refetch} = useSales()
    return(
        <div className="recents-container component">
            <div className='recents-cabecalho' >
                <h1 className='title-recents'> Venda Recentes </h1>
                <div onClick={(e)=>{
                    refetch()
                }} >
                    <RefreshIcon className='icon-recents' />
                </div>
            </div>
            <table className="table" >
                <thead>
                    <tr>
                        <th>Factura</th>
                        <th>Valor (kz)</th>
                        <th>Data</th>
                    </tr>
                </thead> 
                <tbody>
                    {dados.map((sale,i)=>(
                        new Date(sale.data).toLocaleDateString() === new Date().toLocaleDateString()?
                        <tr key={i} >
                            <td>Factura Nº{sale.id_venda} </td>
                            <td> {getTotal(sale)} </td>
                            <td>{new Date(sale.data).toLocaleDateString()}</td>
                        </tr>:<tr key={i}></tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}