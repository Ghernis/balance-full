import * as d3 from 'd3';
import _, {map} from 'underscore'

let referencia;
let width;
let height;


function mapSkillData (skillsMap) {
    return _.map(skillsMap, (value, key) => {
        return {
            axis: key,
            value
        }
    })
}

function spiderChartData (...skillMaps) {
    return skillMaps.map(mapSkillData)
}
export function setRef(ref,w,h){
    referencia=ref
    width=w
    height=h
}

export function spiderChart(...skills) {
    //const width=500;
    //const height=500;
    const margin=20;
    //const width = parseInt(d3.select('#spider-chart').style('width')) - margin - margin
    //const height = parseInt(d3.select('#spider-chart').style('height')) - margin - margin
    const max = 1;
    const labelDistance=1.12;
    const sectorCount=5;
    const dotRadius=0;
    const lineWidth=1;
    const colors = [
              "#ffa600",
              "#003f5c",
              "#2f4b7c",
              "#665191",
              "#a05195",
              "#d45087",
              "#f95d6a",
              "#ff7c43"
    ]

    const getColor = d3.scaleOrdinal().range(colors)


    const data = spiderChartData(...skills).reverse();

    const radius = (height - margin * 2) / 2;
    const maxValue = Math.max(d3.max(_.flatten(data).map((d) => d.value)), max);

    const angleSlice = (Math.PI * 2) / data[0].length;

    const svg = d3.select(referencia)
    .attr('width', width + margin*2)
    .attr('height', (height + margin*2))


    const containerWidth = width - margin * 2;
    const containerHeight = height - margin * 2;
    const container = svg
    .append("g")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .attr(
        "transform",
        `translate(${width / 2 + margin}, ${height / 2 + margin})`
    );

    var axisGrid = container.append("g").attr("class", "axisWrapper");

    axisGrid
        .selectAll(".levels")
        .data(d3.range(1, sectorCount + 1).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", (d, i) => (radius / sectorCount) * d)
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", 0.1);

    const axesDomain = data[0].map((d) => d.axis);

    const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

    const axis = axisGrid
    .selectAll(".axis")
    .data(axesDomain)
    .enter()
    .append("g")
    .attr("class", "axis");

    axis
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr(
            "x2",
            (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
        )
        .attr(
            "y2",
            (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
        )
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px");

    axis
        .append("text")
        .attr("class", "legend")
        .style("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("font-family", "monospace")
        .attr("dy", "0.35em")
        .attr(
            "x",
            (d, i) =>
                rScale(maxValue * labelDistance) *
                    Math.cos(angleSlice * i - Math.PI / 2)
        )
        .attr(
            "y",
            (d, i) =>
                rScale(maxValue * labelDistance) *
                    Math.sin(angleSlice * i - Math.PI / 2)
        )
        .text((d) => d);

    const radarLine = d3
    .lineRadial()
    .curve(d3.curveLinearClosed)
    .radius((d) => rScale(d))
    .angle((d, i) => i * angleSlice);

    const plots = container
    .append("g")
    .selectAll("g")
    .data(data)
    .join("g")
    // .attr("data-name", (d, i) => d.axis)
    // .attr("stroke", (d, i) => getColor(i))
    .attr("fill", (d, i) => getColor(i));
    // .attr("stroke", "steelblue")
    // .attr("fill", "none");

    plots
        .append("path")
        .attr("d", (d) => radarLine(d.map((v) => v.value)))
        .attr("stroke", (d, i) => getColor(i))
        .attr("stroke-width", lineWidth)
        .attr("fill", (d, i) => getColor(i))
.attr("fill-opacity", 0.15);

    plots
        .selectAll("circle")
        .data((d) => d)
        .join("circle")
        .attr("r", dotRadius)
        .attr(
            "cx",
            (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
        )
        .attr(
            "cy",
            (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
        )
        .style("fill-opacity", 1);

    return svg.node();
}
