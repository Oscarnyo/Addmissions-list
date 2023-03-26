d3.csv("admissions.csv").then(function(data) {
  
  // Define custom colors for each bar
  var colorScale = d3.scaleOrdinal()
    .domain(["Male Admit", "Male Reject", "Female Admit", "Female Reject"])
    .range(["#1f77b4", "#aec7e8", "#2ca02c", "#98df8a"]);
  
  //Initialize data
  var chartData = [
    {name: "Male Admit", color: "#1f77b4"},
    {name: "Male Reject", color: "#aec7e8"},
    {name: "Female Admit", color: "#2ca02c"},
    {name: "Female Reject", color: "#98df8a"},
   ];
  

  // Set the dimensions and margins of the chart
  var margin = {top: 30, right: 30, bottom: 70, left: 100},
      width = 1350 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

  // Create the SVG element and append it to the placeholder
  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set the x and y scales
  var xScale = d3.scaleBand()
    .domain(data.map(function(d) { return d.Department; }))
    .range([0, width])
    .padding(0.5);

  var yScale = d3.scaleLinear()
    .domain([0, 550])
    .range([height, 0]);

  // Create the x-axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("y", 20)
    .attr("dy", ".35em")
    .attr("font-weight", "600")
    .style("font-size", "10.5px")
    .style("text-anchor", "middle");
  
    svg.append("text")
    .attr("transform",
          "translate(" + (width/2) + " ," +
                         (height + margin.top + 35) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .attr("font-weight", "600")
    .text("Department");
  
  

  // Create the y-axis
  svg.append("g")
    .call(d3.axisLeft(yScale)
      .tickPadding(10)
      .ticks(10)
    );
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 20 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("font-weight", "600")
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Count");
  

  // Create the bars
  var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + xScale(d.Department) + ",0)"; });
    
  bars.append("rect")
    .attr("x", function(d, i) { return (i % 4) * 25; })
    .attr("y", function(d) { return yScale(d.Count); })
    .attr("width", 20)
    .attr("height", function(d) { return height - yScale(d.Count); })
    .attr("fill", function(d) {
      if (d.Gender === "Male" && d.Status === "Admit") return colorScale("Male Admit");
      else if (d.Gender === "Male" && d.Status === "Reject") return colorScale("Male Reject");
      else if (d.Gender === "Female" && d.Status === "Admit") return colorScale("Female Admit");
      else if (d.Gender === "Female" && d.Status === "Reject") return colorScale("Female Reject");
    })
    
    .on("mouseover", function(d) {
      d3.select(this).attr("opacity", 0.5); // Highlight the bar
      d3.select(this).attr('class', 'highlight');  
          
      
      var rect = this.getBoundingClientRect(); // Get position of bar relative to viewport
      var tooltipWidth = tooltip.node().getBoundingClientRect().width; // Get width of tooltip
      
      tooltip.html(d.Count)
        .style("visibility", "visible") // Show the tooltip
        .style("top", (rect.top - tooltip.node().offsetHeight - 10) + "px") // Position the tooltip above the bar
        .style("left", (rect.left + rect.width / 2 - tooltipWidth / 2) + "px"); // Position the tooltip in the center of the bar
      
    })
    .on("mouseout", function(d) {
      d3.select(this).attr("opacity", 1); // Unhighlight the bar
      d3.select(this).attr('class', 'bar');
      tooltip.style("visibility", "hidden"); // Hide the tooltip
    });
  


// Add the tooltip element
var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden");
    

var legend = svg.selectAll(".legend")
    .data(chartData)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  
legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d) { return d.color; });
  
legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .style("font-size", "15px")
    .text(function(d) { return d.name; });

    




});

