import { useState } from 'react'

import { trpc } from '../utils/trpc';
import Link from 'next/link';

import {useSession} from 'next-auth/react'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const FormCentral=(props)=>{
    const {nemo} = props
    const {status,data} = useSession()
    const [disa ,setDisabled] = useState(true)
    const deptos = trpc.departamentos.useQuery()
    const central = trpc.central_id.useQuery({empresaId:data?.user?.name as string,nemo:nemo})
    if(deptos.isLoading || central.isLoading){
        return <div>loading...</div>
    }
    console.log(central.data)
    console.log(data?.user?.name)
    return (
        <>
            <label>Datos Basicos Central</label>

            <Link href={('/empresa/'+data?.user?.name) ?? '/'} legacyBehavior passHref>
                <Button size='sm' className='mx-4'>Volver a Empresa</Button>
            </Link>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Razon Social</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled={disa}
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Identificador</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled
                            />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Departamento</InputGroup.Text>
                    <Form.Select aria-label="Destino" disabled={disa}>
                        <option>Seleccionar...</option>
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
                        <InputGroup.Text id="basic-addon1">Direccion</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled={disa}
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Localidad</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled={disa}
                            />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Destino</InputGroup.Text>
                        <Form.Select aria-label="Destino" disabled={disa}>
                            <option>Seleccionar...</option>
                            <option value="1">VentaUsuarios</option>
                            <option value="2">Resguardo</option>
                            <option value="3">ConsumoPropio</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Tipo de Sistema</InputGroup.Text>
                        <Form.Select aria-label="Sistema" disabled={disa}>
                            <option>Seleccionar...</option>
                            <option value="1">Conectado</option>
                            <option value="2">Aislado</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Actividad</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled={disa}
                    />
            </InputGroup>
            <Row>
                <Col>
                    <Button size='sm' variant='secondary' onClick={()=>setDisabled(!disa)}>Modificar</Button>
                </Col>
                <Col>
                    <Button size='sm'>Guardar Cambios</Button>
                </Col>
            </Row>
            </>
    )
}

export default FormCentral;
