import Table from 'react-bootstrap/Table';

const Cuadro=(props)=>{
    const {headers, data, titulo}=props
    return (
        <>
            <label>{titulo}</label>
            <Table striped bordered size='sm'>
                <thead>
                    <tr className='text-center'>
                        {
                            headers.map(t=>{
                                return <th key={t}>{t}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(r=>{
                            return (
                                <tr key={r[0]} className='text-center'>
                                {
                                    r.map((c,i)=>{
                                        return (
                                            <td key={r[0]+'-'+i}>{c}</td>
                                        )
                                    })
                            }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            </>
    )
}

export default Cuadro;
