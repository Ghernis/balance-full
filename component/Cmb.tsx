import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const Cmb=()=>{
    const tipos=['Gas Oil','Fuel Oil','Gas Natural','Carbon','Otros 1','Otros 2']
    return (
        <>
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
                    tipos.map(c=>{
                    return (
                <tr key={c}>
                    <td>{c}</td>
                    <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                    <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                    <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                </tr>)
                    })
                }
            </tbody>
        </Table>
        </>

    )
}

export default Cmb
