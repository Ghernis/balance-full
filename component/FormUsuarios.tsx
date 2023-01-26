import { useState } from 'react'

import { trpc } from '../utils/trpc';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const FormUsuarios=(props)=>{
    const {empresa} = props
    const updateUser = trpc.update_usuario.useMutation()
    const altaEmpresa = trpc.alta_empresa.useMutation()


    const [usuario,setUsuario]=useState(empresa)

    const toggleBools=(val:Boolean)=>{
        return !val
    }
    const handleClick=()=>{
        updateUser.mutate(usuario)
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
                <Form.Check 
                    type='checkbox'
                    label='Informacion entregada'
                    checked={usuario.informacion}
                    onChange={()=>setUsuario({...usuario,informacion:toggleBools(usuario.informacion)})}
                    />
                <Form.Check 
                    type='checkbox'
                    label='Verificado'
                    checked={usuario.verificada}
                    onChange={()=>setUsuario({...usuario,verificada:toggleBools(usuario.verificada)})}
                    />
                <Form.Check 
                    type='checkbox'
                    label='Habilitar para carga'
                    checked={usuario.habilitado}
                    onChange={()=>setUsuario({...usuario,habilitado:toggleBools(usuario.habilitado)})}
                    />
            </Row>
            <Button onClick={()=>handleClick()}>Guardar Cambios a Usuario</Button>
            <Button 
                disabled={!usuario.verificada}
                onClick={()=>crearEmpresa()}
            >Dar de alta Empresa</Button>
        </div>
    )
}
export default FormUsuarios;