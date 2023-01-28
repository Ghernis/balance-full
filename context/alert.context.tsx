import { createContext, useState } from 'react'
import { Dispatch } from 'react'

export const AlertaContext = createContext({
    alerta: null,
    setAlerta:()=>null
})

export const AlertaProvider = ({children})=>{
    const [alerta,setAlerta]=useState(null)
    const value={alerta,setAlerta}
    return <AlertaContext.Provider value={value}>{children}</AlertaContext.Provider>

}
