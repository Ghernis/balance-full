import { trpc } from '../utils/trpc'
import Accordion from 'react-bootstrap/Accordion'

//import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const hello = trpc.empresas.useQuery()
    const mutation = trpc.put_empresas.useMutation()
    if(!hello.data){
        return <div>loading</div>
    }
    const handler=()=>{
        mutation.mutate({
            nombre:'empresa test',
            nombreId:'test1',
            tipo:'Autoproductor',
            nemo:'hernan',
            direccion:'hernan',
            tel:'hernan',
            localidad:'hernan',
            departamentoLeg:'hernan',
            provincia:'provincia',
            cp:'hernan',
            mail:'hernan',
            contacto:'hernan',
            sistema:'Conectado',
            destino:'Resguardo',

        })
    }
    return (
        <>

            <div className='container'>


                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
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
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
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
                {
                hello.data.empresa.map(m=>{
                    return (<div id={m.nombreId}>
                        {m.tipo}
                    </div>)
                })

                }
                <button type='button' className='btn btn-primary' onClick={handler}>test</button>


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


                <div className="alert alert-info">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit iure quod, quae architecto animi corporis dolorum odio? Assumenda itaque eos laboriosam at? Voluptatem maxime quam quas error possimus tempore ullam!</p>
                </div>




            </div>
            </>
    )
}
