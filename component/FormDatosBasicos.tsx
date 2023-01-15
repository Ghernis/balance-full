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
    const empresaInit= props.empresa
    const [disabled,setDisabled] = useState(true)
    const [empresa,setEmpresa]=useState(empresaInit)
    const [nombre,setNombre] = useState(empresaInit.nombre)
    const [direccion,setDireccion] = useState(empresaInit.direccion)
    const [cp,setCp] = useState(empresaInit.cp)
    const [tel,setTel] = useState(empresaInit.tel)
    const [mail,setMail] = useState(empresaInit.mail)
    const [contacto,setContacto] = useState(empresaInit.contacto)
    const [sistema,setSistema] = useState(empresaInit.sistema)
    const [destino,setDestino] = useState(empresaInit.destino)
    const deptos = trpc.departamentos.useQuery()
    const put_emp= trpc.put_empresas.useMutation()

    useEffect(()=>{
        const empresaU={
            nombreId:empresa.nombreId,
            nombre,
            direccion,
            cp,
            tel,
            mail,
            contacto,
            sistema:'Conectado',
            destino:'Resguardo',
            tipo:'Distribuidora',

        }
        setEmpresa(empresaU)
        //put_emp.mutate(empresa)

    },[nombre,direccion,cp,tel,mail,contacto,sistema,destino])

    if(!deptos.data){
        return <div>loading...</div>
    }
    const cambio=(name)=>{
        //console.log(empresa)
    }
    const saveChanges=()=>{
        put_emp.mutate(empresa)
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
                            onChange={(e)=>setDireccion(e.target.value)}
                            value={direccion}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled={disabled}
                            />
                    </InputGroup>
                </Col>
                    <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">CP</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=>setCp(e.target.value)}
                            value={cp}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled={disabled}
                            />
                    </InputGroup>
                    </Col>
                </Row>
                <Row>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Departamento</InputGroup.Text>
                        <Form.Select aria-label="Destino" disabled={disabled}>
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
                        <InputGroup.Text id="basic-addon1">Tel</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=>setTel(e.target.value)}
                            value={tel}
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
                            value={mail}
                            onChange={(e)=>setMail(e.target.value)}
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
                            onChange={(e)=>setContacto(e.target.value)}
                            value={contacto}
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
                            <option value="Conectado">Conectado</option>
                            <option value="Aislado">Aislado</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Destino</InputGroup.Text>
                        <Form.Select aria-label="Destino" disabled={disabled}>
                            <option>Seleccionar...</option>
                            <option value="VentaUsuarios">VentaUsuarios</option>
                            <option value="Resguardo">Resguardo</option>
                            <option value="ConsumoPropio">ConsumoPropio</option>
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
                <Button className='my-4 btn btn-success' onClick={saveChanges}>Guardar cambios</Button>
                </Col>
            }
                </Row>
            </>
    )
}

export default FormDatosBasicos;
