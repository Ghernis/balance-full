import { FormEventHandler, useState } from 'react'
import { NextPage } from 'next';
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';

interface Props {}

const SignIn: NextPage = (props):JSX.Element =>{
    const router = useRouter();
    const [userInfo,setUserInfo] = useState({nombre:'',password:''})
    const callbackUrl = (router.query?.callbackUrl as string) ?? '/empresa/'+userInfo.nombre;
    const handleSubmit:FormEventHandler<HTMLFormElement>=async(e)=>{
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
    <div className='sign-in-form'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='test@email.com' value={userInfo.nombre}
                    onChange={({target})=>
                    setUserInfo({...userInfo,nombre:target.value})
                }
                    />
                <input type='password' placeholder='****' value={userInfo.password}
                    onChange={({target})=>
                    setUserInfo({...userInfo,password:target.value})
                }
                    />
                <input type='submit' value='Login' />
            </form>
                <Link href='/signup' legacyBehavior>
            <Button variant='primary'>Registrarse</Button>
            </Link>

    </div>
    )
};

export default SignIn
