import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const Energia=(props)=>{
    const {data,setData,index}=props
    console.log(data)
    return (
        <>
            <label>Energia en kwh</label>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th className='text-center'>Solar</th>
                        <th className='text-center'>Eolico</th>
                        <th className='text-center'>Diesel</th>
                        <th className='text-center'>Hidro</th>
                        <th className='text-center'>TV</th>
                        <th className='text-center'>TG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td><Form.Control plaintext className='text-center' type='number' placeholder=''
                            onChange={(e)=>{
                                let aux={...data}
                                aux[index].tecs.solar=parseFloat(e.target.value)
                                setData(aux)
                            }
                            }
                            value={data[index].tecs.solar}
                        /></td>
                        <td><Form.Control plaintext className='text-center' type='number' placeholder=''
                            onChange={(e)=>{
                                let aux={...data}
                                aux[index].tecs.eolico=parseFloat(e.target.value)
                                setData(aux)
                            }
                            }
                            value={data[index].tecs.eolico}
                        /></td>
                        <td><Form.Control plaintext className='text-center' type='number' placeholder=''
                            onChange={(e)=>{
                                let aux={...data}
                                aux[index].tecs.diesel=parseFloat(e.target.value)
                                setData(aux)
                            }
                            }
                            value={data[index].tecs.diesel}
                        /></td>
                        <td><Form.Control plaintext className='text-center' type='number' placeholder=''
                            onChange={(e)=>{
                                let aux={...data}
                                aux[index].tecs.hidro=parseFloat(e.target.value)
                                setData(aux)
                            }
                            }
                            value={data[index].tecs.hidro}
                        /></td>
                        <td><Form.Control plaintext className='text-center' type='number' placeholder=''
                            onChange={(e)=>{
                                let aux={...data}
                                aux[index].tecs.tv=parseFloat(e.target.value)
                                setData(aux)
                            }
                            }
                            value={data[index].tecs.tv}
                        /></td>
                        <td><Form.Control plaintext className='text-center' type='number' placeholder=''
                            onChange={(e)=>{
                                let aux={...data}
                                aux[index].tecs.tg=parseFloat(e.target.value)
                                setData(aux)
                            }
                            }
                            value={data[index].tecs.tg}
                        /></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Energia
