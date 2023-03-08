import { useState,useEffect,useContext } from 'react'

import { trpc } from '../utils/trpc';

import {toast} from 'react-toastify'

import {VariableContext } from '../context/variable.context'

import TextCSV from './TextCSV';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const FormFacturado=(props)=>{
    const utils = trpc.useContext()
    const {variable} = useContext(VariableContext)
    const {departamentos}:{departamentos:[{
        departamento:string,
        provincia:string
    }]}=props

    const createFacturado=trpc.facturado.useMutation({
        onSuccess(){
            toast.success('Se guardaron datos de Facturacion',{
                position: toast.POSITION.TOP_RIGHT
            })
            utils.variables.invalidate(variable)
        },
        onError(e){
            const errorMes=e.message
            toast.error(errorMes,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
    })
    const depas = trpc.departamentos.useQuery()

    type tipoConcepto= 'Residencial'| 'Comercial'| 'Industrial'| 'ServicioSanitario'| 'Alumbrado'| 'Riego' | 'Oficial'| 'Rural'| 'Otros'| 'Traccion'
    const conceptos:tipoConcepto[]=[
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
    type tipoFact={concepto:tipoConcepto,cantUser:number,kwh:number}

    let auxFacturado:tipoFact[]=conceptos.map(c=>{
        const aux:{concepto:tipoConcepto,cantUser:number,kwh:number} = {
            concepto:c,
            cantUser:0,
            kwh:0.0
        }
        return aux
    })
    const areaBox:string[]=[]
    const initTabla:any[]=[]
    //let data:[{departamento:string,facturado:any[]}]=departamentos.map(d=>{
    let data:{departamento:string,facturado:tipoFact[]}[]=departamentos.map(d=>{
        const aux = {
            departamento:d.departamento,
            facturado: auxFacturado.map(x=>Object.assign({},x))
        }
        areaBox.push('')
        initTabla.push([])
        return aux

    })
    const [areas,setAreas]=useState(areaBox)
    const [csv,setCsv]=useState(data)
    const [dataTabla,setDataTabla]=useState(initTabla)
    const [showSave,setShowSave]=useState(false)
    const [indexDepa, setIndexDepa]=useState(0)

    useEffect(()=>{
        if(indexDepa==departamentos.length-1){
            setShowSave(true)
        }
        else{
            setShowSave(false)
        }

        if(dataTabla[indexDepa].length>0){
            const auxCsv = csv
            auxCsv[indexDepa].facturado.forEach((c,i)=>{
                const inputCantU=parseInt(dataTabla[indexDepa][i][0])
                const inputKwh=parseFloat(dataTabla[indexDepa][i][1])
                updateCSV(inputCantU,i,'cantUser')
                updateCSV(inputKwh,i,'kwh')
            })

        }

    },[indexDepa,dataTabla])
    const nextDepa=()=>{
        if(indexDepa<departamentos.length-1){
            setIndexDepa(indexDepa+1)
        }
    }
    const prevDepa=()=>{
        if(indexDepa>0){
            setIndexDepa(indexDepa-1)
        }
    }
    const updateCSV=(input:number,i:number,tipo:string)=>{
        let aux=[...csv]
        if(isNaN(input)){
            input=0
        }
        if(tipo=='cantUser'){
            aux[indexDepa].facturado[i].cantUser=input
        }
        else{
            aux[indexDepa].facturado[i].kwh=input
        }
        setCsv(aux)
    }

    const saveFacturacion=()=>{
        const facturado:any[]=[]
        csv.forEach(f=>{
            const dId=depas.data.filter(d=>{
                return d.nombre==f.departamento
            })
            if(dId.length>0){
                const createReg={
                    empresaId:variable.empresaId,
                    anio:variable.anio,
                    mes:variable.mes,
                    departamentoId:dId[0].id,
                    concepto:f.facturado.map(con=>{return {
                        tipo:con.concepto,
                        cantUsr: con.cantUser,
                        kwh:con.kwh,
                    }})
                }
                facturado.push(createReg)
            }
        })
        console.log(facturado)
        createFacturado.mutate(facturado)
    }

    if(!depas.data){
        return <div>loading</div>
    }

    return (
        <div className='container'>
            <TextCSV x={2} y={10} handler={(v)=>{
                let aux = [...dataTabla]
                aux[indexDepa]=v
                setDataTabla(aux)
            }} texto={areas[indexDepa]} setTexto={(val:string)=>{
                    let aux = [...areas]
                    aux[indexDepa]=val
                    setAreas(aux)
                }
            } />
            <h4 className='mt-4'>Facturado en departamento {indexDepa+1}/{departamentos.length}: {departamentos[indexDepa].departamento}</h4>
            <label>Usar '.' como punto decimal</label>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th className='text-center'>Cantidad de Usuarios</th>
                        <th className='text-center'>kwh</th>
                        {/*
                        <th className='text-center'>Facturado Sin Gravamen</th>
                        <th className='text-center'>Facturado Con Gravamen</th>
                        <th className='text-center'>Precio Medio</th>
                    */}
                    </tr>
                </thead>
                <tbody>
                    {
                    csv[indexDepa].facturado.map((c,i)=>{
                        return(
                            <tr key={c.concepto}>
                                <td>{c.concepto}</td>
                                <td><Form.Control 
                                        onChange={(e)=>{
                                            const input:number = parseInt(e.target.value) 
                                            updateCSV(input,i,'cantUser')
                                        }}
                                        value={c.cantUser} plaintext className='text-center' type='number' placeholder='' 
                                    />
                                </td>
                                <td><Form.Control 
                                        onChange={(e)=>{
                                            const input:number = parseFloat(e.target.value) 
                                            updateCSV(input,i,'kwh')
                                        }}
                                        value={c.kwh} plaintext className='text-center' type='number' placeholder='' /></td>
                                {/*
                                <td><Form.Control value={csv && csv[i][2]} plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control value={csv && csv[i][3]} plaintext className='text-center' type='text' placeholder='algo' /></td>
                                <td><Form.Control value={csv && csv[i][4]} plaintext className='text-center' type='text' placeholder='algo' /></td>
                                */}
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <div className='row'>
                <div className='col'>
                    <Button onClick={()=>prevDepa()}>Anterior</Button>
                </div>
                <div className='col text-center'>
                    <Button onClick={()=>nextDepa()}>Siguiente</Button>
                </div>
                <div className='col text-end'>
                    {
                        showSave && <Button variant='success'  onClick={()=>saveFacturacion()}>Guardar Facturacion</Button>
                    }
                </div>
            </div>
        </div>

    )
}

export default FormFacturado;
