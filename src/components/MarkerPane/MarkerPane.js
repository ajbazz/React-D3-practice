import React from 'react'
import classes from './MarkerPane.scss'

class MarkerPane extends React.Component {
	render () {
		return <div className={classes.markerPane}><div className={classes.marker}>9, 1</div> <div className={classes.marker}>6, 5</div> <div className={classes.marker}>4, 2</div> <div className={classes.marker}>3, 8</div></div>
	}
}

export default MarkerPane;