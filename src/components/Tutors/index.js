import React from 'react'
import { TutorListWrapper, TableWrapper } from './styles'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'
import TutorsContext from './data'
import TutorRow from './TutorRow'

class Tutors extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			allTutors: []
		}
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	componentDidMount() {
		this.props.methods.getAllTutors()
	}

	render() {
		const { allTutors } = this.state

		if (this.state.loading) {
			//TODO: LOADING_COMPONENT
			return <div>loading</div>
		}

		return (
			<TutorListWrapper>
				<TableWrapper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Last Name</TableCell>
								<TableCell>First Name</TableCell>
								<TableCell>Account Enabled</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allTutors.map(tutorId => {
								return <TutorRow key={tutorId} id={tutorId} />
							})}
						</TableBody>
					</Table>
				</TableWrapper>
			</TutorListWrapper>
		)
	}
}

export default tutorsProps => {
	return (
		<TutorsContext.Consumer>
			{context => {
				return <Tutors {...tutorsProps} {...context} />
			}}
		</TutorsContext.Consumer>
	)
}
