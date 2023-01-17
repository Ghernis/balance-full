/*
*
solar Float
diesel Float
hidro Float
tv Float
tg Float
eolico Float
*/
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const Energia=()=>{
    return (
        <>
            <label>Energia</label>
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
                        <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                        <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
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

export default Energia
