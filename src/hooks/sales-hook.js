import React,{createContext,useContext} from 'react'
import {getNameMouth} from '../services/getFormatedDate';
import Loader from '../assets/charging.gif'
import { isAuth } from '../auth';
import { useQuery } from 'react-query';
import axios from 'axios';


const salesContext = createContext()
export const useSales = () => useContext(salesContext)

const useData = () =>{
    var token = localStorage.getItem('token')
    const {isLoading, isError,error,data,refetch} = useQuery(["vendas",token],async ()=>{
        return await axios.get('http://localhost:8000/vendass',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    })

    return(
        {
            data,
            isLoading,
            error,
            isError,
            refetch
        }
    )
}

export default function SalesProvider({children}){
    const {isLoading,error,data,isError,refetch} = useData()

    if(isLoading) return <img src={Loader} alt="loader" style={{width:"400px", position:"absolute", right:"50%", bottom:"50%", transform: "translateX(50%)"}} />;
    if(isError) return <h1>Ocorreu algum erro</h1>

    if(isAuth()){
        var user = data.data.user
        var dados = data.data.dados
    }else{
        var dados = []
    }

    const getTotal = (sale) =>{
        const total = sale.produtos.reduce((total,produto)=>{
            return total += produto.qtd * produto.preco_unit
        },0)
        return total;
    }

    const getAmount = (sale) =>{
        const amount = sale.produtos.reduce((amount,produto)=>{
            return amount += (produto.qtd * produto.preco_unit) - produto.custo
        },0)
        return amount;
    }

    const getTodayInvoices = () => {
        var today = new Date().toLocaleDateString();
        var invoices = dados.filter(item => new Date(item.data).toLocaleDateString() === today )
        return invoices.length;
    }


    const getMounthInvoices = () => {
        var actual = new Date().getMonth();
        var invoices = dados.filter(item => new Date(item.data).getMonth() === actual )
        return invoices.length;
    }

    const getTodaySales = () => {
        var today = new Date().toLocaleDateString()
        var total = dados.reduce((total,sale)=>{
            
          total +=  new Date(sale.data).toLocaleDateString() === today? getTotal(sale) : 0
            return total;
        },0)
        return total;
    }
    
    const getTotalMonthSales = (month) => {

        var total = dados.reduce((total,sale)=>{
            total +=  new Date(sale.data).getMonth() === month? getTotal(sale) : 0
                return total;
            },0)
        return(total)

    }

    const getTotalMonthAmount = (month) => {

        var total = dados.reduce((total,sale)=>{
            total +=  new Date(sale.data).getMonth() === month? getAmount(sale) : 0
                return total;
            },0)
        return(total)

    }



    var myMonths = []
    
    dados.reduce((month,sale)=>{
        month = {mes:new Date(sale.data).getMonth()}
            if(myMonths.indexOf(new Date(sale.data).getMonth()) === -1){
                myMonths.push(new Date(sale.data).getMonth())
            }
        return month
    },{})

    var myMonthsSales = myMonths.reverse()
 
    const getMonthSales = () => {
        var today = new Date().getMonth();
        var total = dados.reduce((total,sale)=>{ 
          total +=  new Date(sale.data).getMonth() === today? getTotal(sale) : 0
            return total;
        },0)
        return total;
    }

    const dataAmount =  myMonthsSales.reduce((dataSet,month)=>{

        var itens = {
            name:getNameMouth(month),
            amount:getTotalMonthAmount(month)
        }
        dataSet.push(itens)
        return dataSet
    },[])

    const dataSet = myMonthsSales.reduce((dataSet,month)=>{

        var itens = {
            name:getNameMouth(month),
            uv:getTotalMonthSales(month)
        }
        dataSet.push(itens)
        return dataSet
    },[])

    return(
        <salesContext.Provider value={{refetch,user,dataAmount,dados,getTotal,dataSet,getTodayInvoices,getMounthInvoices,getTodaySales,getMonthSales,getTotalMonthSales}} >
            {children}
        </salesContext.Provider>
    )
}