import {useState,useEffect} from 'react';

import Form from 'react-bootstrap/Form';

import {toast} from 'react-toastify'

const TextCSV=(props)=>{
    const { x, y, handler, texto,setTexto } = props
    const [data,setData]=useState('')
    //const [pros, setPros]=useState('')
    
    useEffect(()=>{
        if(texto!=undefined){
            const textoFormat = texto.replace(',','').replace(' ','').trimEnd()
            const lines = textoFormat.split(/\r?\n/);
            setTexto(textoFormat)
            let matris:any[] = []
            lines.forEach(l=>{
                const cols =l.split('\t') 
                matris.push(cols)
            })
            if(matris.length>0 && (matris.length != y || matris[0].length != x)){
                console.log('mal'+matris.length+' '+matris[0].length)
                handler('')
            }
            else{
                handler(matris)
            }
        }
    },[texto])

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Copia y Pega desde excel</Form.Label>
                <br />
                <Form.Text>Prestar atencion de que la tabla a copiar sea de {y}x{x}. Simpre tomara precedente este cuadro que el input manual.</Form.Text>
                <Form.Control as="textarea" value={texto} rows={4} className='h-100' onChange={(e)=>setTexto(e.target.value)}/>
            </Form.Group>
        </Form>
    )
}

export default TextCSV;
