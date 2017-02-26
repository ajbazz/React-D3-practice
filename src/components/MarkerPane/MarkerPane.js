import React from 'react'
// import Rd3 from 'rd3'
import D3 from 'd3'
import D3drag from 'd3-drag'
import classes from './MarkerPane.scss'

class MarkerPane extends React.Component {
    componentDidMount () {
		let markers = this.refs.markerPane.children;
		let i = 0;
		let mark = null;
		let self = this;
		let dragged = null;
		
		for (i; i < markers.length; i = i + 1) {
			mark = markers[i];
			mark.draggable = true;
		}
		document.addEventListener("drag", function( event ) {
		}, false);
		document.addEventListener('dragstart', function(e) {
			dragged = e.target;
  			dragged.style.opacity = .5;
		}, false);
		document.addEventListener("dragend", function( event ) {
		      // reset the transparency
		      event.target.style.opacity = "";
		      if ( event.target.classList.contains("dropzone") ) {
		          D3.select(event.target).style("fill","#FFFFFF");
		      }
		  }, false);
		
	  document.addEventListener("dragover", function( event ) {
	      // prevent default to allow drop
	      event.preventDefault();
	  }, false);
	
	  document.addEventListener("dragenter", function( event ) {
	      // highlight potential drop target when the draggable element enters it
	      if ( event.target.classList.contains("dropzone") ) {
	          D3.select(event.target).style("fill","#838690");
	      }
		}, false);	  
		document.addEventListener("dragleave", function( event ) {
	      // highlight potential drop target when the draggable element enters it
	      if ( event.target.classList.contains("dropzone") ) {
	          D3.select(event.target).style("fill","#FFFFFF");
	      }
		}, false);
		document.addEventListener("drop", function( event ) {
	      // prevent default action (open as link for some elements)
	      event.preventDefault();
	      // move dragged elem to the selected drop target
	      if ( event.target.classList.contains("dropzone") ) {
	          dragged.parentNode.removeChild( dragged );
	          event.target.appendChild( dragged );
	          D3.select(event.target).style("fill","red");
	      }
		}, false);
	}
	
	drag (evt) {
		console.log(evt.dataTransfer);
    	evt.dataTransfer.setData("text", evt.target.id);
	}
	
	render () {
		return <div className={classes.markerPane} ref="markerPane"><div className={classes.marker}><div data-x="201" data-y="1">x=201<br/>y=1</div></div> <div className={classes.marker} data-x="351" data-y="351"><div>x=351<br/>y=351</div></div> <div className={classes.marker} data-x="51" data-y="151"><div>x=51<br/>y=151</div></div> <div className={classes.marker} data-x="251" data-y="401"><div>x=251<br/>y=401</div></div></div>
		
	}
}

export default MarkerPane;