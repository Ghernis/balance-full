import {useContext} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';

import { VariableContext } from '../context/variable.context'

const CartaLista = (props:any)=>{
    const {titulo,subtitulo,badge,link,click} = props

    return (
        <Link href={link} legacyBehavior passHref>
            <ListGroup.Item
                as="a"
                className="d-flex justify-content-between align-items-start"
                action 
                onClick={click}
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
