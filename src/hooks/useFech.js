import {useState,useEffect} from 'react'

export default function useFech(url){
    const [data,setData] = useState()
    const [error,setError] = useState()
    const [loading,setLoadig] = useState(true)

    var token = localStorage.getItem('token')
    
    useEffect(()=>{
        if(!url) return;
        fetch(url,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response=>response.json())
        .then(setData)
        .then(()=> setLoadig(false))
        .catch(setError)
    },[token])

    return {
        loading,
        data,
        error
    }
}