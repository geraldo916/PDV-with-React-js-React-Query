import React, { useLayoutEffect } from 'react'
import {useHistory} from 'react-router-dom'

export default function Logout(){
    const history = useHistory()
    console.log('ola mundo')
    localStorage.removeItem('token')
    history.push('/')

    return (
        <>
        </>
    )
}