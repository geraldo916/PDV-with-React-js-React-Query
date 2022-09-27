import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, {useState } from 'react';
import {useHistory} from 'react-router-dom'
import { useMutation } from 'react-query';
import '../../styles/Login.css'

export default function Login(){
    const [user,setUser] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState()
    const [message,setMessage] = useState('')
    const history = useHistory()
    
    const {mutate,isError,isLoading,isSuccess,error,data} = useMutation(async event=>{
        event.preventDefault()
        return await axios.post('http://localhost:8000/auth',{
            usuario:user,
            senha:password
        })
    })
    const onSubmit = async(event)=>{
        event.preventDefault()
        mutate(event)
        /*
        var data = response.data
        
    }catch(erro){
        setLoading(false)
        console.log(erro)
    }*/
    }

    if(isLoading) return <CircularProgress/>
    if(isSuccess){
        localStorage.setItem('token',data.data.token)
        history.push('/dashboard')
    }
    
    return(
        <div className='login' >
            <div>
                <div>
                    <img className='logo' alt='logo' src={'http://localhost:8000/logo'} />
                </div>
                <form className='formlogin' onSubmit={(event)=>onSubmit(event)} >
                    <label>Usuario</label>
                    <input type='text' value={user} onChange={(e)=>setUser(e.target.value)} required />
                    <label>Senha</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button type='submit' >Entrar</button>
                </form>
            </div>
            
        </div>
    )
}