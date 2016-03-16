//execute script when window is loaded
window.onload = function(){
	//set width and heigh of SVG
	var w = 900, h = 500;
	//we want to select the <body> element from the DOM, this will be set to container variable where all our stuff goes
    var container = d3.select("body") 
    	//use d3 notation to append SVG to body
        .append("svg")
         //assign the width
        .attr("width", w)
         //assign the height
        .attr("height", h)
        //good practice to assign a class for container
        .attr("class", "container")
         //svg background color 
        .style("background-color", "rgba(0,0,0,0.2)")
        
	//make a new element <rect> which will be appended to container
	var innerRect = container.append("rect")
		//use datum to bind a data value to selection
    	.datum(400)
    	//set our rectangle width using the datum
        .attr("width", function(d){
        	//(aka 400 * 2)
        	return d*2;
        })
        //set our rectangle height in the same manner
        .attr("height", function(d) {
        	return d;
        })
        //give our element a class name
        .attr("class", "innerRect") 
        //position from left on the x (horizontal) axis
        .attr("x", 50)
        //position from top on the y (vertical) axis 
        .attr("y", 50)
        //styling for inner rectangle 
        .style("fill", "#FFFFFF"); 
     
    //start with an array, since this is what d3 accepts    
	var cityPop = [
    	{ 
            city: 'Stevens Point',
            population: 69916
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

    //find the minimum value of the array via .min() d3 method
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
        //minPop, maxPop parameters
      	.domain([0, 700000]);
      	
    //create x horizontal scale    
	var x = d3.scale.linear() 
		//output min and max
        .range([90, 638])
        //input min and max 
        .domain([0, 3]); 
    
    //scale the colors in relation to value    
	var color = d3.scale.linear()
		//color range as parameters
        .range([
            "#FDBE85",
            "#D94701"
        ])
        //set our min and max pop
        .domain([
            minPop, 
            maxPop
        ]);
        
   //create our circles - empty selection at first     
	var circles = container.selectAll(".circles")
		//with circles selcted, here we feed in an array of citypop
		.data(cityPop)
		//join data to selection 
        .enter() 
        //append circles
        .append("circle")
        //assign class to circles
        .attr("class", "circles")
        //give circles an id
        .attr("id", function(d){
            return d.city;
        })
        //assign radius
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        //place circles horizontally
       	.attr("cx", function(d, i){
            return x(i);
        })
        //use the index to place each circle horizontally
        .attr("cx", function(d, i){            
            return 90 + (i * 180);
        })
        //create circles from the bottom up
        .attr("cy", function(d){
            return y(d.population);
        })
        //add a fill based on the color scale generator
        .style("fill", function(d, i){ 
            return color(d.population);
        })
        //circle stroke
        .style("stroke", "#000"); 
    //create y axis
	var yAxis = d3.svg.axis()
		.scale(y)
    	.orient("left")
    //hold axis elements in <g>
	var axis = container.append("g")
		//give it a class name
    	.attr("class", "axis")
    	//move to the right of 0,0 coordinate
    	.attr("transform", "translate(50, 0)")
    	.call(yAxis);
    //create a text element and add the title
    var title = container.append("text")
    	//class name
        .attr("class", "title")
        .attr("text-anchor", "middle")
        //set x position
        .attr("x", 450)
        //set y position
        .attr("y", 30)
        .text("City Populations");
   //create labels   
   var labels = container.selectAll(".labels")
   		//labels based on city pop
        .data(cityPop)
        .enter()
        //add the text to text container
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population) + 0;
        })
 
    //first label line
    //tspan breaks up lines 
    var nameLine = labels.append("tspan")
    	//assign class
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        //it prints the city name on first line
        .text(function(d){
            return d.city;
        });
	//generate format
	var format = d3.format(",");
    //second line of label, 
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        //vertical offset
        .attr("dy", "15") 
        .text(function(d){
        	//we'll format numbers here
            return "Pop. " + format(d.population); 
        });

}

//the end

