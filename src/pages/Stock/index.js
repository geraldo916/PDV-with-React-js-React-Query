import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import { Link,Switch,Route,useRouteMatch } from 'react-router-dom'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import '../../styles/Stock.css'
import PrivateRoute from '../../auth';
import Button from '../../components/button'

const StockFeedback = ({text,color}) =>{

    return(
        <div style={{
            width:'100%',
            backgroundColor:color,
            color:'#fff',
            padding:'10px'
        }} >
            {text}
        </div>
    )
}

const List  = ({dados}) =>{
    return(
        
        dados.length>1?(<>
            {
                dados.map((product,i)=>{
                    var percentStock = parseInt((product.stock_atual / (product.entradas + product.stock_inicial)) * 100)
                    return (
                        <tr key={i} >
                        <td> {product.nome} </td>
                        <td> {product.stock_inicial} </td>
                        <td> {product.saidas} </td>
                        <td> {product.entradas} </td>
                        <td> {product.stock_atual} </td>
                        <td> {percentStock}% </td>
                        <td> {product.stock_minimo} </td>
                        <td> {product.stock_atual === 0?<StockFeedback color='red' text='Sem Stock' />:product.stock_atual === product.stock_minimo?<StockFeedback color='#ff7139' text='Stock Min Antingido' />:percentStock < 20?<StockFeedback color='orange' text='Compra Necessária' />:percentStock > 20?<StockFeedback color='green' text='Stock Confortável' />:null}</td>
                    </tr>
                    )
                })
            }
        </>):null
            
        
    )
}

const Stockproducts = ({border}) =>{
    const [next,setNext] = useState(3)
    const [prev,setPrev] = useState(0)
    const [dados,setData] = useState([])
    const {isLoading,isError,isSuccess,data} = useQuery(["stock",next],async ()=>{
        var dados =  await axios.get('http://localhost:8000/stocks',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        return dados.data
    })

    useEffect(()=>{
        if(data){
            setData(data.slice(prev,next))
        }
        console.log(dados)
    },[data])

    if(isLoading) return <CircularProgress/>
    if(isError) return <p>Ocorreu um erro</p>
   
    console.log(data)

    return(
        <div className='page component' style={{border:`1px solid ${border}`}} >
            <table className="table" >
                <thead>
                    <tr>
                        <th>Produtos</th>
                        <th> Estoque Inicial </th>
                        <th> Saidas </th>
                        <th> Entradas </th>
                        <th> Estoque Atual </th>
                        <th> % do Estoque </th>
                        <th> Estoque Mínimo </th>
                        <th> Status </th>
                    </tr>
                </thead> 
                <tbody>
                    { isLoading?<CircularProgress/>:isError?<p>Ocorreu um erro</p>:isSuccess?(<>
                        <List dados={dados} />
                    </>):null
                    }
                </tbody>
            </table>
            <div className='nextPrev' >
                <button onClick={(e)=>{
                    if(prev >= 0 && next >3){
                        setNext(next-3)
                        setPrev(prev-3)
                        console.log(prev)
                    }
                }} >{'<<'}</button>
                <button onClick={(e)=>{
                    if(next<data.length && isSuccess){
                        setData(next+3,prev+3)
                        setNext(next+3)
                        setPrev(prev+3)

                    }
                    
                }} >{'>>'}</button>
            </div>
        </div>
    )
}

const SearchProducts = ({setValues=f=>f,name,setName}) =>{
    const [list,setList] = useState(false)
    const {isLoading,isError,data,isSuccess} = useQuery(["produtos",name],async () => {
        return await axios.get(`http://localhost:8000/produtos/${name}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    },{
        enabled:!!name
    })

    return(
        <>
            <label>Nome do Produto</label>
            <div className='name-input' >
                <div className='icon' >
                    <ViewInArIcon />
                </div>
                <input type='text' value={name} onChange={(e)=>{
                   setName(e.target.value)
                   setList(true)
                }} required/>
                {
                        isLoading?<CircularProgress/>: isError ? <p>Falha ao buscar Produto...</p>:isSuccess?(
                        <>
                            {
                                list?(
                                    <div className='list-forn' > 
                                        {
                                        data.data.map((product,i)=>(
                                            <p onClick={(e)=>{
                                                setName(product.nome)
                                                setValues(product)
                                                setList(false)
                                            }} className='forn' key={i} > {product.nome}</p>))
                                        } 
                                    </div>
                                ):null
                            }
                        </>
                        ):null
                    }
            </div>
        </>
    )
}

const Entries = ({border}) => {
    const [product,setProduct] = useState({})
    const [qtd,setQtd] = useState()
    const [nome,setName] = useState() 
    const [listProduct,setListProduct] = useState([])
    const {mutate,isSuccess,isError,isLoading} = useMutation(async e => {
        e.preventDefault()
        var dados =  await axios.post('http://localhost:8000/stocks',listProduct,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        setListProduct([])
        return dados
    })
    const onSubmit = async (e) =>{
        e.preventDefault()
        if(listProduct.length < 1){
            alert('Adiciona um Item')
        }else{
            mutate(e)
            console.log('console.logo')
        }
    }

    const addItem = (e) =>{
        e.preventDefault()
        var index = listProduct.find(item => item.id_produto === product.id)
        if(index){
            var listUpdateded = listProduct.map((prod)=> index.id_produto === prod.id_produto?{...prod,qtd:parseInt(prod.qtd)+parseInt(qtd)}:prod)
            setListProduct(listUpdateded)
        }else{
            setListProduct([...listProduct,{id_produto:product.id,nome:product.nome,qtd:qtd}])
        }
        setName('')
        setQtd('')
    }

    return(
        <>
        {
            isLoading?<CircularProgress/>:isError?<p>Ocorreu um erro</p>:isSuccess?<div className='success' >
                Cadastrado com sucesso </div>:null
        }
        <div className='buy page component' style={{border:`1px solid ${border}`}} >
            <form onSubmit={(e)=>addItem(e)} >
                    <div className='inputs entriesItem' >
                        <div className='input' >
                            <SearchProducts name={nome} setName={value=>setName(value)} setValues={prod=>setProduct({nome:prod.nome,id:prod.id_produto})} />
                        </div>
                        <div className='input' >
                            <label>Quantidade</label>
                            <div className='name-input' >
                                <div className='icon' >
                                    <FormatListNumberedIcon/>
                                </div>
                                    <input type='number' value={qtd} onChange={(e)=>{
                                    setQtd(e.target.value)
                                }} required />
                            </div>
                        </div>
                        <Button type='submit' background='#071a2f' text='ADICIONAR' />   
                    </div>
                    </form>
                </div> 
                <div className='buy page component' style={{border:`1px solid ${border}`}} >
                    <ul className='listEntries' >
                        {
                            listProduct.map((item,i)=>(
                                <li  key={i} >
                                    <div>Produto: {item.nome} </div>
                                    <div>Quantidade: {item.qtd} </div>
                                    <div onClick={(e)=>{
                                        var newlist = listProduct.filter(el=>el.id_produto !== item.id_produto)
                                        setListProduct(newlist)
                                    }} > Remover </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Button onClick={(e)=>onSubmit(e)} background='#5838ad' text='CONCLUIDO' position='absolute' right='10px' marginTop='10px' /> 
        </>
    )
}

export default function Stock(){
    const [buyColor,setBuyColor] = useState(true)
    const [forColor,setForColor] = useState(false)
    const [border,setBorder] = useState('#8ee000')
    const [stock,setStock] = useState()
    let match = useRouteMatch()

    return(
        <>
            <Menu/>
            <div className="main" >
            <div className="content" >
              <Header/>
              <div className='title-page' >
                <h2> STOCK</h2>
              </div>
              <div className="page component" >
                <div className='stock' >
                        <div className='buttons' >
                            <Link to='/stock' >
                                <h2 style={buyColor?{background:'#8ee000'}:{background:'#071a2f'}} onClick={(e)=>{
                                    setBuyColor(true)
                                    setBorder('#8ee000')
                                    setForColor(false)
                                }} >Stock</h2>
                            </Link>
                            <Link to={`${match.url}/entries`} >
                                <h2 style={forColor?{background:'#5838ad'}:{background:'#071a2f'}} onClick={(e)=>{
                                    setForColor(true)
                                    setBorder('#5838ad')
                                    setBuyColor(false)
                                }} >Entradas</h2>
                            </Link>
                        </div>
                        
                        <Switch>
                            <PrivateRoute path={`${match.path}/entries`} component={<Entries border={border} />} />
                            <PrivateRoute path='/stock' component={<Stockproducts border={border} />} /> 
                        </Switch>
                </div>
              
              </div>
            </div>   
          </div>
        </> 
    )
}