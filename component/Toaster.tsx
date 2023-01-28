import { useState,useContext } from 'react'

import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

import { AlertaContext } from '../context/alert.context'

const Toaster=()=>{
    const [showA,setShowA] = useState(false)
    const {alerta} = useContext(AlertaContext)
    const toggleShowA = () => setShowA(!showA);
    return(
        <ToastContainer className="p-3" position='middle-end'>
            <Toast show={alerta || false} onClose={toggleShowA} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body> mensaje error</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Toaster
