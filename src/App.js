/*global d3*/

import React from 'react';
import './App.css';

import * as faker from 'faker';

export default class extends React.Component {
  
  render() {
    return <div id="chart"></div>
  }

  componentDidMount() {
    const data = [...new Array(30)]
      .map((value, index) => ({
          x: faker.random.number({ min: 0, max: 500 }),
          y: faker.random.number({ min: 0, max: 500 }),
          size: faker.random.number({ min: 10, max: 100 }),
          heat: faker.random.number({ min: 100, max: 500 }),
      }))

    const size = { width: 500, height: 600 }

    const
        width = 500,
        height = 500;

    const scale = {
        x: d3.scaleLinear().domain([0, 500]).range([0, width - 50]),
        y: d3.scaleLinear().domain([0, 500]).range([0, height - 50]),
        r: d3.scaleLinear().domain([0, 100]).range([0, 10]),
        h: d3.scaleLinear().domain([0, 500]).range(['rgb(255, 255, 255)', 'rgb(31, 156, 167)']),
    };

    const axis = {
        x: d3.axisTop().scale(scale.x),
        y: d3.axisLeft().scale(scale.y)
    }

    const gridline = {
        x: (ticks = 5) => axis.x.ticks(ticks),
        y: (ticks = 5) => axis.y.ticks(ticks)
    }

    const legend = d3
        .legendColor()
        .shapeWidth(40)
        .cells(11)
        .orient('horizontal')
        .scale(scale.h);

    const svg = d3
        .select('#chart')
        .append('svg')
        .attrs({ ...size })

    svg
        .append('g')
        .attrs({ transform: 'translate(40 30)' })
        .attrs({class: `
            chart__axis
            chart__axis_x
        `})
        .call(axis.x)

    svg
        .append('g')
        .attrs({ transform: 'translate(30 40)' })
        .attrs({class: `
            chart__axis
            chart__axis_y
        `})
        .call(axis.y)

    svg
        .append('g')
        .attrs({ transform: 'translate(30 40)' })
        .attrs({ class: 'chart__grid' })
        .call( gridline.y().tickSize(40 - width).tickFormat("") )

    svg
        .append('g')
        .attrs({ transform: 'translate(40 30)' })
        .attrs({ class: 'chart__grid' })
        .call( gridline.x().tickSize(40 - width).tickFormat("") )

    svg
        .append('g')
        .attrs({ transform: 'translate(30 520)' })
        .attrs({ class: 'chart__legend' })
        .call(legend)

    document
        .querySelectorAll('.label')
        .forEach(element => {
            element.innerHTML = element.innerHTML.match(/[0-9]+/)[0]
            element.style.fontSize = 14
        })

    const circles = svg
        .append('g')
        .attrs({ transform: 'translate(40 40)' })
        .selectAll('circle')
        .data(data)
        .enter()
            .append('circle')
            .attrs({
                cx: data => scale.x(data.x),
                cy: data => scale.y(data.y),
                r: data => scale.r(data.size),
                fill: data => scale.h(data.heat)
            })

  }

}
