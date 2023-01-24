import { useState,useEffect } from 'react'
import FormUsuarios from '../../component/FormUsuarios'
import Router,{ useRouter } from 'next/router'

import { trpc } from '../../utils/trpc';

const Registro=async()=>{
    const router = useRouter()
    const {registro} = router.query

    const user = trpc.usuario.useQuery({nombreId:registro})

    console.log(user.data)

    return (
        <FormUsuarios empresa={user.data} />
    )
}

export default Registro;
