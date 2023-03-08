import {useContext } from 'react'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import {VariableContext } from '../context/variable.context'

import {toast} from 'react-toastify'
import Cuadro from './Cuadro'

import { trpc } from '../utils/trpc';

const Balance=()=>{
    const {variable,setVariable} = useContext(VariableContext)
    console.log(variable)
    const utils = trpc.useContext()
    const variables = trpc.variables.useQuery(variable);
    const cierre = trpc.cerrar_declaracion.useMutation({
        onSuccess(){
            utils.variables.invalidate(variable)
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
            anio:variable.anio,
            mes:variable.mes,
            empresaId:variable.empresaId,
            completa:!variables.data.completa
        })

    }

    const headers=[
        {
            label:'Concepto',
            attr:'tipo'
        },
        {
            label:'Cantidad de Usuarios',
            attr:'cantUsr'
        },
        {
            label:'kwh',
            attr:'kwh'
        },
    ]
    const makeTable=()=>{
        let data:any[]=[]
        variables.data.facturado.forEach(fa=>{
            fa.concepto.forEach(con=>{
                if(!(con.tipo in data)){
                    data[con.tipo]={
                        cantUsr:con.cantUsr,
                        kwh:con.kwh,
                    }

                }
                else{
                    data[con.tipo]={
                        cantUsr:data[con.tipo].cantUsr+con.cantUsr,
                        kwh:data[con.tipo].kwh+con.kwh,
                    }
                }
            })
        })
    const conceptos:any[]=[
        'Residencial',
        'Comercial',
        'Industrial',
        'ServicioSanitario',
        'Alumbrado',
        'Riego',
        'Oficial',
        'Rural',
        'Otros',
        'Traccion'
    ]
        const aux = conceptos.map(c=>{
            return {
                tipo: c,
                cantUsr:data[c].cantUsr,
                kwh:data[c].kwh
            }
        })
        return aux
    }
    //aux.reduce((a,b)=>({tipo:a.tipo,kwh:a.kwh+b.kwh,cantUsr:a.cantUsr+b.cantUsr}));

    //console.log("aux de reduce")

    if(!variables.data) return (<div>loading...</div>)
    return (
        <>
            <Alert>
                Aca se va a mostrar un resumen de los datos ingresados...cantidad de usuarios y pot por departamento, intercambios, cmb etc
                <br/>
                Puede servir para armar un comprobante de carga en pdf.
            </Alert>
            <Cuadro 
                titulo='Resumen Facturado'
                headers={headers}
                data={makeTable()}

            />


            {
                variables.data.completa 
                ? <Button variant='primary' onClick={cerrarDeclaracion}>Completa</Button>
                : <Button variant='warning' onClick={cerrarDeclaracion}>Cerrar la declaracion</Button>

            }
        </>
    )
}

export default Balance;
