import { trpc } from '../utils/trpc';
import Link from 'next/link';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const FormCentral=()=>{
    const deptos = trpc.departamentos.useQuery()
    if(!deptos.data){
        return <div>loading...</div>
    }
    return (
        <>
            <label>Datos Basicos Central</label>

        <Link href='/' legacyBehavior passHref>
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
                    <Form.Select aria-label="Destino">
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
                            disabled
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
                            disabled
                            />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Destino</InputGroup.Text>
                        <Form.Select aria-label="Destino">
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
                        <Form.Select aria-label="Sistema">
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
                    disabled
                    />
            </InputGroup>
            </>
    )
}

export default FormCentral;
