import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const FormFacturado=()=>{
    const conceptos=[
        'Residencial',
        'Comercial',
        'Industrial',
        'ServicioSanitario',
        'Alumbrado',
        'Riego',
        'Oficial',
        'Rural',
        'Otros',
        'Traccion'
    ]
    return (
        <div className='container'>
            <h4 className='my-4'>Facturado en departamento: x</h4>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th className='text-center'>Cantidad de Usuarios</th>
                        <th className='text-center'>kwh</th>
                        <th className='text-center'>Facturado Sin Gravamen</th>
                        <th className='text-center'>Facturado Con Gravamen</th>
                        <th className='text-center'>Precio Medio</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    conceptos.map(c=>{
                        return(
                            <tr key={c}>
                                <td>{c}</td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control plaintext className='text-center' type='text' placeholder='algo' /></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>

    )
}

export default FormFacturado;
