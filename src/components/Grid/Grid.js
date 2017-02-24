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
    	this.createGrid(data);
	}
	
	createGrid (data) {
		console.log(data);
		let grid = d3.select("#grid")
			.append("svg")
			.attr("width","510px")
			.attr("height","510px");
		
		let row = grid.selectAll(".row")
			.data(data)
			.enter().append("g")
			.attr("class", "row");
		
		let column = row.selectAll(".square")
		    .data(function(d) { return d; })
		    .enter().append("rect")
		    .attr("class","square")
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
	}
	
	render() {
		return <div className="jumbotron"><MarkerPane /><div id="grid" className={classes.grid}></div></div>
	}
	
	defaultProps = {
		cols: 1,
		rows: 1
	}
	
}
export default Grid; 