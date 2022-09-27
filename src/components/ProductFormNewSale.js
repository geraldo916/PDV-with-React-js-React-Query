import { Input, InputAdornment, Select } from '@material-ui/core';
import { CircularProgress} from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import React, { useState } from 'react';
import useFech from '../hooks/useFech';
import '../styles/NewSale.css'

const Products = ({name,setProduct = f => f}) =>{
    const {loading,data,error} = useFech(`http://localhost:8000/produtos/${name}`)
    
    if(loading) return <CircularProgress/>
    if(error) return <span>Algo deu errado</span>
    if(!data) return;
    if(data.length < 1) return <li> {name} </li>;

    return(
        <>
            <ul>
                {
                    data.map((product,i)=>(
                        <li onClick={()=>setProduct(product)} key={i} > {product.nome} </li>
                    ))
                }
            </ul>
        </>
    )
}

const useCategoria = (id) => {
    const {loading,data,error} = useFech(`http://localhost:8000/categoria/${id}`)
    if(loading) return <CircularProgress/>
    if(error) return <span>Algo deu errado</span>
    if(!data) return;

    return({
        categoria:data.nome_categoria
    })
}

const InfoProduct = ({product}) => {
    const {categoria} = useCategoria(product.categoria_id)
    if(categoria === undefined) return null;
    
    return(
        <>
            <td> {product.nome} </td>
            <td> {product.preco_unit} </td>
            <td> {product.descricao} </td>
            <td> {categoria} </td>
        </>
        
    )
}

export default function ProductFormNewSale({setIdProduct = f => f, removeIdProduct=f=>f}){
    const [name,setName] = useState('')
    const [selected,setSelected] = useState(false)
    const [product,setProduct] = useState()

    const onChange = (name) =>{
        setName(name)
        setSelected(false)
        setProduct(undefined)
        removeIdProduct()
    }

    return(
       <>
            <input placeholder='adicionar Iten' value={name} onChange={(e)=>onChange(e.target.value)} id='nome' type="" />
            <div> {name} </div>
            {
                !selected && name !== '' ? <Products name={name} setProduct={product =>{
                    setProduct(product)
                    setSelected(true)
                    setName(product.nome)
                    setIdProduct(product.id_produto)
            } } /> : ''
            }

            {
                product?<InfoProduct product={product} />:''
            }

       </>
    )
}