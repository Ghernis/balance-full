import {useEffect } from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ItemClose=(props)=>{
    const {lista,seter} = props
    if(lista==undefined) return <div>loading...</div>
    const delEl=(i:number)=>{
        let aux =[...lista]
        aux.splice(i,1)
        seter(aux)
    }   

    return (
        <>

            <ListGroup>
                {
                    lista.map((l,i)=>{
                        return (
                            <ListGroup.Item key={i}>
                                <Row className='mx-4'>
                                    <Col>
                                        <strong>
                                            {l}
                                        </strong>
                                    </Col>
                                    <Col className='text-center'>
                                        {l}
                                    </Col>
                                    <Col className='text-end'>
                                        <CloseButton onClick={()=>delEl(i)} /> 
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    })
                }

            </ListGroup>
        </>
    )
}

export default ItemClose
