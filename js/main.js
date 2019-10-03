

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
var xAxis = d3.axisBottom()
  .scale(x);
var yAxis = d3.axisLeft()
  .scale(y);


// Initialize SVG axes groups here
var xGroup = svg.append('g')
  .attr('class', 'axis x-axis')
  .attr("transform", "translate(" + 0 + "," + height +
    ")");
var yGroup = svg.append('g')
  .attr('class', 'axis y-axis');

// Initialize data
let data = null;// global variable
var rankMetric; // which metric user chose
var barGroup = svg.append('g');

function updateRankMetric() {
	console.log('update');
	rankMetric = d3.select("#ranking-type").property("value");
	console.log(rankMetric);
}
updateRankMetric();



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
d3.select("#ranking-type")
  .on("change", function() {
    updateRankMetric();
    updateVisualization();
  });

// Add Event listener (reverse sort order)
var state=true;
d3.select("#change-sorting").on("click", function() {
	// do something
	if (state==false){
		state=true;
	}else{
		state=false;
	}
	updateVisualization();
});

// Render visualization
function updateVisualization() {
	console.log('updateVisualization', data);
	// Get the selected ranking option
   console.log(rankMetric);
	// Sort data
	if(state==true){
		if (rankMetric == "stores"){
			data.sort((a, b)=>b.stores - a.stores);
		} else if(rankMetric == "revenue"){
			data.sort((a, b)=>b.revenue - a.revenue);
		}
	}else{
		if (rankMetric == "stores"){
			data.sort((a, b)=>a.stores - b.stores);
		} else if(rankMetric == "revenue"){
			data.sort((a, b)=>a.revenue - b.revenue);
		}
	}
	
	

	// Update scale domains
	let yMinStore = d3.min(data, function(d){ return d.stores});
	let yMaxStore = d3.max(data, function(d){ return d.stores});
	let yMinRevenue = d3.min(data, function(d){ return d.revenue});
	let yMaxRevenue = d3.max(data, function(d){ return d.revenue});
	console.log(yMinStore,yMaxStore,yMinRevenue,yMaxRevenue);
	x.domain(data.map(d=>d.company));
	if (rankMetric == "stores"){
		y.domain([0, yMaxStore]);
		// console.log(y.domain([yMinStore, yMaxStore]));
	}else if (rankMetric == "revenue"){
		y.domain([0, yMaxRevenue]);
	}
	
	// Data join
	let update = svg.selectAll('rect')
	.data(data); 

	// Enter
	if (rankMetric == "stores"){
		update.enter()
		.append('rect')
		.attr("class", "bar")
		.attr("x", d=>x(d.company))
		.attr("y", d=>y(d.stores))
		.attr("width", x.bandwidth())
		.attr("height", d=>height - y(d.stores));

		// Update
	update
	.attr('fill', 'green')
	.attr("class", "bar")
	.attr("x", d=>x(d.company))
	.attr("y", d=>y(d.stores))
	.attr("width", x.bandwidth())
	.attr("height", d=>height - y(d.stores))
	.merge(barGroup)
     .style("opacity", 0.5)
     .transition()
     .duration(1000)
     .style("opacity", 1);


	// Exit
	update.exit()
	  .transition()
       .duration(1000)
		.remove();
		
	// Draw Axes
	xGroup.transition()
	  .attr("class", "x-axis axis")
	  .duration(1000)
	  .call(xAxis);
	yGroup.transition()
	  .attr("class", "y-axis axis")
	  .duration(1000)
	  .call(yAxis);
	
	}else {
		update.enter()
		.append('rect')
		.attr("class", "bar")
		.attr("x", d=>x(d.company))
		.attr("y", d=>y(d.revenue))
		.attr("width", x.bandwidth())
		.attr("height", d=>height - y(d.revenue));

		// Update
	update
	.attr('fill', 'green')
	.attr("class", "bar")
	.attr("x", d=>x(d.company))
	.attr("y", d=>y(d.revenue))
	.attr("width", x.bandwidth())
	.attr("height", d=>height - y(d.revenue))
	.merge(barGroup)
     .style("opacity", 0.5)
     .transition()
     .duration(1000)
     .style("opacity", 1);

	// Exit
	update.exit()
		.transition()
		.duration(1000)
		.remove();
	
	// Draw Axes
	xGroup.transition()
		.attr("class", "x-axis axis")
		.duration(1000)
		.call(xAxis);
	yGroup.transition()
		.attr("class", "y-axis axis")
		.duration(1000)
		.call(yAxis);
	}
}