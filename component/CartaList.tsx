import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const CartaLista = (props:any)=>{
    const {titulo,subtitulo,badge} = props
    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{titulo}</div>
                {subtitulo}
            </div>
            <Badge bg="info" pill>
                {badge}
            </Badge>
        </ListGroup.Item>
    )
}
export default CartaLista
