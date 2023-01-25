//import { trpc } from '../utils/trpc'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'

//import Image from 'next/image'
//import { Inter } from '@next/font/google'
//import styles from '../styles/Home.module.css'

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <div className='container my-4'>
                <h3>Pagina publica</h3>
                <div className='row'>
                    <div className='col'>
                        <Link legacyBehavior  href='/auth/signin'>
                            <Card>
                                <Card.Body>Logearse</Card.Body>
                            </Card>
                        </Link>
                    </div>
                    <div className='col'>
                        <Link legacyBehavior  href='/signup'>
                            <Card>
                                <Card.Body>Registrarse</Card.Body>
                            </Card>
                        </Link>
                    </div>
                </div>
                    <div className='my-4'>
                    <p>viz y data</p>
                    </div>

            </div>
            </>
    )
}
