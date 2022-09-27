import React from 'react'
import RecentsSales from "../../components/RecentsSales";
import Chart from "../../components/Chart"
import '../../styles/Dashboard.css'
import '../../styles/Cards.css'
import { useSales } from '../../hooks/sales-hook';
import Cards from '../../components/Cards';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function Dashboard(){
    const {dataSet} = useSales()
    return(
        <>
            <Menu/>
            <div className="main" >
            <div className="content" >
              <Header/>
              <div className="dashboard page" >
                    <div className='cards' >
                        <Cards/>
                    </div>
                    <div className='dashboard-element' >
                        <div className="charts" >
                            <div className="areaChart component">
                                <h2 style={{
                                    color:'#071b30',
                                    opacity:'0.7',
                                    marginLeft:'50px'
                                }} >Vendas de {new Date().getFullYear()}</h2>
                                <Chart dataSet={dataSet} />
                            </div>
                        </div>
                        <RecentsSales />
                    </div>
                </div>
            </div>   
          </div>
        </> 
    )
}