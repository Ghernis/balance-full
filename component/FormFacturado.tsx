import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const FormFacturado=(props)=>{
    const {departamentos}=props
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
    return (
        <div className='container'>
            <h4 className='my-4'>Facturado en departamento: {departamentos[indexDepa]} {indexDepa+1}/{departamentos.length}</h4>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th className='text-center'>Cantidad de Usuarios</th>
                        <th className='text-center'>kwh</th>
                        <th className='text-center'>Facturado Sin Gravamen</th>
                        <th className='text-center'>Facturado Con Gravamen</th>
                        <th className='text-center'>Precio Medio</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    conceptos.map(c=>{
                        return(
                            <tr key={c}>
                                <td>{c}</td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
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
