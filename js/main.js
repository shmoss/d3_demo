//execute script when window is loaded
window.onload = function(){
	var w = 900, h = 500;
    var container = d3.select("body") //get the <body> element from the DOM
    
        .append("svg") //put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") //assign a class name
        .style("background-color", "rgba(0,0,0,0.2)") //svg background color
        
        
var innerRect = container.append("rect") //add a <rect> element
        .datum(400)
        .attr("width", function(d){
        	return d*2;
        })
        .attr("height", function(d) {
        	return d;
        })
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color
        
var cityPop = [
        { 
            city: 'Berlin',
            population: 5524
        },
        {
            city: 'Minneapolis',
            population: 407207
        },
        {
            city: 'Nuoakchott',
            population: 600000
        },
        {
            city: 'Dubuque',
            population: 58253
        }
    ];
    
     var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scale.linear()
        .range([450, 50])
      	.domain([0, 700000]); //was minPop, maxPop
        
var x = d3.scale.linear() //create the scale
        .range([90, 638]) //output min and max
        .domain([0, 3]); //input min and max
        
  var color = d3.scale.linear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop, 
            maxPop
        ]);
        
        
var circles = container.selectAll(".circles") //but wait--there are no circles yet!
		.data(cityPop) //here we feed in an array
        .enter() //one of the great mysteries of the universe
        .append("circle") //inspect the HTML--holy crap, there's some circles there
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
       	.attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })
        .attr("cx", function(d, i){
            //use the index to place each circle horizontally
            return 90 + (i * 180);
        })
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke
            //below Example 3.5...create y axis generator
var yAxis = d3.svg.axis()
	.scale(y)
    .orient("left")
        //create axis g element and add axis
var axis = container.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(50, 0)")
    .call(yAxis);
    //below Example 3.9...create a text element and add the title
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
   var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population) + 0;
        })
 
     //first line of label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });

	var format = d3.format(",");
    //second line of label
     var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15") //vertical offset
        .text(function(d){
            return "Pop. " + format(d.population); //use format generator to format numbers
        });

console.log(innerRect);
}

//some other stuff here

//as

