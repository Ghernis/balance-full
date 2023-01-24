import { trpc } from '../../utils/trpc';

const Registro=()=>{
    const user = trpc.usuario.useQuery({nombreId:'distri1'})

    if(user.isLoading){
        return <div>Loading..</div>
    }
    return (
    <div>{JSON.stringify(user.data)}</div>
    )
}

export default Registro;
