import { trpc } from '../utils/trpc'
import { useState,useEffect } from 'react'

import FormFacturado from './FormFacturado';
import ItemClose from './ItemClose';

import Alert from 'react-bootstrap/Alert'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListaDeptos=()=>{
    const [checked,setChecked]=useState(true)
    const [carga,setCarga]=useState(false)
    const [listaCarga,setListaCarga]=useState<any[]>([])
    const [selected,setSelected]=useState({
        provincia:'',
        departamento:''
    })
    const deptos = trpc.departamentos.useQuery()
    //useEffect(()=>{
    //    console.log(listaCarga)
    //},[listaCarga])
    if(deptos.isLoading){
        return <div>loading...</div>
    }
    const addDepto=()=>{
        setListaCarga([...listaCarga,selected])
    }
    const addLista=(e)=>{
        const res = deptos.data.filter(d=>{
            return d.nombre==e.target.value
        })
        if(res.length>0){
            const aux = {
                departamento:res[0].nombre,
                provincia:res[0].provincia
            }
            setSelected(aux)
        }

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
                            <Form>
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label={checked ? "Sumatoria" : "Por departamento"}
                                    checked={checked}
                                    onChange={(e)=>setChecked(e.currentTarget.checked)}
                                />
                                <label>Si se marca 'sumatoria' los datos se cargaran en el departamento de la empresa</label>
                            </Form>
                        </Row>
                        <Col xl={10}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Departamento</InputGroup.Text>
                                <Form.Select aria-label="Destino" onChange={addLista}>
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
                            <Button 
                                onClick={()=>addDepto()}
                                disabled={checked}
                            >Agregar</Button>
                        </Col>
                        <Row className='my-4'>
                            <ItemClose lista={listaCarga} seter={setListaCarga}/>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={()=>setCarga(true)}>Comenzar carga</Button>
                            </Col>
                        </Row>
                    </Row>)
                    : <FormFacturado departamentos={listaCarga}/>
            }
        </>
    )
}

export default ListaDeptos;
