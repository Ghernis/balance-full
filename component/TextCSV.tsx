import {useState,useEffect} from 'react';

import Form from 'react-bootstrap/Form';

const TextCSV=(props)=>{
    const { x, y,handler } = props
    const [data,setData]=useState('')
    const [pros, setPros]=useState('')
    useEffect(()=>{
        const lines = data.trimEnd().split(/\r?\n/);
        let res:any[] = []
        lines.forEach(l=>{
            const cols =l.split('\t') 
            res.push(cols)
        })
        //console.log(res)
        if(!res || res.length != y || res[0].length != x){
            console.log('mal'+res.length+' '+res[0].length)
        }
        else{
            handler(res)
        }
        setPros(data)


    },[data])

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Copia y Pega desde excel</Form.Label>
                <Form.Control as="textarea" rows={3} className='h-100' onChange={(e)=>setData(e.target.value)}/>
            </Form.Group>
        </Form>
    )
}

export default TextCSV;
