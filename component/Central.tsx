import Button from 'react-bootstrap/Button';

import FormCentral from './FormCentral';
import Cuadro from './Cuadro';

const Central=(props)=>{
    const {nemo}=props
    const titulos=['ID','Tecnologia','Marca','Tension','kva','fp','kw','Pontencia Ef','Potencia HP', 'Fecha PS', 'Tipo Cte']
    const data=[
        ['Maquina1','TV','Siemmens',220,16,0.8,200,200,200,'hoy','no se que es esto'],
        ['Maquina2','TV','Siemmens',220,16,0.8,200,200,200,'hoy','no se que es esto'],
        ['Maquina3','TG','GE',220,16,0.8,200,200,200,'maniana','no se que es esto'],
        ['Maquina4','CI','GE',220,16,0.8,200,200,200,'ayer','no se que es esto'],
    ]

    return (
        <>
            <div className='container'>
                <h3>Central: {nemo}</h3>
                <FormCentral />
                <Cuadro data={data} headers={titulos} titulo='Tabla de Maquinas' />
                <Button variant='success' size='sm' className='me-4'>Agregar Maquina</Button>
                <Button variant='secondary' size='sm'>Editar</Button>
            </div>
        </>
    )
}

export default Central;
