import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const Cmb=()=>{
    return (
        <>
        <label>Combutible</label>
        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th className='text-center'>Combustible</th>
                    <th className='text-center'>Unidad</th>
                    <th className='text-center'>Volumen</th>
                    <th className='text-center'>Clase de Produccion</th>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                    <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                    <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                    <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                </tr>
            </tbody>
        </Table>
        </>

    )
}

export default Cmb
