import { createContext, useState } from 'react'

export const VariableContext = createContext({
    variable:{},
    setVariable:()=>{}
})

export const VariableProvider = ({children})=>{
    const [variable,setVariable]=useState({
        anio:null,
        mes:null,
        empresaId:null
    })
    const value={variable,setVariable}

    return <VariableContext.Provider value={value}>{children}</VariableContext.Provider>
}
