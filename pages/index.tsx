//import { trpc } from '../utils/trpc'
import Empresa from '../component/Empresa'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

//import Image from 'next/image'
//import { Inter } from '@next/font/google'
//import styles from '../styles/Home.module.css'

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <div className='container'>
                <h3>Pagina publica</h3>
                <p>logearse como: </p>
                <p>usuario:distri2 password:123</p>
                <Link legacyBehavior  href='/auth/signin'>
                <Button>Ir a SignIn</Button>
                </Link>

            </div>
        </>
    )
}
