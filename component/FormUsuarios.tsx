import { useState,useEffect } from 'react'

import { trpc } from '../utils/trpc';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import {toast} from 'react-toastify'

const FormUsuarios=(props)=>{
    const utils = trpc.useContext()
    const {empresa} = props
    const updateUser = trpc.update_usuario.useMutation({
        onSuccess(){
            utils.usuario.invalidate({id:empresa.id})
        }
    })
    const altaEmpresa = trpc.alta_empresa.useMutation()

    const [usuario,setUsuario]=useState(empresa)

    useEffect(()=>{
        if(updateUser.isError){
            const errorObj=updateUser.error
            const errorMes=errorObj.message
            //console.log(errorMes)
            toast.error(errorMes,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if(updateUser.isSuccess){
            toast.success('Se actualizo la informacion',{
                position: toast.POSITION.TOP_RIGHT
            })
        }

    },[updateUser.status])

    const toggleBools=(val:Boolean)=>{
        return !val
    }
    const handleClick=()=>{
        updateUser.mutate(usuario)
        console.log(empresa)
    }
    const crearEmpresa=()=>{

        console.log('alta')
        //crea nueva empresa si no existe, no tendria que sobreestcribir nada por si la empresa ya cambio los datos
        altaEmpresa.mutate(usuario)
    }
    return (
        <div className='container'>
            <Row className='my-4'>
                <label>Identificador unico. Una vez asignado no puede cambiarse por ser clave primaria</label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
                    <Form.Control
                        value={usuario.nombreId==null ? '' : usuario.nombreId}
                        onChange={(e)=>setUsuario({...usuario,nombreId:e.target.value})}
                        placeholder="ID"
                        aria-label="nombre"
                        aria-describedby="basic-addon1"
                        disabled={empresa.nombreId != null}
                        />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                    <Form.Control
                        value={usuario.password==null ? '' : usuario.password}
                        onChange={(e)=>setUsuario({...usuario,password:e.target.value})}
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        />
                </InputGroup>
                <label>Datos de Contacto</label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
                    <Form.Control
                        value={usuario.nombre}
                        onChange={(e)=>setUsuario({...usuario,nombre:e.target.value})}
                        placeholder="Nombre"
                        aria-label="nombre"
                        aria-describedby="basic-addon1"
                        />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Mail</InputGroup.Text>
                    <Form.Control
                        value={usuario.mail}
                        onChange={(e)=>setUsuario({...usuario,mail:e.target.value})}
                        placeholder="Mail"
                        aria-label="nombre"
                        aria-describedby="basic-addon1"
                        />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Contacto</InputGroup.Text>
                    <Form.Control
                        value={usuario.contacto}
                        onChange={(e)=>setUsuario({...usuario,contacto:e.target.value})}
                        placeholder="Contacto"
                        aria-label="nombre"
                        aria-describedby="basic-addon1"
                        />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Telefono</InputGroup.Text>
                    <Form.Control
                        value={usuario.tel}
                        onChange={(e)=>setUsuario({...usuario,tel:e.target.value})}
                        placeholder="Telefono"
                        aria-label="nombre"
                        aria-describedby="basic-addon1"
                        />
                </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Tipo de empresa</InputGroup.Text>
                        <Form.Select aria-label="Destino"
                        value={usuario.tipo ?? 'select'}
                        onChange={(e)=>setUsuario({...usuario,tipo:e.target.value})}
                    >
                            <option value='select'>Seleccionar...</option>
                            <option value="Distribuidora">Distribuidora</option>
                            <option value="Cooperativa">Cooperativa</option>
                            <option value="Autoproductor">Autoproductor</option>
                        </Form.Select>
                    </InputGroup>
            <Button onClick={()=>handleClick()}>Guardar Cambios a Usuario</Button>
                <Form.Check 
                    type='checkbox'
                    label='Informacion entregada'
                    checked={empresa.informacion}
                    onChange={()=>updateUser.mutate({...empresa,informacion:toggleBools(empresa.informacion)})}
                    />
                <Form.Check 
                    type='checkbox'
                    label='Verificado'
                    checked={empresa.verificada}
                    onChange={()=>updateUser.mutate({...empresa,verificada:toggleBools(empresa.verificada)})}
                    />
                <Form.Check 
                    type='checkbox'
                    label='Habilitar para carga'
                    checked={empresa.habilitado}
                    onChange={()=>updateUser.mutate({...empresa,habilitado:toggleBools(empresa.habilitado)})}
                    />
            </Row>
            <Button 
                disabled={!empresa.verificada}
                onClick={()=>crearEmpresa()}
            >Dar de alta Empresa</Button>
        </div>
    )
}
export default FormUsuarios;
