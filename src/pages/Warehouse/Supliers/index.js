import { CircularProgress} from '@mui/material'
import axios from 'axios'
import React, {useReducer, useState} from 'react'
import { useMutation, useQuery} from 'react-query'
import '../../../styles/Buy.css'
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '../../../components/button'
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Editsuplie = ({suplie,setEditing=f=>f}) =>{
    const [values,setValues] = useState({
        id_fornecedor:suplie.id_fornecedor,
        nome:suplie.nome,
        telefone:suplie.telefone,
        cidade:suplie.cidade,
        bairro:suplie.bairro,
        rua:suplie.rua
    })
    const {mutate,isLoading,isError,isSuccess} = useMutation(async () =>{
        console.log(values)
        return await axios.put(`http://localhost:8000/fornecedor/${suplie.id_fornecedor}`,values,{
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


const NewSuplie = () =>{
    const [values,setValues] = useState({
        nome:'',
        telefone:'',
        cidade:'',
        bairro:'',
        rua:''
    })
    const {mutate,isLoading,isError,isSuccess} = useMutation(async () =>{
        console.log(values)
        return await axios.post(`http://localhost:8000/fornecedor`,values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    const onSubmit = () =>{
        if(values.nome === undefined || values.nome.length<1){
            alert('Insira o nome do fornecedor')
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
    const {isLoading,isError,data,isSuccess,refetch} = useQuery(["fornecedor"],async () => {
        return await axios.get(`http://localhost:8000/fornecedores`,{
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
                    <RefreshIcon className='icon-recents' />
                </div>    
                <table className="table" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome do Fornecedor</th>
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
                                data.data.map((suplie,i)=>(
                                    <tr key={i} >
                                        <td> {suplie.id_fornecedor} </td>
                                        {
                                            isEditing && idSelected===suplie.id_fornecedor?<Editsuplie setEditing={async v=>{
                                                await refetch()
                                                setEditing(v) 
                                            }} suplie={suplie} />:<>
                                            <td> {suplie.nome} </td>
                                            <td> {suplie.telefone} </td>
                                            <td> {suplie.cidade} </td>
                                            <td> {suplie.bairro} </td>
                                            <td> {suplie.rua} </td>
                                            <td style={{color:'#fff'}} className='editbutton' onClick={(e)=>Edit(suplie.id_fornecedor)} > Editar</td>
                                            </>
                                        }
                                    </tr>
                                    ))
                            ):null 
                        }
                        {
                            isAdd? <NewSuplie/>:null
                        }
                       
                    </tbody>
                </table>
                <Button onClick={(e)=>setAdd(true)} padding='10px' width='140px' height='auto' fontSize='14px' background='#5838ad' text={isAdd?'FECHAR':(<><AddCircleIcon/>NOVO</>)} />
            </div>
        </>
    )
}

export default function Supliers({border}){
    
    return(
        <>
            <SupliersList border={border} />
        </> 
    )
}