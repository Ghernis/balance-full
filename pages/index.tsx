import { trpc } from '../utils/trpc'
import Head from 'next/head'
//import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const hello = trpc.hello.useQuery({text:'her'});
    if(!hello.data){
        return <div>loading</div>
    }
    return (
        <>
            <Head>
                <title>Sistema Balance</title>
                <meta name="description" content="Hernan Gomez" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                {hello.data.greeting}
            </div>
        </>
    )
}
