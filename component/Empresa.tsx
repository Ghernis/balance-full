import { useState, useEffect } from 'react'
import { trpc } from '../utils/trpc'
import {useRouter} from 'next/router'
import Link from 'next/link'

import {toast} from 'react-toastify'

import CartaLista from '../component/CartaList'
import FormDatosBasicos from '../component/FormDatosBasicos'
import Cuadro from '../component/Cuadro';

import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Empresa =(props:any)=>{
    const router = useRouter()
    const dia = new Date()
    const fecha = {
        dia:dia.getDate(),
        mes:dia.getMonth()+1,
        anio: dia.getFullYear()
    }


    const {nombreId} = props

    const deptos = trpc.departamentos.useQuery()
    const empresa = trpc.empresa_id.useQuery({nombreId:nombreId})
    const newVariable = trpc.new_variable.useMutation()

    //const [empresa_id,setEmpresa] = useState(empresa.data)

    useEffect(()=>{
        if(newVariable.isError){
            const errorObj=newVariable.error.message
            //const errorMes=errorObj.message+' en campo: '+errorObj.path
            //console.log(errorMes)
            toast.error(errorObj,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if(newVariable.isSuccess){
            toast.success('Se creo una nueva declaracion vacia',{
                position: toast.POSITION.TOP_RIGHT
            })
        }

    },[newVariable.status])
    const nuevoVariable=()=>{
        newVariable.mutate({
            anio:fecha.anio,
            mes:fecha.mes,
            empresaId:nombreId
        })

        router.push('/variable')
    }

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
    //if(empresa.isLoading || deptos.isLoading){
    //    return <div>loading</div>
    //}
    if(!empresa.data || !deptos.data) return <div>loading...</div>

    return (
        <div>
            <div className='container my-4'>
                <Alert variant='info' className='my-4'>
                    <strong>Recordar: </strong>Verificar y actualizar estos datos periodicamente
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
                                            key={emp.nemo}
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
                            <Button onClick={nuevoVariable} className='my-4' variant='primary'>Nueva declaracion</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
        </div>
    )
}
export default Empresa
