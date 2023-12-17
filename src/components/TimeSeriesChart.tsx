import * as d3 from 'd3';
import './style.css'
import React, { useEffect, useRef } from 'react';

interface TimeSeriesChartProps {
    data: { date: string; value: number }[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
    const d3Container = useRef(null);
    let x: d3.ScaleTime<number, number>;
    let y: d3.ScaleLinear<number, number>;

    useEffect(() => {
        if (data && d3Container.current) {
            const svg = d3.select(d3Container.current);
            d3.select(d3Container.current).selectAll("*").remove();

            const margin = { top: 40, right: 80, bottom: 60, left: 80 };
            const width = 1100 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

            const formatTime = (domainValue: Date | d3.NumberValue) => {
                return domainValue instanceof Date ? d3.timeFormat('%m/%d %H:%M')(domainValue) : '';
            };

            const formattedData = data.map(d => {
                return { date: parseTime(d.date) as Date, value: d.value }
            })

            const valueline = d3.line<{ date: Date; value: number }>()
                .x(d => x(d.date))
                .y(d => y(d.value))
                // .curve(d3.curveCardinal);
                ;

            x = d3.scaleTime().range([0, width])
                .domain(d3.extent(formattedData, d => d.date) as [Date, Date]);
            y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(formattedData, d => d.value) ?? 0]);

            const svgGroup = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)

            svgGroup.append('path')
                .data([formattedData])
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('d', valueline)
                .attr("stroke-width", 3)
                .transition()
                .duration(1000);

            svg
                .append("text")
                .attr("class", "title")
                .attr("x", width / 2)
                .attr("y", margin.top - 10)
                .attr("text-anchor", "middle")
                .text("Total Bet Handle in 2023");

            svgGroup.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x)
                    .tickArguments([d3.timeHour.every(6)])
                    .tickFormat(formatTime))

            svgGroup.append("g")
                .call(d3.axisLeft(y))

            svg
                .append("rect")
                .attr("width", width)
                .attr("height", height)
                .style("fill", "none")
                .style("pointer-events", "all")
        }
    }, [data])

    return (
        <svg
            className='d3-component'
            width={1100}
            height={400}
            ref={d3Container}
        />
    )
}

export default TimeSeriesChart;