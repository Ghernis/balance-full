import { useState,useEffect } from 'react'
import FormUsuarios from '../../component/FormUsuarios'
import Router,{ useRouter } from 'next/router'

import { trpc } from '../../utils/trpc';

const Registro=()=>{
    const router = useRouter()
    const {registro} = router.query

    type userReg={
        nombreId:string
    }
    const user = trpc.usuario.useQuery({nombreId:registro || ''} as userReg)

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
