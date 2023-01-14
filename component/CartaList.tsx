import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';

const CartaLista = (props:any)=>{
    const {titulo,subtitulo,badge,link} = props
    return (
        <Link href={link} legacyBehavior passHref>
            <ListGroup.Item
                as="a"
                className="d-flex justify-content-between align-items-start"
                action
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{titulo}</div>
                    {subtitulo}
                </div>
                <Badge bg="info" pill>
                    {badge}
                </Badge>
            </ListGroup.Item>
        </Link>
    )
}
export default CartaLista
