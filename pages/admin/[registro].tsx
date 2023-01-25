import { useState,useEffect } from 'react'
import FormUsuarios from '../../component/FormUsuarios'
import Router,{ useRouter } from 'next/router'

import { trpc } from '../../utils/trpc';

const Registro=()=>{
    const router = useRouter()
    const registro:string = router.query.registro as string
    const id=parseInt(registro)

    const user = trpc.usuario.useQuery({id:id || 1})

    if(!router.isReady || user.isLoading){
        return <div>loading...</div>
    }

    return (
        <>
        <FormUsuarios empresa={user.data} />
        </>
    )
}

export default Registro;
