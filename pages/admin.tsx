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


        </div>
    )
}

export default Admin
