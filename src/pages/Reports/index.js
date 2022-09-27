import React from 'react'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import HistoChart from '../../components/ComposeChart'
import PizzaChart from '../../components/PizzaChart'
import BarCharts from '../../components/Barchart'
import AmountBarChart from '../../components/AmountBarChart'
import {useQuery} from 'react-query'
import axios from 'axios'
import {CircularProgress} from '@mui/material';
import '../../styles/Reports.css'
import {useSales} from '../../hooks/sales-hook'

const Topclient = () =>{
    const {isLoading,isError,data,isSuccess} = useQuery('clientes',async () => {
        return await axios.get(`http://localhost:8000/clientesSales`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    if(isLoading) return <CircularProgress/>
    if(isError) return <p>Ocorreu um erro</p>
    
    var nomes = data.data.reduce((nomes,cliente)=>{
            if(nomes.indexOf(cliente.nome_cliente) === -1){
                nomes.push(cliente.nome_cliente)
            }
        
        return nomes
    },[])

    var dataSet = nomes.map((nome)=>{
        return data.data.reduce((dataSet,client)=>{
            if(nome === client.nome_cliente){
                dataSet['name'] = client.nome_cliente.split(' ')[0]
                dataSet['fr']?dataSet['fr'] += 1:dataSet['fr'] = 1
            }
            return dataSet
        },{})
    })

    return(
        <>
            <BarCharts dataSet={dataSet} />
        </>
    )
}


export default function Reports(){
    const {dataAmount} = useSales()
    const {isLoading,isError,data,isSuccess} = useQuery('produtos',async () => {
        return await axios.get(`http://localhost:8000/produtos`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
    })

    if(isLoading) return <CircularProgress/>
    if(isError) return <p>Ocorreu um erro</p>

    var dataSet = data.data.reduce((dataSet,product)=>{
        dataSet.push({
            name:product.nome,
            qtd:product.saidas
        })
        return dataSet
    },[])

    var totalAmount = dataAmount.reduce((totalAmount,amount)=>{
        totalAmount += amount.amount
        return totalAmount
    },0)

    var dados = dataSet.sort(function (a, b) {
        if (a.qtd < b.qtd) {
          return 1;
        }
        if (a.qtd > b.qtd) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }).slice(0,5).sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;})

        console.log(dados)

    var categories = data.data.reduce((categories,product)=>{
        if(categories.indexOf(product.nome_categoria) === -1){
            categories.push(product.nome_categoria)
        }
        return categories
    },[])
    
    var dataSetPizza = categories.map((category,i)=>{

        return data.data.reduce((data,product)=>{

            if(category === product.nome_categoria){
                data["name"] = product.nome_categoria;
                data["value"]?data["value"] += parseInt(product.saidas):data["value"] = parseInt(product.saidas) 
            }

            return data
        },{})

    })


    return(
        <>
        <Menu/>
        <div className="main" >
            <div className="content" >
                <Header/>
                <div className='title-page' >
                    <h2> RELATÓRIOS</h2>
                </div>
                <div className='page content' >
                    <div className='charts' >
                        <div className="composeChart component">
                            <h2>Produtos Mais Vendidos</h2>
                            <HistoChart dataSet={dados} />
                        </div>
                        <div className="PizaChart component">
                            <h2>Vendas Por Categoria</h2>
                            <PizzaChart className='graph' dataSet={dataSetPizza} />
                        </div>
                    </div>
                </div>
                <div className='page content' >
                    <div className='charts' >
                        <div className="clientChart component">
                            <h2>Top Clientes</h2>
                            <Topclient/>
                        </div>
                        <div className="mesChart component">
                            <h2>Lucro/Mês Deste Ano</h2>
                            <AmountBarChart dataAmount={dataAmount} />
                        </div>
                        <div className="totaLucro component">
                            <h2>Lucro Total</h2>
                            <p> Kz {totalAmount},00 </p>
                        </div>
                    </div>
                    
                </div>  
                
            </div>   
           
      </div>
      
        
    </> 
    )
}