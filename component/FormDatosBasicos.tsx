import {useState,useEffect} from 'react';
import { trpc } from '../utils/trpc';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify'

//import {EmpresaType} from '../models/empresa.model';

const FormDatosBasicos=(props)=>{
    //const {empresa} = props

    const empresaInit= props.empresa
    const [disabled,setDisabled] = useState(true)
    const [empresa,setEmpresa]=useState(empresaInit)
    const deptos = trpc.departamentos.useQuery()
    const put_emp= trpc.put_empresas.useMutation()

    useEffect(()=>{
        if(put_emp.isError){
            const errorObj=JSON.parse(put_emp.error.message)[0]
            const errorMes=errorObj.message+' en campo: '+errorObj.path
            //console.log(errorMes)
            toast.error(errorMes,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if(put_emp.isSuccess){
            toast.success('Se actualizo la informacion',{
                position: toast.POSITION.TOP_RIGHT
            })
        }
    },[put_emp.status])

    if(deptos.isLoading){
        return <div>loading...</div>
    }
    const testalerta=()=>{
        toast.error('wow dogi',{
            position: toast.POSITION.TOP_RIGHT
        })


    }
    const saveChanges=()=>{
        if(empresa.direccion==null || empresa.cp==null || empresa.tipo==null || empresa.destino==null || empresa.tipo==null || empresa.sistema==null || empresa.departamentoId ==null){
            console.log(empresa)
        toast.error('Formulario incompleto',{
            position: toast.POSITION.TOP_RIGHT
        })
        }
        else{
            console.log('update')
            put_emp.mutate(empresa)
        }
    }
    return (
        <>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Razon Social</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=>setEmpresa({...empresa,nombre:e.target.value})}
                            value={empresa.nombre==null ? '' : empresa.nombre}
                            placeholder="Razon Social"
                            aria-label="nombre"
                            aria-describedby="basic-addon1"
                            disabled={disabled}
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Identificador</InputGroup.Text>
                        <Form.Control
                            value={empresa.nombreId==null ? '' : empresa.nombreId}
                            placeholder="ID"
                            aria-label="id"
                            aria-describedby="basic-addon2"
                            disabled
                            />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">Direccion</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=>setEmpresa({...empresa,direccion:e.target.value})}
                            value={empresa.direccion==null ? '' : empresa.direccion}
                            placeholder="Direccion"
                            aria-label="direccion"
                            aria-describedby="basic-addon3"
                            disabled={disabled}
                            />
                    </InputGroup>
                </Col>
                    <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon4">CP</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=>setEmpresa({...empresa,cp:e.target.value})}
                            value={empresa.cp==null ? '' : empresa.cp}
                            placeholder="CP"
                            aria-label="cp"
                            aria-describedby="basic-addon4"
                            disabled={disabled}
                            />
                    </InputGroup>
                    </Col>
                </Row>
                <Row>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon5">Departamento</InputGroup.Text>
                        <Form.Select aria-label="Departamento"
                        value={empresa.departamentoId==null ? '' : empresa.departamentoId ?? 'val'}
                        onChange={(e)=>setEmpresa({...empresa,departamentoId:parseInt(e.target.value)})}
                        disabled={disabled}>
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
                        <InputGroup.Text id="basic-addon6">Tel</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=>setEmpresa({...empresa,tel:e.target.value})}
                            value={empresa.tel==null ? '' : empresa.tel}
                            placeholder="Telefono"
                            aria-label="tel"
                            aria-describedby="basic-addon6"
                            disabled={disabled}
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-7">
                        <InputGroup.Text id="basic-addon7">Mail</InputGroup.Text>
                        <Form.Control
                            value={empresa.mail==null ? '' : empresa.mail}
                            onChange={(e)=>setEmpresa({...empresa,mail:e.target.value})}
                            placeholder="Mail"
                            aria-label="mail"
                            aria-describedby="basic-addon7"
                            disabled={disabled}
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon8">Contacto</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=>setEmpresa({...empresa,contacto:e.target.value})}
                            value={empresa.contacto==null ? '' : empresa.contacto}
                            placeholder="Contacto"
                            aria-label="contacto"
                            aria-describedby="basic-addon8"
                            disabled={disabled}
                            />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Tipo de Sistema</InputGroup.Text>
                        <Form.Select aria-label="Destino"
                            disabled={disabled}
                            value={empresa.sistema==null ? '' : empresa.sistema}
                            onChange={(e)=>setEmpresa({...empresa,sistema:e.target.value})}
                        >
                            <option>Seleccionar...</option>
                            <option value="Conectado">Conectado</option>
                            <option value="Aislado">Aislado</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Destino</InputGroup.Text>
                        <Form.Select aria-label="Destino"
                            disabled={disabled}
                            value={empresa.destino==null ? '' : empresa.destino}
                            onChange={(e)=>setEmpresa({...empresa,destino:e.target.value})}
                        >
                            <option>Seleccionar...</option>
                            <option value="VentaUsuarios">Venta Usuarios</option>
                            <option value="Resguardo">Resguardo</option>
                            <option value="ConsumoPropio">Consumo Propio</option>
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
                <Button className='my-4 btn btn-success' onClick={testalerta}>alerta</Button>
                </Col>
            }
                </Row>
            </>
    )
}

export default FormDatosBasicos;
