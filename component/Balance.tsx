import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import {toast} from 'react-toastify'

import { trpc } from '../utils/trpc';

const Balance=()=>{
    const utils = trpc.useContext()
    const variables = trpc.variables.useQuery({anio:2023,mes:2,empresaId:'ej1'});
    const cierre = trpc.cerrar_declaracion.useMutation({
        onSuccess(){
            utils.variables.invalidate({empresaId:'ej1',anio:2023,mes:2})
            toast.success('Se cerro la declaracion',{
                position: toast.POSITION.TOP_RIGHT
            })
        },
        onError(e){
            toast.error('Error en cambios:'+e.message,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
    })
    const cerrarDeclaracion=()=>{
        cierre.mutate({
            anio:2023,
            mes:2,
            empresaId:'ej1',
            completa:true
        })

    }
    if(!variables.data) return (<div>loading...</div>)
    return (
        <>
            <Alert>
                Aca se va a mostrar un resumen de los datos ingresados...cantidad de usuarios y pot por departamento, intercambios, cmb etc
                <br/>
                Puede servir para armar un comprobante de carga en pdf.
            </Alert>
            <div>{JSON.stringify(variables.data)}</div>
            {
                variables.data.completa 
                ? <Button variant='primary' disabled>Completa</Button>
                : <Button variant='warning' onClick={cerrarDeclaracion}>Cerrar la declaracion</Button>

            }
        </>
    )
}

export default Balance;
