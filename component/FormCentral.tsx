import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const FormCentral=()=>{
    return (
        <>
            <Row>
                <Button size='sm'>Volver a Empresa</Button>
            </Row>
            <label>Datos Basicos Central</label>
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

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Direccion</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Localidad</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Partido</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Sistema</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Destino</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    />
            </InputGroup>
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
