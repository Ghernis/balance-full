import { useState,useContext } from 'react'

import { trpc } from '../utils/trpc';

import {toast} from 'react-toastify'

import Cuadro from './Cuadro';

import {VariableContext } from '../context/variable.context'

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Intercambio=()=>{

    const {variable} = useContext(VariableContext)
    
    const [intercambio,setIntercambio] =useState({
        tipo:'Compra',
        ente:'',
        quien:'',
        energia:0,
        tension:0,
        empresaId:variable.empresaId,
        anio:variable.anio,
        mes:variable.mes
    })
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
        setInterList([...interLista,intercambio])
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
                    <Form.Select aria-label="" value={intercambio.tipo} onChange={(e)=>setIntercambio({...intercambio,tipo:e.target.value})}>
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
                        value={intercambio.ente}
                        onChange={(e)=>setIntercambio({...intercambio,ente:e.target.value})}
                        />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label={intercambio.tipo=='Compra' ? 'Central o Sistema que Provee' : 'Localidad y/o Departamento'}>
                    <Form.Control type="text" placeholder="Password"
                        value={intercambio.quien}
                        onChange={(e)=>setIntercambio({...intercambio,quien:e.target.value})}
                        />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Energia">
                    <Form.Control type="number" placeholder="Password"
                        value={intercambio.energia}
                        onChange={(e)=>setIntercambio({...intercambio,energia:parseFloat(e.target.value)})}
                        />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Tension">
                    <Form.Control type="number" placeholder="Password"
                        value={intercambio.tension}
                        onChange={(e)=>setIntercambio({...intercambio,tension:parseFloat(e.target.value)})}
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
