import React, {useState} from 'react'
import Link from 'next/link';
import {useSession} from 'next-auth/react'

import ListaDeptos from './ListaDeptos';
import Intercambio from './Intercambio';
import Balance from './Balance';
import CentralVariable from './CentralVariable';

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Button from 'react-bootstrap/Button'

const Variable=()=>{
    const {status,data} = useSession()
    const [key,setKey] = useState('facturado')
    return (
        <>
            <div className='container'>
                <Link href={('/empresa/'+data?.user?.name) ?? '/'} legacyBehavior>
                    <Button size='sm' className='my-3'>Volver atras</Button>
                </Link>
                <h3>Declaracion Variable</h3>
                {/*
                <h4>Periodo: {fecha.mes + ' - '+ fecha.anio}</h4>
                        */}
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k:string) => setKey(k)}
                    className="my-4"
                    fill
                >
                    <Tab eventKey="facturado" title="Facturado">
                        <ListaDeptos />
                    </Tab>
                    <Tab eventKey="intercambio" title="Intercambio">
                        <Intercambio />
                    </Tab>
                    <Tab eventKey="centrales" title="Centrales">
                        <CentralVariable />
                    </Tab>
                    <Tab eventKey="balance" title="Balance">
                        <Balance />
                    </Tab>
                </Tabs>
            </div>
            </>
    )
}

export default Variable;
