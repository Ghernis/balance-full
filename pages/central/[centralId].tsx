import {useEffect,useState} from 'react'
import { trpc } from '../../utils/trpc';

import {useSession} from 'next-auth/react'
import { useRouter } from 'next/router';

import Central from '../../component/Central';

const CentralPagina=()=>{
    const router = useRouter()
    const nemo = router.query.centralId as string || ''
    const {status,data} = useSession()
    const empresaId = data?.user?.name as string || ''
    const central = trpc.central_id.useQuery({empresaId:empresaId,nemo:nemo})

    const centralN={
        nombre:'',
        nemo:'',
        direccion:'',
        localidad:'',
        partido:'',
        sistema:'-1',
        destino:'-1',
        actividad:'',
        notas:'',
        departamentoId:-1,
        empresaId:empresaId
    }

    //useEffect(()=>{
    //    setNemo(router.query.slug as string)
    //    if(data){
    //        setName(data.user?.name as string)
    //    }

    //},[router.isReady,status])
    if(central.isLoading){
        return <div>loanding...</div>
    }
    return (
       <>
            {
            central.data!=null
            ? <Central central={central.data}/>
            : <Central central={centralN} />
            }
        </>
    )
}

export default CentralPagina;
