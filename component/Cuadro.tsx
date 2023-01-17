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
                                return <th key={t.attr}>{t.label}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((r,i)=>{
                            return (
                                <tr key={i} className='text-center'>
                                {
                                    headers.map((c,i)=>{
                                        return (
                                            <td key={c.attr+' - '+i}>{r[c.attr]}</td>
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
