import React from 'react'
import Header from './Header'
import { navigate, Redirect } from '@reach/router'
import { BodyWrapper } from './dashboardStyles'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	}
})

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
	}

	getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	render() {
		const { classes, userprofile } = this.props

		if (!!!userprofile) {
			return <Redirect to="/login" noThrow />
		}

		return (
			<BodyWrapper className={classes.root}>
				<Header />
			</BodyWrapper>
		)
	}
}

export default withStyles(styles)(Dashboard)
