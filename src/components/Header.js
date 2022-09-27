import React, { useReducer } from 'react'
import '../styles/Header.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSales } from '../hooks/sales-hook';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Button from './button'
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Header(){
    const [clicked,toggle] = useReducer(clicked=>!clicked,false)
    const [quick,setQuick] = useReducer(quick=>!quick,false)
    const {user} = useSales()
    return(
        <div className='header component' >
            <div className='search-conteiner' >
                <Button onClick={(e)=>setQuick(true)} text={(<><AddCircleIcon/> Nova</>)} />
                {
                quick?(
                        <div className='quickActions'>
                            <Link to='/new-sale'>
                                <p> + Venda</p>
                            </Link>
                            <Link to='/buy'>
                                <p> + Produto </p>
                            </Link>
                            <Link to='/client'>
                                <p> + Cliente </p>
                            </Link>
                            <Link to='/buy/suplier'>
                                <p> + Fornecedor </p>
                            </Link>
                        </div>
                    ):null
            }
            </div>
            <div className='use-conteiner' >
                <AccountCircleIcon className="user-icon" /> {user.nome_vendedor} <ExpandMoreIcon onClick={toggle} />
                {
                    clicked?(
                        <div className='menuUser'>
                            <Link to='/profile'>
                                <p>Minha Conta </p>
                            </Link>
                            <Link to='/logout'>
                                <p style={{display:'flex',alignItems:'center'}} >Sair <Logout/> </p>
                            </Link>
                        </div>
                    ):null
                }
            </div>
        </div>
    )
}