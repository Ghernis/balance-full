import { useState } from 'react'

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

    const addRegistro=()=>{
        const aux={
            tipo:tipo,
            ente:ente,
            quien:quien,
            energia:energia,
            tension:tension
        }
        setInterList([...interLista,aux])
    }
    return (
        <>

            <label>Intercambio de energia</label>

            <InputGroup>
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
                <FloatingLabel controlId="floatingPassword" label={tipo=='Compra' ? 'A' : 'Para'}>
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
                <FloatingLabel controlId="floatingSelect" label="Tipo de intercambio">
                    <Form.Select aria-label="" value={tipo} onChange={(e)=>setTipo(e.target.value)}>
                        <option value="Compra">Compra</option>
                        <option value="Venta">Venta</option>
                    </Form.Select>
                </FloatingLabel>
            </InputGroup>
            <Button onClick={()=>addRegistro()}>Agregar</Button>
            {
                interLista.length!=0 &&
                interLista.map(il=>{
                    return <div>{il.ente} - {il.quien} - {il.energia} - {il.tension} - {il.tipo}</div>
                })
            }



            </>

    )
}

export default Intercambio;
