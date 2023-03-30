import { Variable } from '@prisma/client';
import { createContext, useState } from 'react'
export interface IVariable {
    anio:number;
    mes:number;
    empresaId:string
}

export type VariableContextType = {
    variable:IVariable,
    setVariable:(variable:IVariable)=>void;
};
const defaultState = {
    variable:{anio:0,mes:0,empresaId:''},
    setVariable:()=>null

};
export const VariableContext = createContext<VariableContextType>(defaultState)

export const VariableProvider = ({children})=>{
    const [variable,setVariable]=useState<IVariable>({
        anio:0,
        mes:0,
        empresaId:''
    })
    const value={variable,setVariable}

    return <VariableContext.Provider value={value}>{children}</VariableContext.Provider>
}
