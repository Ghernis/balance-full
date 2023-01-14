import React, {useEffect, useRef } from 'react';
import { spiderChart,setRef } from './charts/spider-chart';

const Spider=()=>{
    const d3Chart:any = useRef()
    setRef(d3Chart.current,150,150)
    spiderChart({
        Profecionales: 10,
        Obreros: 20,
        Administrativos: 30,
        Tecnicos: 40,
    }, {
        Profecionales: 20,
        Obreros: 30,
        Administrativos: 40,
        Tecnicos: 10,
        })
    useEffect(()=>{
    },[])
    return (
        <div id='spider-chart'>
            <svg ref={d3Chart}></svg>
        </div>
    )
}
export default Spider;
