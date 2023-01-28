import { useState, useEffect } from 'react'
import { trpc } from '../utils/trpc'
import Link from 'next/link'

import CartaLista from '../component/CartaList'
import FormDatosBasicos from '../component/FormDatosBasicos'
import Cuadro from '../component/Cuadro';

import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Empresa =(props:any)=>{
    const {nombreId} = props

    const deptos = trpc.departamentos.useQuery()
    const empresa = trpc.empresa_id.useQuery({nombreId:nombreId})
    //const [empresa_id,setEmpresa] = useState(empresa.data)

    //useEffect(()=>{

    //    setEmpresa(empresa.data)
    //    console.log(empresa_id)

    //},[empresa.isFetched])

    const headers=[
        {
            label:'',
            attr:'tipo'
        },
        {
            label:'Profesionales',
            attr:'prof'
        },
        {
            label:'Obreros',
            attr:'obreros'
        },
        {
            label:'Administrativos',
            attr:'admin'
        },
        {
            label:'Tecnicos',
            attr:'tec'
        },
    ]
    const datao=[
        {
            tipo:'Hombres',
            prof:10,
            obreros:20,
            admin:30,
            tec:40
        },
        {
            tipo:'Mujeres',
            prof:20,
            obreros:30,
            admin:40,
            tec:10
        },
        {
            tipo:'Total',
            prof:30,
            obreros:50,
            admin:70,
            tec:50
        },
    ]
    //const mutation = trpc.departamento_bulk.useMutation()
    //useEffect(()=>{
    //    trpc.empresa_id.useQuery({nombreId:empresa_id})
    //},[empresa_id])
    if(empresa.isLoading || deptos.isLoading){
        return <div>loading</div>
    }
    if(!empresa.data || empresa.data==undefined) return <div>loading...</div>

    return (
        <div>
            <div className='container my-4'>
                <Alert variant='info' className='my-4'>
                    <strong>Recordar: </strong>Verificar y actualizar estos datos si cambian(o algo asi)
                </Alert>
                <h3>{empresa.data.tipo}</h3>
                <label>Datos Basicos</label>
                <FormDatosBasicos empresa={empresa.data}/>
                <Cuadro data={datao} headers={headers} titulo='Tabla de Personal Permanente' />


                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Listado Centrales</Accordion.Header>
                        <Accordion.Body>
                            {
                                empresa.data.centrales.length!=0 &&
                                <ListGroup as="ol">
                                    {
                                    empresa.data.centrales.map((emp:any)=>{
                                        return <CartaLista
                                            key={emp.id}
                                            titulo={emp.nombre}
                                            subtitulo={emp.nemo}
                                            badge={emp.destino}
                                            link={'/central/'+emp.nemo}
                                            />
                                    })
                                }
                                </ListGroup>
                            }
                            <Link legacyBehavior href='/central/new'>
                            <Button className='my-4' variant='primary'>Agregar</Button>
                            </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Declaraciones Variable</Accordion.Header>
                        <Accordion.Body>
                            <Link href='/variable' legacyBehavior>
                            <Button className='my-4' variant='primary'>Nueva declaracion</Button>
                            </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
        </div>
    )
}
export default Empresa
