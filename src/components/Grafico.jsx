import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Grafico = ({ data }) => {
    useEffect(() => {
        const svg = d3.select("#grafico")
            .append("svg")
            .attr("width", 500)
            .attr("height", 300);

        const xScale = d3.scaleBand()
            .domain(["Metabolismo Basal", "Calorías con Actividad", "Definición", "Volumen"])
            .range([0, 500])
            .padding(0.4);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([300, 0]);

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => xScale(xScale.domain()[i]))
            .attr("y", d => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", d => 300 - yScale(d))
            .attr("fill", "#69b3a2");

        svg.append("g")
            .attr("transform", "translate(0,300)")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .call(d3.axisLeft(yScale));
    }, [data]);

    return <div id="grafico"></div>;
};

export default Grafico;