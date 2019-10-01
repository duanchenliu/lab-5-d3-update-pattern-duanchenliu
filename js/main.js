
// SVG drawing area

let margin = {top: 40, right: 10, bottom: 60, left: 60};

let width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Scales
let x = d3.scaleBand()
    .rangeRound([0, width])
	.paddingInner(0.1);

let y = d3.scaleLinear()
    .range([height, 0]);

// Initialize axes Here

// Initialize SVG axes groups here

// Initialize data
let data = null;// global variable

// Load CSV file
d3.csv("data/coffee-house-chains.csv", (d)=>{
	return {
		...d,
		revenue : +d.revenue,
		stores : +d.stores
	}
}).then((allSales)=>{
	data = allSales;
	updateVisualization();

});
// Add Event Listener (ranking type)

// Add Event listener (reverse sort order)

// Render visualization
function updateVisualization() {
	console.log('updateVisualization', data);
	// Get the selected ranking option

	// Sort data

	// Update scale domains

	// Data join

	// Enter

	// Update

	// Exit

	// Draw Axes

}