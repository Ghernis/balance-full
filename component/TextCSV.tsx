import {useState,useEffect} from 'react';

import Form from 'react-bootstrap/Form';

import {toast} from 'react-toastify'

const TextCSV=(props)=>{
    const { x, y, handler } = props
    const [data,setData]=useState('')
    //const [pros, setPros]=useState('')
    
    useEffect(()=>{
        const lines = data.trimEnd().split(/\r?\n/);
        let res:any[] = []
        lines.forEach(l=>{
            const cols =l.split('\t') 
            res.push(cols)
        })
        if(res.length>0 && (res.length != y || res[0].length != x)){
            console.log('mal'+res.length+' '+res[0].length)
           // const errorMes='Pegaste '+res.length+' filas x '+ res[0].length+' columnas. Esta tabla es de '+x+'x'+y
           // toast.error(errorMes,{
           //     position: toast.POSITION.TOP_RIGHT
           // })
        }
        else{
            handler(res)
        }
    },[data])

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Copia y Pega desde excel</Form.Label>
                <Form.Control as="textarea" rows={4} className='h-100' onChange={(e)=>setData(e.target.value)}/>
            </Form.Group>
        </Form>
    )
}

export default TextCSV;
