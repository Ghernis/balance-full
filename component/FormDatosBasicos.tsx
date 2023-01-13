import { trpc } from '../utils/trpc'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

const FormDatosBasicos=()=>{
    const deptos = trpc.departamentos.useQuery()
    if(!deptos.data){
        return <div>loading...</div>
    }
    return (
        <>
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
                        <InputGroup.Text id="basic-addon1">Nemo CAMMESA</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Direccion</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                    </InputGroup>
                </Col>
                <Col>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Departamento</InputGroup.Text>
                        <Form.Select aria-label="Destino">
                            <option>Seleccionar...</option>
                            {
                            deptos.data.resp.map(dep=>{
                                return (
                                    <option key={dep.id} value={dep.id}>{dep.nombre} - {dep.provincia}</option>

                                )
                            })
                            }
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Tel</InputGroup.Text>
                        <Form.Control
                            disabled
                            value='texto'
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Mail</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Contacto</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Tipo de Sistema</InputGroup.Text>
                        <Form.Select aria-label="Destino">
                            <option>Seleccionar...</option>
                            <option value="1">Conectado</option>
                            <option value="2">Aislado</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
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
            </Row>
            </>
    )
}

export default FormDatosBasicos;
