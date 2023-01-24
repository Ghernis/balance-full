import { useState,useEffect } from 'react'

import { trpc } from '../utils/trpc';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const SignUp=()=>{
    const users = trpc.new_user.useMutation()
    const [user, setUser]=useState({
        nombre:'',
        contacto:'',
        tel:'',
        mail:''
    })

    //useEffect(()=>{
    //    console.log(user)
    //},[user])

    const onRegister=()=>{
        users.mutate(user)
    }
    return (
        <div className='container'>

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
            </Row>
            <Button size='sm' onClick={onRegister}>Registrarse</Button>
        </div>
    )
}

export default SignUp;
