import { CircularProgress} from '@mui/material'
import axios from 'axios'
import React, {useState} from 'react'
import { useMutation, useQuery} from 'react-query'
import '../../../styles/Geral.css'
import Button from '../../../components/button'





export default function Geral({border}){
    var token = localStorage.getItem('token')
    const [values,setValues] = useState({
        nome_empresa:'',
        nif_empresa:'',
        email_empresa:'',
        telefone_empresa:'',
        endereco_empresa:'',
    })
    const {isLoading, isError,error,data,isSuccess} = useQuery("company",async ()=>{
        var dados = await axios.get('http://localhost:8000/company',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setValues(dados.data[0])
        return dados
    })

    const {status,mutate} = useMutation(async e => {
        e.preventDefault()
        return await axios.put(`http://localhost:8000/company/${values.id}`,values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    const onSubmit = (e) =>{
        e.preventDefault();
        mutate(e)
    }

    if(isLoading) return <CircularProgress/>
    if(isError) return <p>Ocorreu um erro ao carregar os dados</p>

    return(
        <>
            <div className='forn-input  page component buy' style={{border:`1px solid ${border}`}} >
                {
                    status === 'loading'?<CircularProgress/>:status==='error'?<p>Falha na Edição</p>:status=='success'?<p>Sucesso</p>:null
                }   
                <form>
                <div className='inputs' >
                            <div className='input' >
                                    <label>Nome da Empresa</label>
                                    <div className='name-input' >
                                        <div className='icon' >
                                        </div>
                                          <input onChange={(e)=>setValues({...values,nome_empresa:e.target.value})} value={values.nome_empresa} type='text' required/>
                                    </div>
                                </div>
                                <div className='input' >
                                    <label>NIF</label>
                                    <div className='name-input' >
                                        <div className='icon' >
                                        </div>
                                          <input onChange={(e)=>setValues({...values,nif_empresa:e.target.value})} value={values.nif_empresa} type='number' required />
                                    </div>
                                </div>
                                <div className='input' >
                                    <label>Email</label>
                                    <div className='name-input' >
                                         <div className='icon' >
                                        </div>
                                        <input onChange={(e)=>setValues({...values,email_empresa:e.target.value})} value={values.email_empresa} type='email'  required />
                                    </div>
                                </div>
                                <div className='input' >
                                    <label>Contactos</label>
                                    <div className='name-input' >
                                        <div className='icon' >

                                        </div>
                                        <input onChange={(e)=>setValues({...values,telefone_empresa:e.target.value})} value={values.telefone_empresa} type='number'  required />
                                    </div>
                                </div>
                                <div className='input' >
                                    <label>Endereço</label>
                                    <div className='name-input' >
                                        <div className='icon' >

                                        </div>
                                        <input onChange={(e)=>setValues({...values,endereco_empresa:e.target.value})} value={values.endereco_empresa} type='text'  required />
                                    </div>
                                </div>
                        </div>
                        <div className='desc' >
                                <label> Logo </label>
                                <div style={{width:'300px'}} className='logo' >
                                    <img style={{width:'100%'}} alt='logo' src={'http://localhost:8000/logo'} />
                                </div>
                                <div className='desc-text' >
                                    
                                </div> 
                        </div>
                </form>
                <div>
                    <Button onClick={(e)=>onSubmit(e)} position='absolute' bottom='30px' right='40px' text='Salvar' />
                </div> 
            </div>
        </> 
    )
}