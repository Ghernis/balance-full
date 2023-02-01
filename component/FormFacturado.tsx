import { useState,useEffect } from 'react'

import TextCSV from './TextCSV';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const FormFacturado=(props)=>{
    const {departamentos}:{departamentos:[{
        departamento:string,
        provincia:string
    }]}=props
    const conceptos=[
        'Residencial',
        'Comercial',
        'Industrial',
        'ServicioSanitario',
        'Alumbrado',
        'Riego',
        'Oficial',
        'Rural',
        'Otros',
        'Traccion'
    ]

    let auxFacturado:any[]=conceptos.map(c=>{
        const aux = {
            concepto:c,
            cantUser:0,
            kwh:0.0
        }
        return aux
    })
    //let data:[{departamento:string,facturado:any[]}]=departamentos.map(d=>{
    let data:any[]=departamentos.map(d=>{
        const aux = {
            departamento:d.departamento,
            facturado: auxFacturado.map(x=>Object.assign({},x))
        }
        return aux

    })
    const [csv,setCsv]=useState(data)
    const [depaCargando, setDepaCargando]=useState(departamentos[0])
    const [indexDepa, setIndexDepa]=useState(0)

    useEffect(()=>{
        console.log(csv)
    },[csv])
    const nextDepa=()=>{
        if(indexDepa<departamentos.length-1){
            setIndexDepa(indexDepa+1)
        }
    }
    const prevDepa=()=>{
        if(indexDepa>0){
            setIndexDepa(indexDepa-1)
        }
    }
    const hand=(data)=>{
        console.log(data)
        setCsv(data)
    }
    return (
        <div className='container'>
            <TextCSV x={2} y={10} handler={hand} />
            <h4 className='mt-4'>Facturado en departamento {indexDepa+1}/{departamentos.length}: {departamentos[indexDepa].departamento}</h4>
            <label>Usar '.' como decimal</label>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th className='text-center'>Cantidad de Usuarios</th>
                        <th className='text-center'>kwh</th>
                        {/*
                        <th className='text-center'>Facturado Sin Gravamen</th>
                        <th className='text-center'>Facturado Con Gravamen</th>
                        <th className='text-center'>Precio Medio</th>
                    */}
                    </tr>
                </thead>
                <tbody>
                    {
                    csv[indexDepa].facturado.map((c,i)=>{
                        return(
                            <tr key={c.concepto}>
                                <td>{c.concepto}</td>
                                <td><Form.Control 
                                        onChange={(e)=>{
                                            let aux=[...csv]
                                            let input:number = parseInt(e.target.value)
                                            if(isNaN(input)){
                                                input=0
                                            }
                                            aux[indexDepa].facturado[i].cantUser=input
                                            setCsv(aux)
                                        }}
                                        value={c.cantUser} plaintext className='text-center' type='number' placeholder='' 
                                    />
                                </td>
                                <td><Form.Control 
                                        onChange={(e)=>{
                                            let aux=[...csv]
                                            let input:number=parseFloat(e.target.value)
                                            if(isNaN(input)){
                                                input=0
                                            }
                                            aux[indexDepa].facturado[i].kwh=input
                                            setCsv(aux)
                                        }}
                                        value={c.kwh} plaintext className='text-center' type='number' placeholder='' /></td>
                                {/*
                                <td><Form.Control value={csv && csv[i][2]} plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control value={csv && csv[i][3]} plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control value={csv && csv[i][4]} plaintext className='text-center' type='text' placeholder='algo' /></td>
                                */}
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <div className='row'>
                <div className='col'>
                    <Button onClick={()=>prevDepa()}>Anterior</Button>
                </div>
                <div className='col'>
                    <Button onClick={()=>nextDepa()}>Siguiente</Button>
                </div>
            </div>
        </div>

    )
}

export default FormFacturado;
