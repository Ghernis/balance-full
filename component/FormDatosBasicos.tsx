import {useState,useEffect} from 'react';
import { trpc } from '../utils/trpc';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import {EmpresaType} from '../models/empresa.model';

const FormDatosBasicos=(props)=>{
    //const {empresa} = props
    const empresaInit= props.empresa.resp
    const [disabled,setDisabled] = useState(true)
    const [empresa,setEmpresa]=useState(empresaInit)
    const [nombre,setNombre] = useState(empresaInit.nombre)
    const deptos = trpc.departamentos.useQuery()
    const put_emp= trpc.put_empresas.useMutation()

    useEffect(()=>{
        empresa.nombre=nombre
        empresa.tipo='Distribuidora'
        setEmpresa(empresa)
        //put_emp.mutate(empresa)

    },[nombre])

    if(!deptos.data){
        return <div>loading...</div>
    }
    const cambio=(name)=>{
        console.log(empresa)
    }
    return (
        <>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Razon Social</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=>setNombre(e.target.value)}
                            value={nombre}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled={disabled}
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Identificador</InputGroup.Text>
                        <Form.Control
                            onChange={cambio}
                            value={empresa.nombreId}
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
                        <InputGroup.Text id="basic-addon1">Direccion</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled={disabled}
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
                            value='texto'
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled={disabled}
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
                            disabled={disabled}
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
                            disabled={disabled}
                            />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Tipo de Sistema</InputGroup.Text>
                        <Form.Select aria-label="Destino" disabled={disabled}>
                            <option>Seleccionar...</option>
                            <option value="1">Conectado</option>
                            <option value="2">Aislado</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Destino</InputGroup.Text>
                        <Form.Select aria-label="Destino" disabled={disabled}>
                            <option>Seleccionar...</option>
                            <option value="1">VentaUsuarios</option>
                            <option value="2">Resguardo</option>
                            <option value="3">ConsumoPropio</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>
                <Row>
                <Col>
                <Button className='my-4' onClick={()=>setDisabled(!disabled)}>Actualizar</Button>
                </Col>
                    {
                !disabled &&
                <Col className='text-end'>
                <Button className='my-4 btn btn-success' onClick={()=>setDisabled(!disabled)}>Guardar cambios</Button>
                </Col>
            }
                </Row>
            </>
    )
}

export default FormDatosBasicos;
