import { CircularProgress} from '@mui/material'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios'
import React, {useReducer, useState,useEffect, useCallback} from 'react'
import { useMutation, useQuery} from 'react-query'
import '../../styles/Buy.css'
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '../../components/button'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import PrivateRoute from '../../auth';
import {Link,Switch,useRouteMatch,useParams} from 'react-router-dom'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PriceChangeIcon from '@mui/icons-material/PriceChange';



const Editproduct = ({product,setEditing=f=>f}) =>{
    var {id} = useParams()
    const [values,setValues] = useState({
        nome:'',
        preco_unit:'',
        categoria:'',
        fornecedor:'',
        custo:'',
        stock_minimo:'',
        descricao:'',
        categoria_id:''
    })
    const [categories,setCategories] = useState()
    const {mutate,isLoading,isError,isSuccess} = useMutation(async () =>{
        return await axios.put(`http://localhost:8000/produto/${id}`,values,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })
    const {status,data,refetch} = useQuery(["produto"],async () => {
        var dados = await axios.get(`http://localhost:8000/produto/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        },)
        setValues(
            {
                nome:dados.data.nome,
                preco_unit:dados.data.preco_unit,
                categoria:dados.data.nome_categoria,
                categoria_id:dados.data.categoria_id,
                fornecedor:dados.data.fornecedor_id,
                custo:dados.data.custo,
                stock_minimo:dados.data.stock_minimo,
                descricao:dados.data.descricao
            }
        )
        return dados
    })

    

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
    
    const onSubmit = (e) =>{
        e.preventDefault()
        mutate()
        setValues({
            nome:'',
            preco_unit:'',
            categoria:'',
            fornecedor:'',
            custo:'',
            stock_minimo:'',
            descricao:''
        })
    }

    return(
            <>
                {
                    status === 'loading'?<CircularProgress/>:status==='error'?<p>Ocorreu um erro</p>:(
                        <form onSubmit={(e)=>onSubmit(e)} >
                            {
                                isSuccess?<div className='success' >
                                Alterado com Sucesso </div>:null
                            }
                    <div className='page component buy' style={{border:`1px solid #ccc`}} >
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
                                    <label>Preço</label>
                                    <div className='name-input' >
                                         <div className='icon' >
                                            <AttachMoneyIcon/>
                                        </div>
                                        <input type='number' value={values.preco_unit} onChange={(e)=>{
                                            setValues({...values, preco_unit: e.target.value})
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
                                    <label>Stock Mínimo</label>
                                    <div className='name-input' >
                                        <div className='icon' >
                                            <PriceChangeIcon/>
                                        </div>
                                        <input type='number' value={values.stock_minimo} onChange={(e)=>{
                                            setValues({...values, stock_minimo: e.target.value})
                                        }} required />
                                    </div>
                                </div>
                                <div className='input' >
                                    <label> Categoria </label>
                                    <div className='name-input' >
                                        <select value={values.categoria_id} onChange={(e)=>{
                                            setValues({...values, categoria_id: e.target.value})
                                        }} required >
                                            <option selected value={values.categoria_id}>
                                                        {values.categoria}
                                            </option>
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
                                <div className='desc' >
                                <label> Descrição </label>
                                <div className='desc-text' >
                                    <textarea value={values.descricao} onChange={(e)=>{
                                        setValues({...values, descricao: e.target.value})
                                    }} placeholder='Descrição do produto' ></textarea>
                                </div> 
                        </div>
                        </div>
                        
                    </div>
                    <Button type='submit' text='Salvar'/>
                </form>
                    )
                }
            </>
    )
}


const SupliersList =  ({border}) => {
    const [isEditing,setEditing] = useReducer(isEditing=>!isEditing,false)
    const [idSelected,setIdSelected] = useState()
    const {isLoading,isError,data,isSuccess,refetch} = useQuery(["produtos"],async () => {
        return await axios.get(`http://localhost:8000/produtos`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        },)
    })
    let match = useRouteMatch()
    const Refresh = async ()=>{
        await refetch()
    }
    const Delete = async (id) =>{
        confirmAlert({
            title: 'Confirma para Deletar',
            message: 'Tem Certeza que quer eliminar o Item?',
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    try{
                        await axios.delete(`http://localhost:8000/produto/${id}`,{
                            headers:{
                                Authorization:`Bearer ${localStorage.getItem('token')}`
                            }
                        })
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
                    <RefreshIcon className='icon-refresh' />
                </div>
                <table className="table" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome do Produto</th>
                            <th>Preço Unitário</th>
                            <th>Categoria</th>
                            <th>Fornecedor</th>
                            <th>Custo</th>
                            <th>Stock Mínimo</th>
                            <th>Ação</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            isLoading?<CircularProgress/>:isError?<p>Houve um erro</p>:isSuccess?(
                                data.data.map((product,i)=>(
                                    <tr key={i} >
                                        <td> {product.id_produto} </td>
                                        {
                                            isEditing && idSelected===product.id_produto?<Editproduct setEditing={async v=>{
                                                await refetch()
                                                setEditing(v) 
                                            }} product={product} />:<>
                                            <td> {product.nome} </td>
                                            <td> {product.preco_unit} </td>
                                            <td> {product.nome_categoria} </td>
                                            <td> {product.fornecedor_id} </td>
                                            <td> {product.custo} </td>
                                            <td> {product.stock_minimo} </td>
                                            <td style={{display:'flex',justifyContent:'center'}} >
                                                <Link to={`${match.path}/edit/${product.id_produto}`} >
                                                    <div style={{color:'#fff',backgroundColor:'orange',margin:'0 8px',padding:'6px'}} className='editbutton' >Editar</div>
                                                </Link>
                                                <div style={{color:'#fff',backgroundColor:'red',cursor:'pointer'}} onClick={(e)=>Delete(product.id_produto)} > <DeleteIcon/> </div>
                                             </td>
                                            </>
                                        }
                                    </tr>
                                    ))
                            ):null 
                        }
                    </tbody>
                </table>
                <Link to='/buy' >
                    <Button  padding='10px' width='140px' height='auto' fontSize='14px' background='#5838ad' text={(<><AddCircleIcon/>NOVO</>)} />
                </Link>
                
            </div>
        </>
    )
}

export default function Products({border}){
    let match = useRouteMatch()
    return(
        <>
            <Menu/>
            <div className="main" >
                <div className="content" >
                <Header/>
                <div className='title-page' >
                    <h2>PRODUTOS</h2>
                </div>
                <div className='sales page content component' >
                    <Switch>
                        <PrivateRoute path={`${match.path}/edit/:id`} component={<Editproduct/>} />
                        <PrivateRoute path='/products' component={<SupliersList border={border} />} />
                    </Switch>
                </div>
                </div>   
          </div>
        </>
    )
}