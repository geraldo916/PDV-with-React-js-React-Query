import { CircularProgress} from '@mui/material'
import axios from 'axios'
import React, {useReducer, useState} from 'react'
import { useMutation, useQuery} from 'react-query'
import '../../styles/Profile.css'
import Button from '../../components/button'
import { useSales } from '../../hooks/sales-hook';
import Header from '../../components/Header'
import Menu from '../../components/Menu'


const ChangePassword = () =>{
    const {user} = useSales()
    const [values,setValues] = useState({
        password:'',
        newPassword:'',
        usuario:user.usuario
    })
    const {status,mutate} = useMutation(async e => {
        e.preventDefault()
        return await axios.put(`http://localhost:8000/user-password/${user.id_user}`,values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    const onSubmit = (e) =>{
        e.preventDefault();
        mutate(e)
    }

    return(
        <>
            {
                status === 'loading'?<CircularProgress/>:status==='error'?<p>Falha na Edição</p>:status==='success'?<div className='success' > Cadastrado com sucesso </div>:null
            } 
            <form style={{position:'relative',marginBottom:'70px',height:'130px'}}>
                <div className='inputs' >
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
                            <input onChange={(e)=>setValues({...values,password:e.target.value})} value={values.password} type='password' required/>
                        </div>
                    </div>
                    <div className='input' >
                        <label>Nova Senha</label>
                        <div className='name-input' >
                            <div className='icon' >
                            </div>
                            <input onChange={(e)=>setValues({...values,newPassword:e.target.value})} value={values.newPassword} type='password' required />
                        </div>
                    </div>
                </div>
                <div>
                    <Button position='absolute' bottom='-30px'  right='20px' background='#071a2f' onClick={(e)=>onSubmit(e)} text='Salvar' />
                </div>
            </form>  
        </>
    )
}


export default function Profile({border}){
    const {user} = useSales()
    const [values,setValues] = useState({
        nome_vendedor:user.nome_vendedor,
        telefone:user.telefone,
        num_bilhete:user.num_bilhete,
        endereco:user.endereco,
        usuario:user.usuario,
        senha:'',
        nova_senha:''
    })
    const [clicked,toggle] = useReducer(cliked=>!cliked,false)

    const {status,mutate} = useMutation(async e => {
        e.preventDefault()
        return await axios.put(`http://localhost:8000/vendedor/${user.id_vendedor}`,values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    const onSubmit = (e) =>{
        e.preventDefault();
        mutate(e)
    }


    return(
        <>
            <Menu/>
            <div className="main" >
            <div className="content" >
              <Header/>
              <div className='warehouse' >
              <div className='forn-input  page component buy' style={{border:`1px solid #ccc`}} >
                    {
                        status === 'loading'?<CircularProgress/>:status==='error'?<p>Falha na Edição</p>:status==='success'?<div className='success' > Cadastrado com sucesso </div>:null
                    } 
                    
                    <div className='perfil' >
                        <p>Perfil - {user.nome_vendedor}</p> <div>{user.nome_vendedor[0]}</div>
                        <span> {user.nivel === 1?'Adimistrador':user.nivel === 2?'Gerente':'Vendedor'} </span>
                    </div> 
                    <form style={{position:'relative'}} >
                    <div className='inputs' >
                                <div className='input' >
                                        <label>Nome</label>
                                        <div className='name-input' >
                                            <div className='icon' >
                                            </div>
                                            <input onChange={(e)=>setValues({...values,nome_vendedor:e.target.value})} value={values.nome_vendedor} type='text' required/>
                                        </div>
                                    </div>
                                    <div className='input' >
                                        <label>Telefone</label>
                                        <div className='name-input' >
                                            <div className='icon' >
                                            </div>
                                            <input onChange={(e)=>setValues({...values,telefone:e.target.value})} value={values.telefone} type='number' required />
                                        </div>
                                    </div>
                                    <div className='input' >
                                        <label>Número do BI</label>
                                        <div className='name-input' >
                                            <div className='icon' >
                                            </div>
                                            <input onChange={(e)=>setValues({...values,num_bilhete:e.target.value})} value={values.num_bilhete} type='text'  required />
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
                            </div>
                            <div>
                                <Button background='#071a2f' position='absolute' bottom='10px' right='20px' onClick={(e)=>onSubmit(e)} text='Salvar' />
                            </div>
                    </form>
                    <div className='passtext' onClick={(e)=>toggle(true)} >
                        {
                        clicked?<>Cancelar</>:<>Mudar Definições de Entrada</>
                        } 
                        
                    </div>          
                    {
                        clicked?<ChangePassword/>:null
                    } 
                </div>
              </div>
            </div>   
          </div>
            
        </> 
    )
}