import { Checkbox, CircularProgress} from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect} from 'react';
import useFech from '../hooks/useFech';
import '../styles/NewSale.css'

const Clientes = ({name,setClient = f => f}) =>{
    const [client,setName] = useState()
    const [data,setData] = useState()
    const [error,setError] = useState()
    const [loading,setLoadig] = useState(true)

    
    useEffect(()=>{
        fetch(`http://localhost:8000/clientes/${name}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response=>response.json())
        .then(setData)
        .then(()=> setLoadig(false))
        .catch(setError)
    },[name])
    
    
    if(loading) return <CircularProgress/>
    if(error) return <span>Algo deu errado</span>
    if(!data) return;

    if(data.length < 1) return <div className='newName' >{name} Não está registrado </div>;

    return(
        <>
            <ul>
                {
                    data.map((client,i)=>(
                        <li onClick={()=>setClient(client)} key={i} > {client.nome_cliente} </li>
                    ))
                }
            </ul>
        </>
    )
}

const useEndereco = (id) => {
    const {loading,data,error} = useFech(`http://localhost:8000/endereco/${id}`)
    if(loading) return <CircularProgress/>
    if(error) return <span>Algo deu errado</span>
    if(!data) return;

    return({
        cidade:data[0].cidade,
        bairro:data[0].bairro,
        rua:data[0].rua
    })
}

const ClientInfo = ({client,isChaging=f=>f}) => {
    const {cidade,rua,bairro} = useEndereco(client.endereco_id)
    if(client === undefined) return null;
    
    return(
        <tr>
            <td> {client.id_cliente} </td>
            <td onDoubleClick={()=>isChaging(client.nome_cliente)} > {client.nome_cliente} </td>
            <td> {client.telefone} </td>
            <td> {cidade} </td>
            <td> {bairro} </td>
            <td> {rua} </td>
        </tr>   
    )
}

export default function ClientFormNewSale({setIdClint = f => f}){
    const [name,setName] = useState('')
    const [selected,setSelected] = useState(false)
    const [client,setClient] = useState()

    const onChange = (name) =>{
        setName(name)
        setSelected(false)
        setClient(undefined)
    }

    const User = () =>{
        return(
            <tr>
                <td>#</td>
                <td>
                    <div className='nomeClient'>
                        <input placeholder='Nome do Cliente' className='productinput' autoComplete="off" autoFocus="on" value={name} onChange={(e)=>onChange(e.target.value)} id='nome' type="text" required />
                        <div className='findUser' >
                            {
                                !selected && name !== '' ? <Clientes name={name} setClient={client =>{
                                    setClient(client)
                                    setSelected(true)
                                    setName(client.nome_cliente)
                                    setIdClint(client.id_cliente,client.nome_cliente)
                                } } /> : <></>
                            }
                        </div>   
                    </div>
                    
                </td>
                <td>Contacto</td>
                <td>Cidade</td>
                <td>Bairro</td>
                <td>Rua</td>
            </tr>
        )
    }
    
    return(
        <>
            <table style={{
                backgroundColor:'#efeeed',
            }} className="table" >
                <thead style={{
                backgroundColor:'#dddddd',
            }} >
                    <tr>
                        <th>#</th>
                        <th>Nome do Cliente</th>
                        <th>Contacto</th>
                        <th>Cidade</th>
                        <th>Bairro</th>
                        <th>Rua</th>
                    </tr>
                </thead> 
                <tbody>
                    {
                        client?<ClientInfo isChaging={nome=>onChange(nome)} client={client} />:<User/>
                    }
                </tbody>
            </table>
        </>
    )
}