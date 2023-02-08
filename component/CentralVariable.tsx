import { useState } from 'react'

import { trpc } from '../utils/trpc';

import Cmb from './Cmb';
import Energia from './Energia';

import Button from 'react-bootstrap/Button'

const CentralVariable=()=>{
    //const centrales=['central test 1','central test 2','central test 3']
    const [index,setIndex]=useState(0)
    const centrales = trpc.centrales.useQuery({empresaId:'ej1'})
    const nextCent=()=>{
        if(index<centrales.data.length-1){
            setIndex(index+1)
        }
    }
    const prevCent=()=>{
        if(index>0){
            setIndex(index-1)
        }
    }
    if(!centrales.data) <div>loading...</div>
    return (
        <>
            {centrales.data!=undefined &&
            <h3>Central {index+1+' de '+centrales.data.length}: {centrales.data[index].nombre}</h3>
            }
            <Cmb />
            <Energia />
            <Button onClick={()=>prevCent()}>Anterior</Button>
            <Button onClick={()=>nextCent()}>Siguiente</Button>
        </>
    )
}

export default CentralVariable;
