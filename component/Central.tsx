import FormCentral from './FormCentral';
import Cuadro from './Cuadro';

const Central=(props)=>{
    const {nemo}=props
    const titulos=['ID','Tecnologia','Marca','Tension','kva','fp','kw','Pontencia Ef','Potencia HP', 'Fecha PS', 'Tipo Cte']
    const data=[['Maquina1','TV','Siemens',220,16,0.8,200,200,200,'hoy','no se que es esto']]

    return (
        <>
            <div className='container'>
                <div>comp central {nemo}</div>
                <FormCentral />
                <Cuadro data={data} headers={titulos} titulo='Tabla de Maquinas' />
            </div>
        </>
    )
}

export default Central;
