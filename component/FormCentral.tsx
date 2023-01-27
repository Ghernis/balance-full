import { useState,useEffect } from 'react'
import {useSession} from 'next-auth/react'

import { trpc } from '../utils/trpc';
import Link from 'next/link';


import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const FormCentral=(props)=>{
    const {nemo,empresaId} = props
    const central = trpc.central_id.useQuery({empresaId:empresaId,nemo:nemo})
    const [disa ,setDisabled] = useState(true)
    const deptos = trpc.departamentos.useQuery()
    const update_central = trpc.central.useMutation()
    const centralN={
        nombre:'',
        nemo:'',
        direccion:'',
        localidad:'',
        partido:'',
        sistema:'-1',
        destino:'-1',
        actividad:'',
        notas:'',
        departamentoId:-1,
        empresaId:empresaId
    }
    const [cent,setCent] = useState(centralN)
    useEffect(()=>{
        setCent(central.data)
    },[central.status])

    if(deptos.isLoading || central.isLoading){
        return <div>loading...</div>
    }
    const handleGuardar=()=>{
        update_central.mutate(cent)
    }
    return (
        <>
            <label>Datos Basicos Central</label>

            <Link href={('/empresa/'+empresaId) ?? '/'} legacyBehavior passHref>
                <Button size='sm' className='mx-4'>Volver a Empresa</Button>
            </Link>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Nombre Central</InputGroup.Text>
                        <Form.Control
                            value={cent.nombre}
                            onChange={(e)=>setCent({...cent,nombre:e.target.value})}
                            placeholder="Nombre Central"
                            aria-label="nombre"
                            aria-describedby="basic-addon1"
                            disabled={disa}
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Identificador</InputGroup.Text>
                        <Form.Control
                            value={cent.nemo}
                            onChange={(e)=>setCent({...cent,nemo:e.target.value})}
                            placeholder="ID"
                            aria-label="id"
                            aria-describedby="basic-addon2"
                            disabled={ central.data.nemo == '' ? disa : true }
                            />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">Departamento</InputGroup.Text>
                    <Form.Select 
                        value={cent.departamentoId}
                        onChange={(e)=>setCent({...cent,departamentoId:parseInt(e.target.value)})}
                        aria-label="Destino"
                        disabled={disa}
                    >
                        <option value='-1'>Seleccionar...</option>
                        {
                        deptos.data.map((dep:any)=>{
                            return (
                                <option key={dep.id} value={dep.id}>{dep.nombre} - {dep.provincia}</option>

                            )
                        })
                    }
                    </Form.Select>
                </InputGroup>
            </Row>
            <Row>
                <Col>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon4">Direccion</InputGroup.Text>
                        <Form.Control
                            value={cent.direccion}
                            onChange={(e)=>setCent({...cent,direccion:e.target.value})}
                            placeholder="Direccion"
                            aria-label="direccion"
                            aria-describedby="basic-addon4"
                            disabled={disa}
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon5">Localidad</InputGroup.Text>
                        <Form.Control
                            value={cent.localidad}
                            onChange={(e)=>setCent({...cent,localidad:e.target.value})}
                            placeholder="Localidad"
                            aria-label="localidad"
                            aria-describedby="basic-addon5"
                            disabled={disa}
                            />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon6">Destino</InputGroup.Text>
                        <Form.Select 
                            value={cent.destino}
                            onChange={(e)=>setCent({...cent,destino:e.target.value})}
                            aria-label="Destino" 
                            disabled={disa}
                        >
                            <option value="-1">Seleccionar...</option>
                            <option value="VentaUsuarios">Venta Usuarios</option>
                            <option value="Resguardo">Resguardo</option>
                            <option value="ConsumoPropio">Consumo Propio</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon7">Tipo de Sistema</InputGroup.Text>
                        <Form.Select 
                            value={cent.sistema}
                            onChange={(e)=>setCent({...cent,sistema:e.target.value})}
                            aria-label="Sistema" 
                            disabled={disa}
                        >
                            <option value="-1">Seleccionar...</option>
                            <option value="Conectado">Conectado</option>
                            <option value="Aislado">Aislado</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon8">Actividad</InputGroup.Text>
                <Form.Control
                    value={cent.actividad}
                    onChange={(e)=>setCent({...cent,actividad:e.target.value})}
                    placeholder="Actividad"
                    aria-label="actividad"
                    aria-describedby="basic-addon8"
                    disabled={disa}
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon9">Notas</InputGroup.Text>
                <Form.Control
                    value={cent.notas}
                    onChange={(e)=>setCent({...cent,notas:e.target.value})}
                    placeholder="Notas"
                    aria-label="notas"
                    aria-describedby="basic-addon9"
                    disabled={disa}
                    />
            </InputGroup>
            <Row>
                <Col>
                    <Button size='sm' variant='secondary' onClick={()=>setDisabled(!disa)}>Modificar</Button>
                </Col>
                <Col>
                    <Button size='sm' onClick={handleGuardar}>Guardar Cambios</Button>
                </Col>
            </Row>
            </>
    )
}

export default FormCentral;
