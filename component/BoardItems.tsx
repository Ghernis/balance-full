import CartaList from './CartaList'

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';

const BoardItems=(props)=>{
    const {lista,title}=props

    const dateFormater=(d:string)=>{
        const date = new Date(d)
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const dt = date.getDate();

        const day = dt<10 ? '0' + dt : dt.toString()
        const mt = month<10 ? '0' + month : month.toString()

        return year+'-' + mt + '-'+day;

    }
    return (
        <Card className='p-4'>
            <Form.Group className='mb-4'>
                <Form.Label>{title}</Form.Label>
                <Form.Control
                    placeholder='Buscar...'
                >
                </Form.Control>
            </Form.Group>
            <ListGroup as='ol'>
                {
                lista.map(u=>{
                    return (
                        <CartaList key={u.nombreId} titulo={u.nombre} subtitulo={u.mail} link={'/admin/'+u.id} badge={'Reistrado: '+dateFormater(u.createdAt)}></CartaList>
                    )
                })
            }
            </ListGroup>
            <Pagination size='sm' className='m-3 justify-content-md-center'>
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item active>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
            </Pagination>
        </Card>
    )
}

export default BoardItems;
