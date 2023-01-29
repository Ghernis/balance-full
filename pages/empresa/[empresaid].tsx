import { useEffect } from 'react'
import {useSession} from 'next-auth/react'
import Router,{ useRouter } from 'next/router'

import Empresa from '../../component/Empresa';

const EmpresaId=()=>{
    const router = useRouter()
    const {empresaid} = router.query
    const {status,data} = useSession()
    //console.log(data)
    useEffect(()=>{
        if(status==='unauthenticated') Router.replace('/auth/signin')
    },[status])

    if(status ==='authenticated' && data.user?.name==empresaid){
        return (
            <>
                <Empresa nombreId={data.user?.name} />
            </>
        )
    }
    return (
    <div>No estas autorizado</div>
    )
}

export default EmpresaId;
