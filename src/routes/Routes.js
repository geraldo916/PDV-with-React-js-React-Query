import React from 'react'
import { Route,Switch} from 'react-router-dom'
import PrivateRoute from '../auth';
import SalesProvider from '../hooks/sales-hook';

//Pages
import Sales from '../pages/Sales';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NewSale from '../pages/Sales/NewSale';
import Logout from '../pages/Logout';
import Stock from '../pages/Stock';
import Warehouse from '../pages/Warehouse';
import Reports from '../pages/Reports';
import BasicDocument from '../pages/Invoice';
import Settings from '../pages/Settings';
import Clients from '../pages/Clintes';
import Products from '../pages/Products'
import Profile from '../pages/Profile';

export default function Pages(){
    return(
        <Switch>
            <Route exact path='/'>
                <Login/>
            </Route>
            <Route path='/logout'>
                <Logout/>
            </Route>
            <SalesProvider>
                <PrivateRoute path="/Dashboard" component={<Dashboard/>} /> 
                <PrivateRoute path='/sales' component={<Sales/>} />
                <PrivateRoute path='/new-sale' component={<NewSale/>}/>
                <PrivateRoute path='/stock' component={<Stock/>} />
                <PrivateRoute path='/reports' component={<Reports/>} />
                <PrivateRoute path='/buy' component={<Warehouse/>} />
                <PrivateRoute path='/client' component={<Clients/>} />
                <PrivateRoute path='/products' component={<Products/>} />
                <PrivateRoute path='/invoice/:id' component={<BasicDocument/>} />
                <PrivateRoute path='/settings' component={<Settings/>} />
                <PrivateRoute path='/profile' component={<Profile/>} />
            </SalesProvider> 
        </Switch>
    )
}