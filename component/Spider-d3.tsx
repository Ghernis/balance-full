import React, {useEffect, useRef } from 'react'
import * as d3 from 'd3'
import  {RadarChart} from './charts/radar-chart';

const SpiderChart = () =>{
    const data = [
        {
            className: 'germany', // optional, can be used for styling
            axes: [
                {axis: "strength", value: 13, yOffset: 10},
                {axis: "intelligence", value: 6},
                {axis: "charisma", value: 5},
                {axis: "dexterity", value: 9},
                {axis: "luck", value: 2, xOffset: -20}
            ]
        },
        {
            className: 'argentina',
            axes: [
                {axis: "strength", value: 6},
                {axis: "intelligence", value: 7},
                {axis: "charisma", value: 10},
                {axis: "dexterity", value: 13},
                {axis: "luck", value: 9}
            ]
        }
    ];
    const d3Chart:any = useRef()
    useEffect(()=>{

        RadarChart.draw(d3Chart.current,data)
        //const chart = RadarChart.chart()
        //const margin = {top:50,right:30,bottom:30,left:30}
        //const width = parseInt(d3.select('#d3Spider').style('width'))
        //const height = parseInt(d3.select('#d3Spider').style('height'))

        //let svg = d3.select(d3Chart.current)
        //.append('svg')
        //.attr('width',width)
        //.attr('height',height)
        ////.style('background-color', 'yellow')
        //svg
        //    .append('g')
        //    .classed('single', 1).datum(data).call(chart)

    },[])
    return (
        <div id='d3Spider'>
            <svg ref={d3Chart}></svg>
        </div>
    )
}

export default SpiderChart;
