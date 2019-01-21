import React from 'react'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'

class EnroleeList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
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
					<TableBody />
				</Table>
			</Wrapper>
		)
	}
}
