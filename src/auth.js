import React from 'react'
import {Route,Redirect} from 'react-router-dom'


export const isAuth = () =>{
    var token = localStorage.getItem('token')
    if(token && token !== null && token !== undefined){
        return true; 
    }
    return false

}

export default function PrivateRoute({component: Component,...rest}){
    return(
        <Route
            {...rest}
            render={props=>
            isAuth()?(
                Component
            ):(
                <Redirect to={
                    {
                        pathname:'/',
                        state:{
                            from:props.location,
                            message:"Usuario não Autorizado"
                        },
                    }
                } />
            )
        
        }
        />
        
    )
}