import React, { useState } from 'react';
import '../../../styles/NewSale.css'
import {CircularProgress} from '@mui/material';
import ClientFormNewSale from '../../../components/ClientFormNewSale';
import useFech from '../../../hooks/useFech';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { ArrowDownward, ArrowUpward, RestoreFromTrash } from '@mui/icons-material';
import { useSales } from '../../../hooks/sales-hook';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Button from '../../../components/button';


const Produtos = ({setProduct = f => f,setMore=f=>f}) =>{
    const {loading,data,error} = useFech('http://localhost:8000/produtos')
    if(loading) return <CircularProgress/>
    if(error) return <p>Alguma coisa deu errado</p>
    if(!data) return;


    var categories = data.reduce((category,product)=>{
        if(category.indexOf(product.categoria_id) === -1 ){
            category.push(product.categoria_id)
        }
    return category
    },[])
    var productsBycategory =categories.map((category,i)=>{
        var a = data.reduce((items,product)=>{

            if(product.categoria_id === category){
                if(items.products === undefined){
                    items = {
                        id:product.categoria_id,
                        name:product.nome_categoria,
                        products: [{
                            ...product
                        }]
                    }
                }else{
                    items['products'].push({...product})
                }
            }
            return items
        },{})
        return a
    })

    return(
        <div className='moreproducts' >
            <div className='close' onClick={(e)=>setMore(false)} >
                X
            </div>
            <ul className='produtcList' >
                {
                    productsBycategory.map((category,i)=>(
                        <div key={i+1} className='categoryProd' >
                            <h3 key={category.name} > {category.name} </h3>
                            <div className='productByCategory' key={i} >
                                {
                                    category.products.map((product,k)=>(
                                        <li key={k} onClick={()=>setProduct(product)} > 
                                        <div className='nameProducto' > {product.nome}</div>
                                        <p>P.unit: {product.preco_unit}</p>
                                        <p>Disponível: {product.stock_atual}</p>
                                         </li>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

const PayForm = ({setPay=f=>f,payment}) => {
    const {loading,data,error} = useFech('http://localhost:8000/pagamentos')
    if(loading) return <CircularProgress/>
    if(error) return <p>Alguma coisa deu errado</p>
    if(!data) return;

    return(
        <>
        <div style={{
            display:'flex',
            marginTop:'10px'
        }} >
            {
                data.map((payform,i)=>(
                    <div style={{
                        width:'200px',
                        height:'50px',
                        backgroundColor:'#224161',
                        marginRight:'16px',
                        display:'flex',
                        alignItems:'center',
                        justifyItems:'center',
                        color:'#fff'
                    }} key={i} className='one payform' onClick={(e)=>setPay(payform.forma_pagamento_id)} >
                        {
                            payment===payform.forma_pagamento_id?<CheckIcon style={{color:'#fff'}} />:null
                        }
                        {payform.forma}
                    </div>
                ))
            }
        </div>
        </>
    )

}

export default function NewSale(){
    const {user} = useSales()
    const [idClient, setIdClient] = useState({id:'',nome:''})
    const [products,setProducts] = useState([])
    const [more,setMore] = useState(false)
    const [payment,setPay] = useState(1)
    const {getTotal} = useSales()

    var body = {
        cliente_id:idClient.id,
        nome_cliente:idClient.nome,
        data:new Date(),
        vendedor_id:user.id_vendedor,
        nome_vendedor: user.nome_vendedor,
        forma_pagamento_id:payment,
        observacoes:'',
        produtos:products
    }
   
    const {isLoading,data,isError,error,isSuccess,mutate} = useMutation(async event=>{
        event.preventDefault()
        return await axios.post('http://localhost:8000/venda',body,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    })


    
    const onSubmit = (e) =>{
        e.preventDefault()
        if(products.length < 1){
            alert("Nenhum Produto Adicioado")
        }else{
            console.log('ola mundo')
            mutate(e)
            setProducts([])
        } 
    }

    const addItem = (index) =>{
        setMore(true)
    }

    const addProduct = (product) => {
        setMore(false)
        var prod =  products.find(prod => prod.id_produto === product.id_produto) 
        if(prod !== undefined){
            addQtd(prod,1)
        } else{
            if(product.stock_atual === product.stock_minimo){
                alert("Limite Mínimo de Stock Atingido")
            }else{
                setProducts([...products,{...product,qtd:1}])
            }
        }  
    }

    const deleteProduct = (id) =>{
        var newProducts = products.filter(product=>product.id_produto!==id)
        setProducts(newProducts)
    }

    const addQtd = (prod,qtd) =>{
        var product =  products.find(product => product.id_produto === prod.id_produto)
        if(product.qtd < prod.stock_atual && product.stock_minimo !== product.qtd - prod.stock_atual  ){
            var updatePrducts = products.map((item,i)=>item.id_produto===prod.id_produto?{...item,qtd:item.qtd + qtd}:item)
            setProducts(updatePrducts)
        }else{
            alert("Atingiu o número Máximo em Stock")
        }
        
        
    }
    
    const reduceQtd = (product) =>{
        var prod =  products.find(prod => prod.id_produto === product.id_produto)
        if(prod.qtd > 1){
            var updatePrducts = products.map((item,i)=>item.id_produto===prod.id_produto?{...item,qtd:item.qtd -1}:item)
            setProducts(updatePrducts)
        }
        
    }
    return(
        <>
            <Menu/>
            <div className="main" >
            <div className="content" >
              <Header/>
              <div className='title-page' >
                <h2> REALIZAR VENDA</h2>
            </div>
              <div className='newSale page component'>
                <div className='new-sale-cabecalho' >
                    <h2> <PointOfSaleIcon/> Nova Venda</h2>
                </div>
                {
                    isLoading?<CircularProgress/>:isError?<p>Ocorreu um erro</p>:isSuccess?<div className='suscess' > Venda Realizada Com sucesso </div>:null
                }
                <div className='form-newsale page' style={{
                    position:'relative'
                }} >
                    <form onSubmit={(e)=>onSubmit(e)} >
                            <h2 style={{
                                fontSize:'16px',
                                color:'#5f6464',
                                letterSpacing:'1px'
                            }} >Dados do Cliente</h2>
                            <ClientFormNewSale setIdClint={(id,nome) => setIdClient({id,nome})} />
                            <h2 style={{
                                fontSize:'16px',
                                color:'#5f6464',
                                letterSpacing:'1px',
                                marginTop:'48px'
                            }} >Carrinho</h2>
                            <table style={{
                                    backgroundColor:'#efeeed',
                                }} className="table" >
                                <thead style={{
                                        backgroundColor:'#dddddd',
                                    }} >
                                    <tr>
                                        <th>Produto</th>
                                        <th>Quantidade</th>
                                        <th>Preço</th>
                                        <th>Total</th>
                                        <th> Ação </th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {
                                        products.map((product,i)=>(
                                            <tr key={i} >
                                                
                                                <td>
                                                    {product.nome}
                                                </td>
                                                <td >
                                                    <div>
                                                        <ArrowUpward onClick={()=> {
                                                            product.stock_minimo === product.stock_atual - 1?alert("Limite Mínimo de Stock Atingido"):addQtd(product,1)
                                                        }} />  {product.qtd} <ArrowDownward onClick={()=>reduceQtd(product)} />
                                                    </div>
                                                    
                                                </td>
                                                <td>
                                                    {product.preco_unit},00
                                                </td>
                                                <td>
                                                    {product.qtd*product.preco_unit},00
                                                </td>   
                                                <td>
                                                    <button type='button' className='trashbutton' onClick={()=>deleteProduct(product.id_produto)} > <DeleteIcon/> </button>
                                                </td>
                                            </tr>  
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                more ? <Produtos setProduct={product =>  addProduct(product)} setMore={v=>setMore(v)} /> : ''
                            }
                            <div className='morebutton' onClick={()=>addItem(1)}  >
                                <h2>Adicionar Item</h2>
                                <AddCircleIcon/>
                            </div>
                            <div className='payforms' >
                                <h2 style={{
                                    fontSize:'16px',
                                    color:'#5f6464',
                                    letterSpacing:'1px'
                                }} >Forma de Pagamento</h2>
                                <PayForm payment={payment} setPay={pay=>setPay(pay)} />
                            </div>
                            <h1 style={{
                                position:'absolute',
                                right:'40px',
                                bottom:'20px',
                                color:'#081b2f'
                            }} >TOTAL: {getTotal({cliente_id:idClient,vendedor_id:user.id,forma_pagamento_id:payment,observacoes:'',produtos:products})},00 Kz
                            </h1>
                            <Button marginTop='40px' type='submit' text='Concluir' />
                    </form> 
                </div>
            </div>
            </div>   
          </div>
        </> 
        
    )
}