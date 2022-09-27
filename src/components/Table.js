import React,{useState} from 'react'
import getFormatedDate from '../services/getFormatedDate';
import { useSales } from '../hooks/sales-hook';
import { Link } from 'react-router-dom';

export default function Table(){
    const {getTotal,dados} = useSales()
    const [slice,setSlice] = useState()
    const [next,setNext] = useState(6)
    const [prev,setPrev] = useState(0)
    const [data,setData] = useState(dados.slice(prev,next))

    return(
        <>
            <table className="table" >
                <thead>
                    <tr>
                        <th>Cód</th>
                        <th>Cliente</th>
                        <th>Vendedor</th>
                        <th>Data</th>
                        <th>Total (Kz)</th>
                        <th>Acções</th>
                    </tr>
                </thead> 
                <tbody>
                    {data.map((sale,i)=>(
                        <tr key={i} >
                            <td>{sale.id_venda} </td>
                            <td>{sale.nome_cliente} </td>
                            <td>{sale.nome_vendedor} </td>
                            <td>
                            {new Date(sale.data).toLocaleDateString()}
                            </td>
                            <td>{getTotal(sale)},00 </td>
                            <td>
                                <Link  to={`/invoice/${sale.id_venda}`} style={{color:'#000'}}>
                                    ver
                                </Link>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <div className='nextPrev' >
                <button onClick={(e)=>{
                    if(prev >= 0 && next >6){
                        setData(dados.slice(prev-6,next-6))
                        setNext(next-6)
                        setPrev(prev-6)
                    }
                }} >{'<<'}</button>
                <button onClick={(e)=>{
                    if(next<dados.length){
                        setData(dados.slice(prev+6,next+6))
                        setNext(next+6)
                        setPrev(prev+6)
                    }
                    
                }} >{'>>'}</button>
            </div>
            
        </>
        
    )
}