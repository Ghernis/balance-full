import Button from 'react-bootstrap/Button';

import FormCentral from './FormCentral';
import Cuadro from './Cuadro';

const Central=(props)=>{
    const {nemo}=props
    const headers=[
        {
            label:'ID',
            attr:'id'
        },
        {
            label:'Tecnologia',
            attr:'tec'
        },
        {
            label:'Marca',
            attr:'marca'
        },
        {
            label:'Tension',
            attr:'tension'
        },
        {
            label:'kva',
            attr:'kva'
        },
        {
            label:'fp',
            attr:'fp'
        },
        {
            label:'kw',
            attr:'kw'
        },
        {
            label:'Potencia Ef',
            attr:'potEf'
        },
        {
            label:'Potencia HP',
            attr:'potHp'
        },
        {
            label:'Fecha PS',
            attr:'fecha'
        },
        {
            label:'Cte',
            attr:'cte'
        },


    ]
    const data=[
        {
            id:'Maquina1',
            tec:'TV',
            marca:'Siemmens',
            tension:'220',
            kva:16,
            fp:0.8,
            kw:299,
            potEf:300,
            potHp:301,
            fecha:'hoy',
            cte:'cte1',
        },
        {
            id:'Maquina2',
            tec:'TV',
            marca:'Siemmens',
            tension:'220',
            kva:16,
            fp:0.8,
            kw:299,
            potEf:300,
            potHp:301,
            fecha:'hoy',
            cte:'cte1',
        },{
            id:'Maquina3',
            tec:'TG',
            marca:'GE',
            tension:'220',
            kva:16,
            fp:0.8,
            kw:299,
            potEf:300,
            potHp:301,
            fecha:'hoy',
            cte:'cte1',
        },{
            id:'Maquina4',
            tec:'CI',
            marca:'GE',
            tension:'220',
            kva:16,
            fp:0.8,
            kw:299,
            potEf:300,
            potHp:301,
            fecha:'hoy',
            cte:'cte1',
        }
    ]

    return (
        <>
            <div className='container'>
                <h3>Central: {nemo}</h3>
                <FormCentral />
                <Cuadro data={data} headers={headers} titulo='Tabla de Maquinas' />
                <Button variant='success' size='sm' className='me-4'>Agregar Maquina</Button>
                <Button variant='secondary' size='sm'>Editar</Button>
            </div>
        </>
    )
}

export default Central;
