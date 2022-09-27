import React from 'react';

export default function Button({
    background,
    text,
    color='#fff',
    position='relative',
    right='auto',
    bottom='auto',
    left='auto',
    top='auto',
    onClick=f=>f,
    marginTop = 'auto',
    width = '140px',
    height = '50px',
    fontSize = '16px',
    padding = 'auto',
    type = 'button'
    }){
    return(
        <button onClick={(e)=>onClick(e)} style={{
            position: `${position}`,
            width: width,
            height: height,
            backgroundColor: `${background}`,
            color: `${color}`,
            border: 'none',
            right: `${right}`,
            bottom: `${bottom}`,
            fontWeight: 'bold',
            fontSize: fontSize,
            letterSpacing: '1px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop:`${marginTop}`,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            padding:padding,
            textTransform:'uppercase'
        }} type={type} className='button-produ' >
            {text}
        </button>
    )
}