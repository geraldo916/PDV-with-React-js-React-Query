import { CircularProgress} from '@mui/material'
import axios from 'axios'
import React, {useReducer, useState} from 'react'
import { useMutation, useQuery} from 'react-query'
import '../../styles/Buy.css'
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '../../components/button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from '../../components/Header';
import Menu from '../../components/Menu';


const Editsuplie = ({client,setEditing=f=>f}) =>{
    const [values,setValues] = useState({
        id_client:client.id_cliente,
        nome:client.nome_cliente,
        telefone:client.telefone,
        cidade:client.cidade,
        bairro:client.bairro,
        rua:client.rua
    })
    const {mutate,isLoading,isError,isSuccess} = useMutation(async () =>{
        console.log(values)
        return await axios.put(`http://localhost:8000/cliente/${client.id_cliente}`,values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })
    

    const onSubmit = () =>{
        mutate()
        setEditing(false)
    }

    return(
            <>
                <td> <input value={values.nome} onChange={(e)=>setValues({...values,nome:e.target.value})} type='text' /></td>
                <td> <input value={values.telefone} onChange={(e)=>setValues({...values,telefone:e.target.value})} type='number' /></td>
                <td> <input value={values.cidade} onChange={(e)=>setValues({...values,cidade:e.target.value})} type='text' /></td>
                <td> <input value={values.bairro} onChange={(e)=>setValues({...values,bairro:e.target.value})} type='text' /></td>
                <td> <input value={values.rua} onChange={(e)=>setValues({...values,rua:e.target.value})} type='text' /></td>
                <td onClick={(e)=>onSubmit()} > {isLoading?<CircularProgress/>:isError?<p>Houve um Erro</p>:isSuccess?<p>Cadastrado</p>:null} Concluir</td>

            </>
    )
}


const NewClient = () =>{
    const [values,setValues] = useState({
        nome:'',
        telefone:'',
        cidade:'',
        bairro:'',
        rua:''
    })
    const {mutate,isLoading,isError,isSuccess} = useMutation(async () =>{
        console.log(values)
        return await axios.post(`http://localhost:8000/cliente`,values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    const onSubmit = () =>{
        if(values.nome === undefined || values.nome.length<1){
            alert('Insira o nome do Cliente')
        }else{
            mutate()
            setValues({
                nome:'',
                telefone:'',
                cidade:'',
                bairro:'',
                rua:''
            })
        }
        
    }

    return(
        <>
            <tr>
                <td>#</td>
                <td> <input value={values.nome} onChange={(e)=>setValues({...values,nome:e.target.value})} type='text' /></td>
                    <td> <input required value={values.telefone} onChange={(e)=>setValues({...values,telefone:e.target.value})} type='number' /></td>
                    <td> <input required value={values.cidade} onChange={(e)=>setValues({...values,cidade:e.target.value})} type='text' /></td>
                    <td> <input required value={values.bairro} onChange={(e)=>setValues({...values,bairro:e.target.value})} type='text' /></td>
                    <td> <input required value={values.rua} onChange={(e)=>setValues({...values,rua:e.target.value})} type='text' /></td>
                    <td onClick={(e)=>onSubmit()} > {isLoading?<CircularProgress/>:isError?<p>Houve um Erro</p>:isSuccess?<p>Concluido</p>:'Cadastrar'} </td>
            </tr>
        </>
    )
}

const SupliersList =  ({border}) => {
    const [isEditing,setEditing] = useReducer(isEditing=>!isEditing,false)
    const [isAdd,setAdd] = useReducer(isEditing=>!isEditing,false)
    const [idSelected,setIdSelected] = useState()
    const {isLoading,isError,data,isSuccess,refetch} = useQuery(["clientes"],async () => {
        return await axios.get(`http://localhost:8000/clientes`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        },)
    })

    const Refresh = async ()=>{
        await refetch()
    }

    const Edit = (id) =>{
        setIdSelected(id)
        setEditing(true)
    }

    return(
        <>
            <div className='forn-input  page component buy' style={{border:`1px solid ${border}`}} > 
                <div onClick={(e)=>Refresh()} >
                    <RefreshIcon className='icon-refresh' />
                </div>   
                <table className="table" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome do Cliente</th>
                            <th>Contacto</th>
                            <th>Cidade</th>
                            <th>Bairro</th>
                            <th>Rua</th>
                            <th>Ação</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            isLoading?<CircularProgress/>:isError?<p>Houve um erro</p>:isSuccess?(
                                data.data.map((client,i)=>(
                                    <tr key={i} >
                                        <td> {client.id_cliente} </td>
                                        {
                                            isEditing && idSelected===client.id_cliente?<Editsuplie setEditing={async v=>{
                                                await refetch()
                                                setEditing(v) 
                                            }} client={client} />:<>
                                            <td> {client.nome_cliente} </td>
                                            <td> {client.telefone} </td>
                                            <td> {client.cidade} </td>
                                            <td> {client.bairro} </td>
                                            <td> {client.rua} </td>
                                            <td style={{color:'#fff',backgroundColor:'#071a2f'}} className='editbutton' onClick={(e)=>Edit(client.id_cliente)} > Editar</td>
                                            </>
                                        }
                                    </tr>
                                    ))
                            ):null 
                        }
                        {
                            isAdd? <NewClient/>:null
                        }
                       
                    </tbody>
                </table>
                <Button onClick={(e)=>setAdd(true)} padding='10px' width='140px' height='auto' fontSize='14px' background='#5838ad' text={isAdd?'FECHAR':(<><AddCircleIcon/>NOVO</>)} />
            </div>
        </>
    )
}

export default function Clients({border}){
    
    return(
        <>
            <Menu/>
            <div className="main" >
                <div className="content" >
                <Header/>
                <div className='title-page' >
                    <h2>CLIENTES</h2>
                </div>
                <div className='sales page content component' >
                    <SupliersList border={border} />
                </div>
                </div>   
          </div>
        </>
    )
}