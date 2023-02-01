import { useState } from 'react'

import TextCSV from './TextCSV';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const FormFacturado=(props)=>{
    const {departamentos}:{departamentos:[{
        departamento:string,
        provincia:string
    }]}=props
    const [csv,setCsv]=useState()
    const [depaCargando, setDepaCargando]=useState(departamentos[0])
    const [indexDepa, setIndexDepa]=useState(0)
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
            <h4 className='my-4'>Facturado en departamento {indexDepa+1}/{departamentos.length}: {departamentos[indexDepa].departamento}</h4>
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
                    conceptos.map((c,i)=>{
                        return(
                            <tr key={c}>
                                <td>{c}</td>
                                <td><Form.Control value={csv && csv[i][0]} plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control value={csv && csv[i][1]} plaintext className='text-center' type='text' placeholder='algo' /></td>
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
