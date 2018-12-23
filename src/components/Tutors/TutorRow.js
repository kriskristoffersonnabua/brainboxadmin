import React from 'react'
import { firebase } from '../../App'
import { TableRow, TableCell } from '@material-ui/core'

class TutorRow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tutor: {}
		}
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	componentDidMount() {
		this.controller = firebase
			.database()
			.ref('userprofile')
			.child(this.props.id)
			.on('value', snapshot => {
				this.setState({
					tutor: snapshot.val()
				})
			})
	}

	componentWillUnmount() {
		this.controller = null
	}

	showTutorOverview = () => {
		this.props.navigateToTutorOverview(this.props.id, this.state.tutor)
	}

	render() {
		const { last_name, first_name, accountEnabled } = this.state.tutor

		return (
			<TableRow
				onClick={this.showTutorOverview}
				hover={true}
				style={{
					width: '100%'
				}}>
				<TableCell>{last_name || ''}</TableCell>
				<TableCell>{first_name || ''}</TableCell>
				<TableCell align="right">
					{!!accountEnabled ? 'yes' : 'no'}
				</TableCell>
			</TableRow>
		)
	}
}

export default TutorRow
