import CartaList from '../component/CartaList'
import ListGroup from 'react-bootstrap/ListGroup';

import { trpc } from '../utils/trpc';

const Admin=()=>{
    const usuarios = trpc.usuarios_all.useQuery()
    if(usuarios.isLoading){
        return <div>Loading...</div>
    }
    return (
        <div className='container'>
            <h3>Panel de Administrador</h3>
            <ListGroup as='ol' className='my-4'>
            {
            usuarios.data.map(u=>{
                return (
                <CartaList key={u.nombreId} titulo={u.nombre} subtitulo={u.mail} link='' badge={u.createdAt}></CartaList>
                )
            })
            }
            </ListGroup>


        </div>
    )
}

export default Admin
