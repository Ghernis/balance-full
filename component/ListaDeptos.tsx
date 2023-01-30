import { trpc } from '../utils/trpc'
import { useState,useEffect } from 'react'
import FormFacturado from './FormFacturado';

import Alert from 'react-bootstrap/Alert'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListaDeptos=()=>{
    const [carga,setCarga]=useState(false)
    const [listaCarga,setListaCarga]=useState<any[]>([])
    const [selected,setSelected]=useState('')
    const deptos = trpc.departamentos.useQuery()
    useEffect(()=>{
        console.log(listaCarga)
    },[listaCarga])
    if(deptos.isLoading){
        return <div>loading...</div>
    }
    const addDepto=()=>{
        setListaCarga([...listaCarga,selected])
    }
    return (
        <>
            {
            !carga ? (
                <Row>
                    <Row>

                <Alert variant='info' className='my-4'>
                    <strong>Nota: </strong>Seccion departamentos. Si existe declaracion previa, los departamentos seran los mismos que la declaracion anterior.

                </Alert>
                    </Row>
                    <Col xl={10}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Departamento</InputGroup.Text>
                            <Form.Select aria-label="Destino" onChange={(e)=>setSelected(e.target.value)}>
                                <option>Seleccionar...</option>
                                {
                                deptos.data.map((dep:any)=>{
                                    return (
                                        <option key={dep.id} value={dep.nombre}>{dep.nombre} - {dep.provincia}</option>
                                    )
                                })
                            }
                         </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col xl={2} className='text-center'>
                        <Button onClick={()=>addDepto()}>Agregar</Button>
                    </Col>
                    <Row>
                    {
                        listaCarga.map(l=>{
                            return <div>{l}</div>
                        })
                    }
                    </Row>
                    <Row>
                        <Button onClick={()=>setCarga(true)}>Comenzar carga</Button>
                    </Row>
                </Row>)
                : <FormFacturado departamentos={listaCarga}/>
        }
            </>
    )
}

export default ListaDeptos;
