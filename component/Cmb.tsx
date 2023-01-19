import {useState} from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import TextCSV from './TextCSV';

const Cmb=()=>{
    const tipos=['Gas Oil','Fuel Oil','Gas Natural','Carbon','Otros 1','Otros 2']
    const [csv,setCsv]=useState([['','',''],['','',''],['','',''],['','',''],['','',''],['','','']])
    const hand=(data)=>{
        //console.log(data)
        setCsv(data)
    }
    const changeHandler=(e,col:number,row:number)=>{
        let aux = [...csv]
        aux[row][col]=e.target.value
        setCsv(aux)
    }
    return (
        <>
        <TextCSV x={3} y={6} handler={hand} />

        <label>Combutible</label>
        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th>Combustible</th>
                    <th className='text-center'>Unidad</th>
                    <th className='text-center'>Volumen</th>
                    <th className='text-center'>Clase de Produccion</th>
                </tr>
            </thead>
            <tbody>
                    {
                    tipos.map((c,i)=>{
                    return (
                <tr key={c}>
                    <td>{c}</td>
                    <td><Form.Control onChange={(e)=>changeHandler(e,0,i)} plaintext value={csv[i][0]} className='text-center' type='text' placeholder='algo' /></td>
                    <td><Form.Control onChange={(e)=>changeHandler(e,1,i)} plaintext value={csv[i][1]} className='text-center' type='text' placeholder='algo' /></td>
                    <td><Form.Control onChange={(e)=>changeHandler(e,2,i)} plaintext value={csv[i][2]} className='text-center' type='text' placeholder='algo' /></td>
                </tr>)
                    })
                }
            </tbody>
        </Table>
        </>

    )
}

export default Cmb
