import { FormEventHandler, useState } from 'react'
import { NextPage } from 'next';
import { signIn } from 'next-auth/react'

interface Props {}

const SignIn: NextPage = (props):JSX.Element =>{
    const [userInfo,setUserInfo] = useState({email:'',password:''})
    const handleSubmit:FormEventHandler<HTMLFormElement>=async(e)=>{
        //validations
        e.preventDefault()
        const res = await signIn('credentials',{
            email:userInfo.email,
            password:userInfo.password,
            redirect: false
        })
        console.log(res)
    }
    return (
    <div className='sign-in-form'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='test@email.com' value={userInfo.email}
                    onChange={({target})=>
                    setUserInfo({...userInfo,email:target.value})
                }
                    />
                <input type='password' placeholder='****' value={userInfo.password}
                    onChange={({target})=>
                    setUserInfo({...userInfo,password:target.value})
                }
                    />
                <input type='submit' value='Login' />
            </form>

    </div>
    )
};

export default SignIn
