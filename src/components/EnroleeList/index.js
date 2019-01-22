import React from 'react'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'
import { Wrapper } from './styles'
import EnroleeListContext from './controller'
import { firebase } from '../../App'
import { forIn } from 'lodash'

class EnroleeList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {
		const { id } = this.props
		console.log(id)
		this.enroleesRef = firebase
			.database()
			.ref()
			.child('appointment')
			.orderByChild('serviceId')
			.equalTo(id)
			.on('value', snapshot => {
				if (snapshot.exists()) {
					let enrolees = []
					forIn(snapshot.val(), (value, key) => {
						enrolees.push({ appointmentId: key, ...value })
					})
					this.setState({ enrolees })
				}
			})
	}

	render() {
		const { enrolees } = this.state

		return (
			<Wrapper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Last Name</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Contact</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(!!enrolees &&
							enrolees.length > 0 &&
							enrolees.map(enrolee => {
								const {
									reviewee: {
										address,
										lastname,
										firstname,
										contact
									}
								} = enrolee
								return (
									<TableRow>
										<TableCell>{lastname}</TableCell>
										<TableCell>{firstname}</TableCell>
										<TableCell>{address}</TableCell>
										<TableCell>{contact}</TableCell>
									</TableRow>
								)
							})) || (
							<TableRow>
								There are no enrolees for this class.
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Wrapper>
		)
	}
}

export default EnroleeList
