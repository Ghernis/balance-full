import { FormEventHandler, useState } from 'react'
import { NextPage } from 'next';
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const SignIn: NextPage = (props):JSX.Element =>{
    const router = useRouter();
    const [userInfo,setUserInfo] = useState({nombre:'',password:''})
    const callbackUrl = (router.query?.callbackUrl as string) ?? '/empresa/'+userInfo.nombre;
    const handleSubmit=async(e)=>{
        //validations
        e.preventDefault()
        const res = await signIn('credentials',{
            nombre:userInfo.nombre,
            password:userInfo.password,
            redirect: false
        })
        if(res?.error){
            console.log(res.error)
        }
        else{
            router.push(callbackUrl)
        }


    }
    return (
        <div className='container my-4'>
            <div className="row m-b-2">
                <div className="col-md-6 col-md-offset-3">
                    <h4 className="activities-sidbar">Ingresá a la plataforma NombreADefinir</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <form method="post">
                        <div className="row">
                            <div className="col-md-10 form-group item-form">
                                <label>Usuario</label>
                                <Form.Control type="text" name="user" className="form-control" id="usuario" aria-required="true"
                                    value={userInfo.nombre}
                                    onChange={({target})=> setUserInfo({...userInfo,nombre:target.value}) }

                                        />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 form-group item-form">
                                <label >Contraseña</label>
                                <Form.Control id="password" type="password" className="form-control" name="password"
                    value={userInfo.password}
                    onChange={({target})=> setUserInfo({...userInfo,password:target.value}) }
                                        />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <Button className="btn btn-success"
                                        onClick={handleSubmit}
                                    >INGRESAR</Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-10">
                                <hr />
                            </div>
                        </div>

                    </form>

                    <div className="row">
                        <div className="col-xs-12">

                            <p><a href="#">Recuperar mi contraseña</a></p>
                    <Link href='/signup' legacyBehavior passHref>
                            <p><a href='/signup' >Crear una nueva cuenta para ingresar</a></p>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>



        </div>

    )
};

export default SignIn
