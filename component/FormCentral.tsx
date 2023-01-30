import { useState,useEffect } from 'react'
import Link from 'next/link';

import { trpc } from '../utils/trpc';

import {toast} from 'react-toastify'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const FormCentral=(props)=>{
    const utils = trpc.useContext()
    const {central} = props
    const [disa ,setDisabled] = useState(true)
    const [cent,setCent] = useState(central)

    const [showA,setShowA] = useState(false)

    const nemos = trpc.list_nemos_central.useQuery({empresaId:central.empresaId})
    const deptos = trpc.departamentos.useQuery()
    const update_central = trpc.central.useMutation({
        onSuccess(){
            utils.central_id.invalidate({empresaId:central.empresaId,nemo:central.nemo})
        }
    })

    const toggleShowA = () => setShowA(!showA);
    const handleGuardar=()=>{
        if(cent.nombre==null || cent.departamentoId==null){
            toast.error('Formulario incompleto',{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        else{
            if(central.new){
                //console.log('check nemo')
                //if(central.nemo in nemos) console.log('repe')
                if (nemos.data.centrales.filter(e => e.nemo == cent.nemo).length > 0) {
                    toast.error('Ya existe una central con ese identificador unico.',{
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
                else{
                    update_central.mutate(cent)
                    toggleShowA()

                }
            }
            else{
                update_central.mutate(cent)
                toggleShowA()
            }
        }
    }

    useEffect(()=>{
        if(update_central.isError){
            const errorObj=JSON.parse(update_central.error.message)[0]
            const errorMes=errorObj.message+' en campo: '+errorObj.path
            //console.log(errorMes)
            toast.error(errorMes,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if(update_central.isSuccess){
            toast.success('Se actualizo la informacion',{
                position: toast.POSITION.TOP_RIGHT
            })
            setDisabled(!disa)
        }
        //setEmpresa(props.empresa)
    },[update_central.status])

    if(!deptos.data || !nemos.data){
        return <div>loading...</div>
    }
    return (
        <>
            <label>Datos Basicos Central</label>

            <Link href={('/empresa/'+central.empresaId) ?? '/'} legacyBehavior passHref>
                <Button size='sm' className='mx-4'>Volver a Empresa</Button>
            </Link>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Nombre Central</InputGroup.Text>
                        <Form.Control
                            value={cent.nombre==null ? '' : cent.nombre}
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
                            value={cent.nemo==null ? '' : cent.nemo}
                            onChange={(e)=>setCent({...cent,nemo:e.target.value})}
                            placeholder="ID"
                            aria-label="id"
                            aria-describedby="basic-addon2"
                            disabled={ central.nemo == '' ? disa : true }
                            />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">Departamento</InputGroup.Text>
                    <Form.Select
                        value={cent.departamentoId==null ? '-1' : cent.departamentoId}
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
                            value={cent.direccion==null ? '' : cent.direccion}
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
                            value={cent.localidad == null ? '' : cent.localidad}
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
                            value={cent.destino==null ? '-1' : cent.destino}
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
                            value={cent.sistema== null ? '-1' : cent.sistema}
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
                    value={cent.actividad == null ? '' : cent.actividad}
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
                    value={cent.notas == null ? '' : cent.notas}
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
