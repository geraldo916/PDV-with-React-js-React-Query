import { ListItemAvatar } from '@material-ui/core'
import { ListAlt, Person } from '@mui/icons-material'
import { CircularProgress, ListItemIcon } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery} from 'react-query'
import '../../../styles/Buy.css'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

const Fornecedores =  ({border,setValues=f=>f,values}) => {
    const [nome,setName] = useState() 
    const [list,setList] = useState(false)
    const {isLoading,isError,error,data,isSuccess} = useQuery(["fornecedor",nome],async () => {
        return await axios.get(`http://localhost:8000/fornecedores/${nome}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    },{
        enabled:!!nome
    })

    return(
        <>
            <div className='forn-input  page component buy' style={{border:`1px solid ${border}`}} >
                <label>Nome do Fornecedor</label>
                <div className='name-input' >
                        <div className='icon' >
                            <Person/>
                        </div>
                      <input type='text' value={nome} onChange={(e)=>{
                        setName(e.target.value)
                        setList(true)
                    }} required />
                        {
                            isLoading?<CircularProgress/>: isError ? <p>Falha ao buscar forne...</p>:isSuccess?(
                            <>
                                {
                                    list?(
                                        <div className='list-forn' > 
                                            {
                                            data.data.map((fornecedores,i)=>(
                                                <p onClick={(e)=>{
                                                    setName(fornecedores.nome)
                                                    setValues({...values,fornecedor:fornecedores.id_fornecedor})
                                                    setList(false)
                                                }} className='forn' key={i} > { data?fornecedores.nome:'Fornecedor Inválido!'} </p>))
                                            } 
                                        </div>
                                    ):null
                                }
                            </>
                            ):null
                        }
                </div>    
            </div>
        </>
    )
}

export default function Buy({border}){
    const [categories,setCategories] = useState()
    const [values,setValues] = useState({
        fornecedor:'',
        nome:'',
        qtd:'',
        preco:'',
        custo:'',
        obs:'',
        categoria:1
    })

    const {isLoading,isError,error,isSuccess,mutate} = useMutation(async e => {
        e.preventDefault()
        return await axios.post('http://localhost:8000/produto',values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    function onSubmit(e){
        e.preventDefault()
        mutate(e)
        setValues(
            {
            fornecedor:'',
            nome:'',
            qtd:'',
            preco:'',
            custo:'',
            obs:'',
            categoria:1
        })
        
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/categorias',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
        }).then(response=>{
            setCategories(response.data)
        }).catch(erro=>{
            console.log(erro)
        })
    },[])
    
    
    return(
        <>
            <div className='compras' >
                {
                    isLoading?<CircularProgress/>:isError?<p>Ocorreu um erro</p>:isSuccess?<div className='success' > Cadastrado com sucesso </div>:null
                }
                <form onSubmit={(e)=>onSubmit(e)} >
                    <Fornecedores border={border} setValues={(val)=>setValues(val)} values={values} />
                    <div className='page component buy' style={{border:`1px solid ${border}`}} >
                        <div className='inputs' >
                            <div className='input' >
                                    <label>Nome do Produto</label>
                                    <div className='name-input' >
                                        <div className='icon' >
                                            <ViewInArIcon />
                                        </div>
                                          <input type='text' value={values.nome} onChange={(e)=>{
                                            setValues({...values, nome: e.target.value})
                                        }} required/>
                                    </div>
                                </div>
                                <div className='input' >
                                    <label>Quantidade</label>
                                    <div className='name-input' >
                                        <div className='icon' >
                                            <FormatListNumberedIcon/>
                                        </div>
                                          <input type='number' value={values.qtd} onChange={(e)=>{
                                            setValues({...values, qtd: e.target.value})
                                        }} required />
                                    </div>
                                </div>
                                <div className='input' >
                                    <label>Preço</label>
                                    <div className='name-input' >
                                         <div className='icon' >
                                            <AttachMoneyIcon/>
                                        </div>
                                        <input type='number' value={values.preco} onChange={(e)=>{
                                            setValues({...values, preco: e.target.value})
                                        }} required />
                                    </div>
                                </div>
                                <div className='input' >
                                    <label>Custo</label>
                                    <div className='name-input' >
                                        <div className='icon' >
                                            <PriceChangeIcon/>
                                        </div>
                                        <input type='number' value={values.custo} onChange={(e)=>{
                                            setValues({...values, custo: e.target.value})
                                        }} required />
                                    </div>
                                </div>
                                <div className='input' >
                                    <label> Categoria </label>
                                    <div className='name-input' >
                                        <select value={values.categoria} onChange={(e)=>{
                                            setValues({...values, categoria: e.target.value})
                                        }} required >
                                            { categories?
                                                categories.map((category,i)=>(
                                                    <option value={category.id_categoria} key={i} >
                                                        {category.nome_categoria}
                                                    </option>
                                                ))
                                            :null}
                                        </select>
                                    </div>
                                </div>
                        </div>
                        <div className='desc' >
                                <label> Descrição </label>
                                <div className='desc-text' >
                                    <textarea value={values.obs} onChange={(e)=>{
                                        setValues({...values, obs: e.target.value})
                                    }} placeholder='Descrição do produto' ></textarea>
                                </div> 
                        </div>
                        <button type='submit' className='button-produ' >
                            Comprado
                        </button>
                    </div>
                    
                </form>
            </div>
        </> 
    )
}