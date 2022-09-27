import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react'
import Table from '../../components/Table';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import '../../styles/Sales.css'
import Button from '../../components/button';


export default function Sales(){
    return(
        <>
            <Menu/>
            <div className="main" >
                <div className="content" >
                <Header/>
                <div className='title-page' >
                    <h2> VENDAS </h2>
                </div>
                <div className='sales page content component' >
                    <div className='bottonNewSale' >
                        <Link to='/new-sale' style={{display:'inline-block'}} >
                            <Button width='300px' text={(<> Nova Venda </>)} />
                        </Link>
                    </div>
                    <Table/>
                </div>
                </div>   
          </div>
        </> 
        
    )
}