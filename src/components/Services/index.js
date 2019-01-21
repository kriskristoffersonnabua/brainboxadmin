import React from 'react'
import ServicesContext from './data'
import { TableWrapper, ServiceWrapper } from './styles'
import {
	Button,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TextField
} from '@material-ui/core'
import ServiceRow from './ServiceRow'
import ScheduleForm from './ScheduleForm'
import NewScheduleForm from './newScheduleForm'
import NewServiceForm from './newServiceForm'
import { firebase } from '../../App'

class Services extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scheduleFormOpen: false,
			newSchedule: [],
			newScheduleFormOpen: false,
			openNewServiceForm: false
		}
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	openForm = (serviceId, schedule) => {
		this.setState({
			serviceId,
			schedule,
			scheduleFormOpen: true
		})
	}

	clearNewSchedule = () => this.setState({ newSchedule: [] })

	closeForm = () =>
		this.setState({
			scheduleFormOpen: false,
			serviceId: null,
			schedule: null,
			newScheduleFormOpen: false
		})

	saveSchedule = newSchedule => {
		const { serviceId } = this.state
		const ref = firebase.database().ref(`service/${serviceId}`)
		ref.update({ schedule: newSchedule })
		ref.off()
		this.closeForm()
	}

	addNewSchedule = newSchedule => {
		this.setState({ newSchedule })
	}

	toggleNewScheduleForm = () => {
		console.log('heheheh')
		this.setState({
			newScheduleFormOpen: !this.state.newScheduleFormOpen
		})
	}

	toggleNewServiceForm = () => {
		this.setState({ openNewServiceForm: !this.state.openNewServiceForm })
	}

	render() {
		const { services } = this.props
		const {
			newSchedule,
			openNewServiceForm,
			newScheduleFormOpen
		} = this.state
		console.log(this.state)
		console.log(this.props)

		return (
			<ServiceWrapper>
				<ScheduleForm
					open={this.state.scheduleFormOpen}
					closeForm={this.closeForm}
					saveSchedule={this.saveSchedule}
					schedule={this.state.schedule}
					serviceId={this.state.serviceId}
				/>
				<NewScheduleForm
					open={this.state.newScheduleFormOpen}
					close={this.toggleNewScheduleForm}
					addNewSchedule={this.addNewSchedule}
				/>
				<div
					style={{
						width: '100%',
						boxSizing: 'border-box',
						margin: '24px',
						height: 'auto',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}>
					<Button
						onClick={this.toggleNewServiceForm}
						variant="outlined"
						color="secondary"
						style={{
							width: 'auto',
							height: '35px',
							padding: '10px'
						}}>
						Add New Service
					</Button>
				</div>
				<TableWrapper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Service Type</TableCell>
								<TableCell>Service Description</TableCell>
								<TableCell>Schedule</TableCell>
								<TableCell>Remaining Slots</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<NewServiceForm
								open={openNewServiceForm}
								schedule={newSchedule}
								toggleNewScheduleForm={
									this.toggleNewScheduleForm
								}
								clearNewSchedule={this.clearNewSchedule}
								toggleNewServiceForm={this.toggleNewServiceForm}
							/>
							{services.map(service => {
								return (
									<ServiceRow
										key={service.sid}
										service={service}
										openForm={this.openForm}
									/>
								)
							})}
						</TableBody>
					</Table>
				</TableWrapper>
			</ServiceWrapper>
		)
	}
}

export default ownprops => {
	return (
		<ServicesContext.Consumer>
			{context => <Services {...context} {...ownprops} />}
		</ServicesContext.Consumer>
	)
}
