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
    const [empresa_id,setEmpresa] = useState('distri2')

    const empresas = trpc.empresas.useQuery()
    const deptos = trpc.departamentos.useQuery()
    const empresa = trpc.empresa_id.useQuery({nombreId:empresa_id})

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
    if(empresa.isLoading || empresas.isLoading || deptos.isLoading){
        return <div>loading</div>
    }

    function selectEmpresa(name:React.ChangeEvent<HTMLSelectElement>){
        //console.log(name.target.value)
        setEmpresa(name.target.value)
    }
    return (
        <div>
            <div className='container my-4'>
                <label>Selecciona Empresa(esto es para testeo solamente)</label>
                <Form.Select size="lg" onChange={selectEmpresa} value={empresa_id}>
                    {
                        empresas.data.map((emp:any)=>{
                            return <option key={emp.id} value={emp.nombreId}>{emp.nombre}</option>
                        })
                    }
                </Form.Select>
                <Alert variant='warning' className='my-4'>
                    <strong>Nota: </strong>^Este selector de empresa no estara en la version final. Todavia no tengo claro como sera el registro, ni si es mi responsabilidad o ya hay otro sistema

                </Alert>
                <Alert variant='info' className='my-4'>
                    <strong>Recordar: </strong>Verificar y actualizar estos datos si cambian(o algo asi)
                </Alert>
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
                            <Button className='my-4' variant='primary'>Agregar</Button>
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
