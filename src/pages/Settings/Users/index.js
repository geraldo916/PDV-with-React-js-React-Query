import { CircularProgress} from '@mui/material'
import axios from 'axios'
import React, {useReducer, useState} from 'react'
import { useMutation, useQuery} from 'react-query'
import '../../../styles/Buy.css'
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '../../../components/button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TransitionsModal from '../../../components/Modal'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSales } from '../../../hooks/sales-hook'


const Edituser = ({user,setEditing=f=>f}) =>{
    const [values,setValues] = useState({
        id_vendedor:user.id_vendedor,
        nome:user.nome,
        telefone:user.telefone,
        cidade:user.cidade,
        bairro:user.bairro,
        rua:user.rua
    })
    const {mutate,isLoading,isError,isSuccess} = useMutation(async () =>{
        console.log(values)
        return await axios.put(`http://localhost:8000/fornecedor/${user.id_vendedor}`,values,{
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


const Newuser = () =>{
    const [values,setValues] = useState({
        nome_vendedor:'',
        num_bilhete:'',
        telefone:'',
        endereco:'',
        id_empresa:1,
        id_endereco:1,
        usuario:'',
        nivel:3,
        senha:'',
    })
    const {mutate,isLoading,isError,isSuccess} = useMutation(async () =>{
        console.log(values)
        return await axios.post(`http://localhost:8000/user`,values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    const onSubmit = (e) =>{
        e.preventDefault()
        if(values.nome_vendedor === undefined || values.nome_vendedor.length<1){
            alert('Insira o nome do Usuario')
        }else{
            mutate()
            setValues({
                nome_vendedor:'',
                num_bilhete:'',
                telefone:'',
                endereco:'',
                id_empresa:1,
                id_endereco:1,
                usuario:'',
                nivel:3,
                senha:'',
            })
        }
        
    }
    console.log(values.nivel)
    return(
        <>
            {
                isLoading?<CircularProgress/>:isError?<p>Ocorreu um erro</p>:isSuccess?<p>Cadastrado</p>:null
            }
            <form onSubmit={(e)=>onSubmit(e)} >
                <div className='inputs' >
                    <div className='input' >
                            <label>Nome do Funcionário</label>
                            <div className='name-input' >
                                <div className='icon' >
                                </div>
                                    <input onChange={(e)=>setValues({...values,nome_vendedor:e.target.value})} value={values.nome_vendedor} type='text' required/>
                            </div>
                            </div>
                            <div className='input' >
                                <label>Número do Bilhete</label>
                                <div className='name-input' >
                                    <div className='icon' >
                                    </div>
                                        <input onChange={(e)=>setValues({...values,num_bilhete:e.target.value})} value={values.num_bilhete} type='text' required />
                                </div>
                            </div>
                            <div className='input' >
                                <label>Telefone</label>
                                <div className='name-input' >
                                        <div className='icon' >
                                    </div>
                                    <input onChange={(e)=>setValues({...values,telefone:e.target.value})} value={values.telefone} type='number'  required />
                                </div>
                            </div>
                            <div className='input' >
                                <label>Usuario</label>
                                <div className='name-input' >
                                    <div className='icon' >

                                    </div>
                                    <input onChange={(e)=>setValues({...values,usuario:e.target.value})} value={values.usuario} type='text'  required />
                                </div>
                            </div>
                            <div className='input' >
                                <label>Senha</label>
                                <div className='name-input' >
                                    <div className='icon' >

                                    </div>
                                    <input onChange={(e)=>setValues({...values,senha:e.target.value})} value={values.senha} type='text'  required />
                                </div>
                            </div>
                            <div className='input' >
                                <label>Endereço</label>
                                <div className='name-input' >
                                    <div className='icon' >

                                    </div>
                                    <input onChange={(e)=>setValues({...values,endereco:e.target.value})} value={values.endereco} type='text'  required />
                                </div>
                            </div>
                            <div className='input radios ' >
                                <label htmlFor='admin' > Aministrador </label> <input onChange={(e)=>{
                                   if(e.target.value==='on')setValues({...values,nivel:1})
                                }} id='admin' type='radio' name='nivel' /> 
                                <label htmlFor='gerente' > Gerente </label><input onChange={(e)=>{
                                   if(e.target.value==='on')setValues({...values,nivel:2})
                                }} id='gerente' type='radio' name='nivel' /> 
                                <label htmlFor='vendedor' > Vendedor </label><input onChange={(e)=>{
                                   if(e.target.value==='on')setValues({...values,nivel:3})
                                }} id='vendedor' type='radio' name='nivel' />
                            </div>
                    </div>
                    <Button position='absolute' right='40px' fontSize='14px' padding='10px' height='auto' width='130px' color='#fff' type='submit' text='Cadastrar' />
                </form>
        </>
    )
}

const UsersList =  ({border}) => {
    var {user} = useSales()
    var id_vendedor = user.id_vendedor
    const [isAdd,setAdd] = useReducer(isEditing=>!isEditing,false)
    const {isLoading,isError,data,isSuccess,refetch} = useQuery(["usuarios"],async () => {
        return await axios.get(`http://localhost:8000/users`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        },)
    })

    const Refresh = async ()=>{
        await refetch()
    }


    const Delete = async (id) =>{
        confirmAlert({
            title: 'Confirma para Deletar',
            message: 'Tem Certeza que quer eliminar o usuário?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    try{
                        await axios.delete(`http://localhost:8000/user/${id}`,{
                            headers:{
                                Authorization:`Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        alert('Pagado')
                    }catch(erro){
                        console.log(erro)
                    }
                }
              },
              {
                label: 'Não',
                onClick: () => null
              }
            ]
          });  
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
                            <th>Nome do Vendedor</th>
                            <th>Contacto</th>
                            <th>Número de Bilhete</th>
                            <th>Endereço</th>
                            <th>Nivel</th>
                            <th>Ação</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            isLoading?<CircularProgress/>:isError?<p>Houve um erro</p>:isSuccess?(
                                data.data.map((user,i)=>(
                                    <>
                                        {
                                            id_vendedor !== user.id_vendedor?<>
                                                <tr key={i} >
                                                    <td> {user.id_vendedor} </td>
                                                    {
                                                        <>
                                                        <td> {user.nome_vendedor} </td>
                                                        <td> {user.telefone} </td>
                                                        <td> {user.num_bilhete} </td>
                                                        <td> {user.endereco} </td>
                                                        <td> {user.nivel} </td>
                                                        <td style={{color:'#fff'}} onClick={(e)=>{
                                                        
                                                            Delete(user.id_user)
                                                            
                                                            }} className='deletebutton' > Deletar </td>
                                                        </>
                                                    }
                                                </tr>
                                            </>:null
                                        }
                                        
                                    </>
                                    ))
                            ):null 
                        }
                        
                    </tbody>
                </table>
                {
                    isAdd? <Newuser/>:null
                }
                    <Button onClick={(e)=>setAdd(true)} padding='10px' height='auto' width='100px' fontSize='14px'  background='#5838ad' text={isAdd?'FECHAR':(<><AddCircleIcon/>NOVO</>)} />
            </div>
        </>
    )
}

export default function Users({border}){
    
    return(
        <>
            <UsersList border={border} />
        </> 
    )
}