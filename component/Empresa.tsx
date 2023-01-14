import { useState, useEffect } from 'react'
import { trpc } from '../utils/trpc'

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
    //const mutation = trpc.departamento_bulk.useMutation()
    //useEffect(()=>{
    //    trpc.empresa_id.useQuery({nombreId:empresa_id})
    //},[empresa_id])
    if(empresa.isFetching){
        return <div>loading</div>
    }

    if(!empresas.data){
        return <div>loading</div>
    }
    if(!deptos.data){
        return <div>loading</div>
    }
    const handler=()=>{
        // mutation.mutate(
        //     [
        //     {
        //     codigo_depto:1,
        //     nombre:'nombre1',
        //     provincia:'provincia1',
        //     lon:1.0,
        //     lat:1.0,
        //     },
        //     {
        //     codigo_depto:2,
        //     nombre:'nombre2',
        //     provincia:'provincia2',
        //     lon:2.0,
        //     lat:2.0,
        //     }
        //     ]
        // )
        //mutation.mutate({
        //    nombre:'empresa test',
        //    nombreId:'test1',
        //    tipo:'Autoproductor',
        //    nemo:'hernan',
        //    direccion:'hernan',
        //    tel:'hernan',
        //    localidad:'hernan',
        //    departamentoLeg:'hernan',
        //    provincia:'provincia',
        //    cp:'hernan',
        //    mail:'hernan',
        //    contacto:'hernan',
        //    sistema:'Conectado',
        //    destino:'Resguardo',

        //})
    }
    function selectEmpresa(name:React.ChangeEvent<HTMLSelectElement>){
        console.log(name.target.value)
        setEmpresa(name.target.value)
    }
    return (
        <div>
            <div className='container my-4'>
                <label>Selecciona Empresa(esto es para testeo solamente)</label>
                <Form.Select size="lg" onChange={selectEmpresa}>
                    {
                        empresas.data.map((emp:any)=>{
                            return <option key={emp.id} value={emp.nombreId}>{emp.nombre}</option>
                        })
                    }
                </Form.Select>
                <Alert variant='warning' className='my-4'>
                    <strong>Nota: </strong>^Este selector de empresa no estara en la version final. Todavia no tengo claro como sera el registro, ni si es mi responsabilidad o ya hay otro sistema

                </Alert>
                <label>Datos Basicos</label>
                <FormDatosBasicos empresa={empresa.data}/>
                <Cuadro />

                <Alert variant='info' className='my-4'>
                    <strong>Recordar: </strong>Verificar y actualizar estos datos si cambian(o algo asi)
                </Alert>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Listado Centrales</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup as="ol">
                                {
                                empresa.data.centrales.map((emp:any)=>{
                                    return <CartaLista
                                        key={emp.id}
                                        titulo={emp.nombre}
                                        subtitulo={emp.nemo}
                                        badge={emp.destino}
                                        />
                                })
                            }
                            </ListGroup>
                            <Button className='my-4' variant='primary'>Agregar</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Declaraciones Variable</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <button type='button' className='btn btn-primary my-4' onClick={handler}>test</button>


                <div className='row'>
                    <div className='col'>
                        <a className="panel panel-default" href="#">
                              <div className="panel-body">
                                    <div className="media">
                                          <div className="media-left padding-5">
                                                <i className="fa fa-phone fa-fw fa-3x text-secondary"></i>
                                              </div>
                                          <div className="media-body">
                                                <h3>El estado del estado</h3>
                                                <p className="text-muted">Diagnóstico de la Administración Pública Nacional en diciembre de 2019</p>
                                              </div>
                                        </div>
                                  </div>
                        </a>
                    </div>
                    <div className='col'>


                        <a className="panel panel-default" href="#">
                              <div className="panel-body">
                                    <h3>Ministerio de Economía</h3>
                                  </div>
                        </a>

                    </div>
                </div>






            </div>
        </div>
    )
}
export default Empresa
