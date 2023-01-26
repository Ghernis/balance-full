import BoardItems from '../component/BoardItems';

import { trpc } from '../utils/trpc';

const Admin=()=>{
    const usuarios = trpc.usuarios_all.useQuery()
    if(usuarios.isLoading){
        return <div>Loading...</div>
    }
    return (
        <div className='container'>
            <h3>Panel de Administrador</h3>
            <div className='row'>
                <div className='col mb-4'>
                    <BoardItems lista={usuarios.data} title='Sin ID asignado'/>
                </div>
                <div className='col mb-4'>
                    <BoardItems lista={usuarios.data} title='Sin verificar'/>
                </div>
                <div className='col mb-4'>
                    <BoardItems lista={usuarios.data} title='Habilitados'/>
                </div>
            </div>
            <h3 className='md-4'>Configuracion</h3>
            <p>Opciones de configuracion para el sistema</p>
            <ul className='my-4'>
                <li>Fecha de cierre</li>
                <li>otros</li>
            </ul>


        </div>
    )
}

export default Admin
