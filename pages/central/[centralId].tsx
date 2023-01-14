import { useRouter } from 'next/router';
import Central from '../../component/Central';

const CentralPagina=()=>{
    const router = useRouter()
    const {centralId} = router.query
    return (
       <>
            <Central nemo={centralId}/>
        </>
    )
}

export default CentralPagina;
