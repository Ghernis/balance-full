import React, {useState} from 'react'
import Link from 'next/link';

import ListaDeptos from './ListaDeptos';

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Button from 'react-bootstrap/Button'

const Variable=()=>{
    const [key,setKey] = useState('facturado')
    return (
        <>
            <div className='container'>
                <Link href='/' legacyBehavior>
                    <Button size='sm' className='my-3'>Volver atras</Button>
                </Link>
                <h3>Declaracion Variable</h3>
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
                        <div>intercambio</div>
                    </Tab>
                    <Tab eventKey="centrales" title="Centrales">
                        <div>centrales</div>
                    </Tab>
                    <Tab eventKey="balance" title="Balance">
                        <div>Balance</div>
                    </Tab>
                </Tabs>
            </div>
            </>
    )
}

export default Variable;
