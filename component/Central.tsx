import FormCentral from './FormCentral';

const Central=(props)=>{
    const {nemo}=props
    return (
        <>
            <div className='container'>
                <div>comp central {nemo}</div>
                <FormCentral />
            </div>
        </>
    )
}

export default Central;
