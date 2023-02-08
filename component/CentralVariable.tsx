import { useState,useEffect } from 'react'

import { trpc } from '../utils/trpc';

import Cmb from './Cmb';
import Energia from './Energia';

import Button from 'react-bootstrap/Button'

const CentralVariable=(props)=>{
    //const centrales=['central test 1','central test 2','central test 3']
    const {centrales}=props
    const [index,setIndex]=useState(0)
    const [showSave,setShowSave]=useState(false)
    const cmbs=[
        'Gas Oil',
        'Fuel Oil',
        'Gas Natural',
        'Carbon',
        'Otros 1',
        'Otros 2'
    ]
    let auxTec={
            solar:0,
            eolico:0,
            diesel:0,
            hidro:0,
            tv:0,
            tg:0
        }
    let auxCmb=cmbs.map(c=>{
        const aux={
            cmb:c,
            unidad:'lts',
            vol:0,
            claseProd:''
        }
        return aux
    })
    let auxData=centrales.map((c:any)=>{
        const aux={
            centralId:c.nemo,
            empresaId:'ej1',
            cmb: auxCmb.map(x=>Object.assign({},x)),
            tecs: {...auxTec}
        }
        return aux
    }) || []
    const [datos,setDatos]=useState(auxData)


    useEffect(()=>{
        if(index==centrales.length-1){
            setShowSave(true)
        }
        else{
            setShowSave(false)
        }
    },[index])
    const nextCent=()=>{
        if(index<centrales.length-1){
            setIndex(index+1)
        }
    }
    const prevCent=()=>{
        if(index>0){
            setIndex(index-1)
        }
    }
    const saveData=()=>{
        console.log(datos)
    }
    return (
        <>
            {centrales!=undefined &&
            <h3>Central {index+1+' de '+centrales.length}: {centrales[index].nombre}</h3>
            }
            <Cmb data={datos} setData={setDatos} index={index}/>
            <Energia data={datos} setData={setDatos} index={index}/>
            <Button onClick={()=>prevCent()}>Anterior</Button>
            <Button onClick={()=>nextCent()}>Siguiente</Button>
            {showSave &&
            <Button variant='success'onClick={()=>saveData()}>Guardar</Button>
            }
        </>
    )
}

export default CentralVariable;
