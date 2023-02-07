import { useState } from 'react'

import { trpc } from '../utils/trpc';

import {toast} from 'react-toastify'

import Cuadro from './Cuadro';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Intercambio=()=>{
    const [tipo, setTipo] = useState('Compra')
    const [ente,setEnte] = useState('')
    const [quien,setQuien] = useState('')
    const [energia,setEnergia]=useState(0)
    const [tension,setTension]=useState(0)

    const [interLista, setInterList]=useState<any[]>([])

    const saveIntercambio = trpc.intercambio.useMutation({
        onSuccess(){
            toast.success('Se guardaron datos de Intercambio',{
                position: toast.POSITION.TOP_RIGHT
            })
        },
        onError(e){
            const errorMes=e.message
            toast.error(errorMes,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
    })

    const addRegistro=()=>{
        const aux={
            empresaId:'ej1',
            anio:2023,
            mes:2,
            tipo:tipo,
            ente:ente,
            quien:quien,
            energia:energia,
            tension:tension
        }
        setInterList([...interLista,aux])
    }
    const saveRegistro=()=>{
        saveIntercambio.mutate(interLista)
    }

    const headers=[
        {
            label:'Ente',
            attr:'ente'
        },
        {
            label:'Quien',
            attr:'quien'
        },
        {
            label:'Energia',
            attr:'energia'
        },
        {
            label:'Tension',
            attr:'tension'
        },
        {
            label:'Tipo de Intercambio',
            attr:'tipo'
        },
    ]
    return (
        <>

            <label>Intercambio de energia</label>

            <InputGroup>
                <FloatingLabel controlId="floatingSelect" label="Tipo de intercambio">
                    <Form.Select aria-label="" value={tipo} onChange={(e)=>setTipo(e.target.value)}>
                        <option value="Compra">Compra</option>
                        <option value="Venta">Venta</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Ente"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="" aria-describedby='basic-addon1'
                        value={ente}
                        onChange={(e)=>setEnte(e.target.value)}
                        />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label={tipo=='Compra' ? 'Central o Sistema que Provee' : 'Localidad y/o Departamento'}>
                    <Form.Control type="text" placeholder="Password"
                        value={quien}
                        onChange={(e)=>setQuien(e.target.value)}
                        />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Energia">
                    <Form.Control type="number" placeholder="Password"
                        value={energia}
                        onChange={(e)=>setEnergia(parseFloat(e.target.value))}
                        />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Tension">
                    <Form.Control type="number" placeholder="Password"
                        value={tension}
                        onChange={(e)=>setTension(parseFloat(e.target.value))}
                        />
                </FloatingLabel>
            </InputGroup>
            <div className='text-end'>
            <Button size='sm' className='' onClick={()=>addRegistro()}>Agregar</Button>
            </div>

            {
                interLista.length!=0 &&
                    <Cuadro data={interLista} headers={headers}/>
            }
            <Button size='sm' className='btn-success' onClick={()=>saveRegistro()}>Guardar</Button>
            </>

    )
}

export default Intercambio;
