import Table from 'react-bootstrap/Table';

const Cuadro=()=>{
    return (
        <>
            <label>Tabla personal</label>
            <Table striped bordered size='sm'>
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th>Profesionales</th>
                        <th>Obreros</th>
                        <th>Administrativos</th>
                        <th>Tecnicos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center'>
                        <td>Hombres</td>
                        <td>10</td>
                        <td>20</td>
                        <td>30</td>
                        <td>40</td>
                    </tr>
                    <tr className='text-center'>
                        <td>Mujeres</td>
                        <td>10</td>
                        <td>20</td>
                        <td>30</td>
                        <td>40</td>
                    </tr>
                    <tr className='text-center'>
                        <td><strong>Total</strong></td>
                        <td>20</td>
                        <td>40</td>
                        <td>60</td>
                        <td>80</td>
                    </tr>
                </tbody>
            </Table>
            </>
    )
}

export default Cuadro;
