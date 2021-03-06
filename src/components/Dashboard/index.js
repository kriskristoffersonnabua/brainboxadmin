import React from 'react'
import Header from './Header'
import { navigate, Redirect, Router } from '@reach/router'
import { BodyWrapper } from './dashboardStyles'
import { withStyles } from '@material-ui/core/styles'
import Loading from '../Loading'
import Tutors from '../Tutors'
import TutorOverview from '../TutorOverview'
import Services from '../Services'
import EnroleeList from '../EnroleeList'

const Sample = () => <div>hi</div>

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

	componentWillReceiveProps(nextProps) {
		const { userprofile } = nextProps
		this.setState({ userprofile })
	}

	render() {
		const { classes, userprofile, loading } = this.props

		if (loading && !!!userprofile) {
			return <Loading text={'Loading Admin'} />
		}

		if (!!!userprofile) {
			return <Redirect to="/login" noThrow />
		}

		return (
			<BodyWrapper className={classes.root}>
				<Header />
				<Router>
					<Tutors path="/tutors" />
					<TutorOverview path="/tutors/:id" />
					<Services path="/services" />
					<EnroleeList path="/enrolees/:id" />
				</Router>
			</BodyWrapper>
		)
	}
}

export default withStyles(styles)(Dashboard)
