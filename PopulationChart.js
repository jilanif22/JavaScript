/**
 * Homework 2: Population Chart
 * Produce an application that generates a line chart which shows the population of the United States year over year
 */

 // Set dimensions and margins for the chart
const margin = { top: 50, right: 30, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Create SVG container
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Hardcoded Population Data
const populationData = [
    { year: 2010, population: 309349689 },
    { year: 2011, population: 311721632 },
    { year: 2012, population: 314102623 },
    { year: 2013, population: 316427395 },
    { year: 2014, population: 318907401 },
    { year: 2015, population: 321418820 },
    { year: 2016, population: 323127513 },
    { year: 2017, population: 325719178 },
    { year: 2018, population: 327167439 },
    { year: 2019, population: 328239523 },
    { year: 2020, population: 331449281 }
];

// Set up scales
const x = d3.scaleLinear()
    .domain(d3.extent(populationData, d => d.year))
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([d3.min(populationData, d => d.population) * 0.95, d3.max(populationData, d => d.population)])
    .range([height, 0]);

// Add X Axis
svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

// Add Y Axis
svg.append("g")
    .call(d3.axisLeft(y));

// Add line
svg.append("path")
    .datum(populationData)
    .attr("fill", "none")
    .attr("stroke", "#9370DB")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
        .x(d => x(d.year))
        .y(d => y(d.population))
    );

// Add points to the line
svg.selectAll("circle")
    .data(populationData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.population))
    .attr("r", 4)
    .attr("fill", "	#800080")
    .append("title")
    .text(d => `Year: ${d.year}\nPopulation: ${d3.format(",")(d.population)}`);
