import { useState,useEffect } from 'react'

import { useRouter } from 'next/router'

import { trpc } from '../utils/trpc';

import {toast} from 'react-toastify'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

type tipo = 'Distribuidora' | 'Cooperativa' | 'Autoproductor'
type role = 'USER' | 'ADMIN' | 'MOD'

type Usuario={
    nombre: string,
    mail:string,
    tipo: tipo,
    contacto:string,
    tel:string,
}

const SignUp=()=>{

    const router = useRouter()
    const users = trpc.new_user.useMutation()
    const init: Usuario ={
        nombre:'',
        contacto:'',
        tel:'',
        mail:'',
        tipo: 'Distribuidora'
    }
    const [user, setUser]=useState(init)

    useEffect(()=>{
        if(users.isError){
            const errorObj=JSON.parse(users.error.message)[0]
            const errorMes=errorObj.message+' en campo: '+errorObj.path
            //console.log(errorMes)
            toast.error(errorMes,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if(users.isSuccess){
            toast.success('Se genero un pedido de alta. A la brevedad se comunicaran con usted',{
                position: toast.POSITION.TOP_RIGHT
            })
            //router.push('/')
        }
    },[users.status])

    const onRegister=()=>{
        if(user.nombre=='' || user.contacto=='' || user.tel=='' || user.mail==''){
            toast.error('El formulario no esta completo',{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        else{
            users.mutate(user)
        }
    }
    return (
        <div className='container'>
            <h3 className='my-4'>Solicitud de alta para el Sistema</h3>

            <Row className='mt-4'>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Razon Social</InputGroup.Text>
                    <Form.Control
                        value={user.nombre}
                        onChange={(e)=>setUser({...user,nombre:e.target.value})}
                        placeholder="Razon Social"
                        aria-label="nombre"
                        aria-describedby="basic-addon1"
                        />
                </InputGroup>
            </Row>
            <Row>
                <label>Informacion de Contacto</label>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2">Contacto</InputGroup.Text>
                    <Form.Control
                        value={user.contacto}
                        onChange={(e)=>setUser({...user,contacto:e.target.value})}
                        placeholder="Contacto"
                        aria-label="contacto"
                        aria-describedby="basic-addon2"
                        />
                </InputGroup>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">Telefono</InputGroup.Text>
                        <Form.Control
                            value={user.tel}
                            onChange={(e)=>setUser({...user,tel:e.target.value})}
                            placeholder="Telefono"
                            aria-label="telefono"
                            aria-describedby="basic-addon3"
                            />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon4">Mail</InputGroup.Text>
                        <Form.Control
                            value={user.mail}
                            onChange={(e)=>setUser({...user,mail:e.target.value})}
                            placeholder="Mail"
                            aria-label="mail"
                            type='mail'
                            aria-describedby="basic-addon4"
                            />
                    </InputGroup>
                </Col>
                
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Tipo de empresa</InputGroup.Text>
                        <Form.Select aria-label="Destino"
                        value={user.tipo ?? 'Distribuidora'}
                        onChange={(e)=>setUser({...user,tipo:e.target.value as tipo})}
                    >
                            <option value="Distribuidora">Distribuidora</option>
                            <option value="Cooperativa">Cooperativa</option>
                            <option value="Autoproductor">Autoproductor</option>
                        </Form.Select>
                    </InputGroup>
            </Row>
            <Button size='sm' onClick={onRegister}>Registrarse</Button>
            <Row>
                <p>A la brevedad se comunicaran con usted con su usuario y contrasena para poder logearse al sistema</p>
            </Row>
        </div>
    )
}

export default SignUp;
