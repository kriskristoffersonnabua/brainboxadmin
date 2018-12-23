import React from 'react'
import { TutorListWrapper, TableWrapper } from './styles'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'
import { navigate } from '@reach/router'
import TutorsContext from './data'
import TutorRow from './TutorRow'
import Loading from '../Loading'

class Tutors extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			allTutors: null
		}
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	componentDidMount() {
		this.props.methods.getAllTutors()
	}

	showTutorOverview = (tutorid, tutorProfile) => {
		this.props.methods.selectTutor(tutorProfile)
		navigate('/dashboard/tutors/' + tutorid)
	}

	render() {
		const { allTutors } = this.state

		if (this.state.loading) {
			return <Loading text={'fetching tutors'} />
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
								return (
									<TutorRow
										navigateToTutorOverview={
											this.showTutorOverview
										}
										key={tutorId}
										id={tutorId}
									/>
								)
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
