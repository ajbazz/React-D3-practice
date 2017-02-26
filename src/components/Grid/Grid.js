import React from 'react'
import Rd3 from 'rd3'
import MarkerPane from '../MarkerPane'
import classes from './Grid.scss'

class Grid extends React.Component {
    componentDidMount () {
		this.gridData();
	}
	
	gridData() {
	    let data = new Array();
	    let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	    let ypos = 1;
	    let width = 50;
	    let height = 50;
	    let click = 0;
	    let rows = this.props.rows;
	    let cols = this.props.cols;
		var dataset = [
		  {x: 0, y: 0},
		  {x: 1, y: 1},
		  {x: 2, y: 2},
		  {x: 3, y: 3},
		  {x: 4, y: 4},
		  {x: 5, y: 5},
		  {x: 6, y: 6},
		  {x: 7, y: 7},
		  {x: 8, y: 8},
		  {x: 9, y: 9},
		  {x: 10, y: 10}
		];
	    // iterate for rows 
	    for (let row = 0; row < rows; row++) {
	        data.push( new Array() );
	
	        // iterate for cells/columns inside rows
	        for (let column = 0; column < cols; column++) {
	            data[row].push({
	                x: xpos,
	                y: ypos,
	                width: width,
	                height: height,
					click: click
	            })
	            // increment the x position. I.e. move it over by 50 (width variable)
	            xpos += width;
	        }
	        // reset the x position after a row is complete
	        xpos = 1;
	        // increment the y position for the next row. Move it down 50 (height variable)
	        ypos += height; 
	    }
	    
	    
    	this.createGrid(data, dataset);
	}
	
	createGrid (data, dataset) {
		const margin = {top: 40, right: 30, bottom: 20, left: 30};
		const gridWidth = 560 - margin.left - margin.right;	
		const gridHeight = 560 - margin.top - margin.bottom;
	    
		    
		    try{
	    let gData = data[0];
		console.log(d3.max(dataset, function(d){return d.x}));
		
		let xScale = d3.scale.linear()
		    .domain([0, d3.max(dataset, function(d){return d.x; })])
		    .range([0, gridWidth]);
	
		let yScale = d3.scale.linear()
	    	.domain([0, d3.max(dataset, function(d){ return d.y; })])
	    	.range([gridHeight, 0]);
			
		let xAxis = d3.svg.axis()
		    .scale(xScale)
		    .orient("bottom")
		    .innerTickSize(-gridHeight)
		    .outerTickSize(0)
		    .tickPadding(10);
		    
		let yAxis = d3.svg.axis()
		    .scale(yScale)
		    .orient("left")
		    .innerTickSize(-gridWidth)
		    .outerTickSize(0)
		    .tickPadding(10);
		
		let grid = d3.select("#grid")
			.append("svg")
		    .attr("width", gridWidth + margin.left + margin.right)
		    .attr("height", gridHeight + margin.top + margin.bottom)
	  	.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		    
		grid.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + gridHeight + ")")
	      .call(xAxis);
	
		grid.append("g")
	      .attr("class", "y axis")
	      .call(yAxis);
		
		let row = grid.selectAll(".row")
			.data(data)
			.enter().append("g")
			.attr("class", "row");
		
		let column = row.selectAll(".square")
		    .data(function(d) { return d; })
		    .enter().append("rect")
		    .attr("class","square dropzone")
		    .attr("x", function(d) { return d.x; })
		    .attr("y", function(d) { return d.y; })
		    .attr("width", function(d) { return d.width; })
		    .attr("height", function(d) { return d.height; })
		    .style("fill", "#fff")
		    .style("stroke", "#222")
			.on('click', function(d) {
		       d.click ++;
		       if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
			   if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
			   if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
			   if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
		   });
		   }catch (err) {
		   	console.log(err);
		   }
	}
	
	render() {
		return <div className=""><MarkerPane /><div id="grid" className={classes.grid}></div></div>
	}
	
	defaultProps = {
		cols: 1,
		rows: 1
	}
	
}
export default Grid; 