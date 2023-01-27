import { useRouter } from 'next/router';
import Central from '../../component/Central';

const CentralPagina=()=>{
    const router = useRouter()
    const {centralId} = router.query
    if(!router.isReady){
        return <div>loanding...</div>
    }
    return (
       <>
            <Central nemo={centralId}/>
        </>
    )
}

export default CentralPagina;
