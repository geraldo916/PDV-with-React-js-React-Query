import React from 'react';
import '../styles/menu.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DescriptionIcon from '@mui/icons-material/Description';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useSales } from '../hooks/sales-hook';

import {Link} from 'react-router-dom'

export default function Menu(){
    var {user} = useSales()

    return(
        <header className='cabecalho component' >
            <div>
                <img className='logo' alt='logo' src={'http://localhost:8000/logo'} />
            </div>
            <nav>
                <ul className='nav-list' >
                    <Link to="/dashboard" className='nav-link'>
                        <li  className='nav-item'  > <DashboardIcon className="incon-menu"/> Dashboard </li>
                    </Link>
                    <Link to='/sales' >
                        <li className='nav-item' > <CurrencyExchangeIcon  className="incon-menu"/> Vendas </li>
                    </Link>
                    <Link to='/client' >
                        <li className='nav-item' > <GroupsIcon className="incon-menu"/> Clientes </li>
                    </Link>   
                    <Link to='/stock' >
                        <li className='nav-item' > <Inventory2Icon className="incon-menu"/> Stock </li>
                    </Link>
                    <Link to='/products' >
                        <li className='nav-item' > <DescriptionIcon className="incon-menu"/> Produtos </li>
                    </Link>
                    <Link to='/buy' >
                        <li className='nav-item' > <WarehouseIcon className="incon-menu" /> Armazéns </li>
                    </Link>
                    {
                        user.nivel === 1?<>
                             <Link to='/reports' >
                                <li className='nav-item' > <BarChartIcon className="incon-menu" /> Relatórios </li>
                            </Link>
                            <Link to='/settings' >
                                <li className='nav-item' > <SettingsIcon className="incon-menu" /> Configurações </li>
                            </Link>
                        </>:null
                    }  
                    {
                        user.nivel === 2?<>
                             <Link to='/reports' >
                                <li className='nav-item' > <BarChartIcon className="incon-menu" /> Relatórios </li>
                            </Link>
                        </>:null
                    }  
                </ul>
            </nav>
        </header>     
    )
}