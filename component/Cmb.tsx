import {useState} from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import TextCSV from './TextCSV';

const Cmb=(props)=>{
    const {data,setData,index}=props
    const tipos=['Gas Oil','Fuel Oil','Gas Natural','Carbon','Otros 1','Otros 2']

    return (
        <>
            {/*
<TextCSV x={3} y={6} handler={hand} />
*/}

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
                                    <td><Form.Select 
                                        onChange={
                                            (e)=>{
                                                let aux = {...data}
                                                aux[index].cmb[i].unidad=e.target.value
                                                setData(aux)
                                            }
                                        }
                                        value={data[index].cmb[i].unidad} 
                                        className='text-center'>
                                        <option value='kgs'>kgs</option>
                                        <option value='libra'>Libras</option>
                                        <option value='lts'>lts</option>
                                    </Form.Select>

                                    </td>
                                    <td><Form.Control 
                                        onChange={
                                            (e)=>{
                                                let aux={...data}
                                                aux[index].cmb[i].vol=e.target.value
                                                setData(aux)
                                            }
                                        } 
                                        plaintext 
                                        value={data[index].cmb[i].vol} 
                                        className='text-center' 
                                        type='number' 
                                        placeholder=''/>
                                    </td>
                                    <td><Form.Control 
                                        onChange={
                                            (e)=>{
                                                let aux={...data}
                                                aux[index].cmb[i].claseProd=e.target.value
                                                setData(aux)
                                            }
                                        } 
                                        plaintext 
                                        value={data[index].cmb[i].claseProd} 
                                        className='text-center' 
                                        type='text' 
                                        placeholder='' />
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </Table>
        </>

    )
}

export default Cmb
