import React, { useState } from 'react'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import PrivateRoute from '../../auth';
import {Link,Switch,useRouteMatch} from 'react-router-dom'
import '../../styles/Warehouse.css'

import { ShoppingBagRounded } from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';
import Geral from './Geral';
import Users from './Users';

export default function Settings(){
    const [buyColor,setBuyColor] = useState(true)
    const [forColor,setForColor] = useState(false)
    const [border,setBorder] = useState('#8ee000')
    let match = useRouteMatch()
    return(
        <>
            <Menu/>
            <div className="main" >
            <div className="content" >
              <Header/>
              <div className='title-page' >
                <h2> CONFIGUAÇÕES </h2>
            </div>
              <div className='warehouse' >
                    <div className='buttons' >
                        <Link to='/settings' >
                            <h2 style={buyColor?{background:'#8ee000'}:{background:'#071a2f'}} onClick={(e)=>{
                                setBuyColor(true)
                                setBorder('#8ee000')
                                setForColor(false)
                            }} > <ShoppingBagRounded/> Geral </h2>
                        </Link>
                        <Link to={`${match.url}/users`} >
                            <h2 style={forColor?{background:'#5838ad'}:{background:'#071a2f'}} onClick={(e)=>{
                                setBuyColor(false)
                                setForColor(true)
                                setBorder('#5838ad')
                            }} > <GroupsIcon/> Usuários </h2>
                        </Link>
                    </div>
                    <Switch>
                        <PrivateRoute path={`${match.path}/users`} component={<Users border={border} />} />
                        <PrivateRoute path='/settings' component={<Geral border={border} />} />
                    </Switch>
              </div>
            </div>   
          </div>
        </> 
    )
}