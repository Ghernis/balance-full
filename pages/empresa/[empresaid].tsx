import { useEffect } from 'react'
import {useSession} from 'next-auth/react'
import Router,{ useRouter } from 'next/router'

const EmpresaId=()=>{
    const router = useRouter()
    const {empresaid} = router.query
    const {status,data} = useSession()
    useEffect(()=>{
        if(status==='unauthenticated') Router.replace('/auth/signin')
    },[status])

    if(status ==='authenticated' && data.user?.name==empresaid){
        return (
            <div>This page is protected.
                {JSON.stringify(data.user,null,2)+','+empresaid}
            </div>
        )
    }
    return (
    <div>loading</div>
    )
}

export default EmpresaId;
