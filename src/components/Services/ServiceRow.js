import React from 'react'
import { assign } from 'lodash'
import {
	Select,
	MenuItem,
	TextField,
	TableRow,
	TableCell,
	Button
} from '@material-ui/core'
import { firebase } from '../../App'

const SERVICES_TYPES = [
	'CSC Exam Review',
	'PSHS Entrance Exam Review',
	'College Entrance Exam Review'
]

class ServiceRow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
			serviceType: props.service.serviceType || 1,
			status: props.service.status || 'On Going',
			updates: {}
		}
	}

	toggleEditMode = () => this.setState({ editing: !this.state.editing })

	handleFieldChange = evt => {
		let updates = this.state.updates
		const target = evt.target

		switch (target.name) {
			case 'price':
				assign(updates, {
					[target.name]: parseInt(target.value)
				})
				break
			case 'slots':
				assign(updates, {
					[target.name]: parseInt(target.value)
				})
				break
			default:
				assign(updates, {
					[target.name]: target.value
				})
				break
		}

		setTimeout(() => {
			this.setState({ updates })
		}, 100)
	}

	handleServiceType = evt => {
		this.setState({ serviceType: evt.target.value })
		this.handleFieldChange(evt)
	}

	handleStatus = evt => {
		this.setState({ status: evt.target.value })
		this.handleFieldChange(evt)
	}

	saveEdits = () => {
		const { service: { sid } } = this.props
		let controller = firebase.database().ref('service')
		controller.child(sid).update(this.state.updates)
		controller.off()
		this.toggleEditMode()
	}

	openScheduleForm = () => {
		console.log(this.props.service)
		!!this.props.openForm &&
			!!this.state.editing &&
			this.props.openForm(
				this.props.service.sid,
				this.props.service.schedule
			)
	}

	deleteService = () => {
		let ref = firebase.database().ref('service/' + this.props.service.sid)
		ref.remove()
		ref.off()
	}

	render() {
		const {
			service: {
				price,
				schedule,
				serviceDescription,
				serviceType,
				slots,
				status,
				sid
			}
		} = this.props
		const { editing } = this.state

		if (!editing) {
			return (
				<TableRow>
					<TableCell>{SERVICES_TYPES[serviceType]}</TableCell>
					<TableCell>{serviceDescription || ''}</TableCell>
					<TableCell>
						<pre>
							{(!!schedule &&
								schedule.length > 0 &&
								schedule.map((val, idx) => {
									const sched = val.split(':')

									const mornSched = sched[1].split('-')
									const aftSched = sched[2].split('-')

									let schedule = new Date(
										parseInt(sched[0])
									).toLocaleDateString()

									if (mornSched[0] > 0) {
										schedule += `,\nMorning: ${Math.floor(
											mornSched[0]
										)}:${Math.floor(
											(mornSched[0] % 1) * 60
										)} am, ${mornSched[1]} hr/s`
									}

									if (aftSched[0] > 0) {
										schedule += `,\nAfternoon: ${Math.floor(
											aftSched[0]
										) % 12}:${Math.floor(
											(aftSched[0] % 1) * 60
										)} pm, ${aftSched[1]} hr/s`
									}

									return `${schedule},\n\n`
								})) ||
								''}
						</pre>
					</TableCell>
					<TableCell>{slots}</TableCell>
					<TableCell>{price}</TableCell>
					<TableCell>{status}</TableCell>
					<TableCell>
						<div
							style={{
								display: 'flex',
								height: '100%',
								width: '100%',
								justifyContent: 'space-around',
								alignItems: 'center'
							}}>
							<Button
								onClick={() => {}}
								style={{
									width: 'auto',
									height: '35px',
									color: 'white',
									background: 'green',
									padding: '10px',
									marginRight: '10px'
								}}>
								Enrolees
							</Button>
							<Button
								onClick={this.toggleEditMode}
								style={{
									width: 'auto',
									height: '35px',
									color: 'white',
									background: 'green',
									padding: '10px',
									marginRight: '10px'
								}}>
								Edit
							</Button>
							<Button
								onClick={this.deleteService}
								style={{
									width: 'auto',
									height: '35px',
									color: 'white',
									background: 'red',
									padding: '10px'
								}}>
								Remove
							</Button>
						</div>
					</TableCell>
				</TableRow>
			)
		} else {
			return (
				<TableRow>
					<TableCell>
						<Select
							name="serviceType"
							value={this.state.serviceType}
							onChange={this.handleServiceType}>
							<MenuItem name="serviceType" value={1}>
								CSC Exam Review
							</MenuItem>
							<MenuItem name="serviceType" value={2}>
								PSHS Entrance Exam Review
							</MenuItem>
							<MenuItem name="serviceType" value={3}>
								College Entrance Exam
							</MenuItem>
						</Select>
					</TableCell>
					<TableCell padding="none">
						<TextField
							name="serviceDescription"
							padding="none"
							multiline={true}
							defaultValue={serviceDescription || ''}
							onChange={this.handleFieldChange}
						/>
					</TableCell>
					<TableCell onClick={this.openScheduleForm}>
						<pre>
							{(!!schedule &&
								schedule.length > 0 &&
								schedule.map((val, idx) => {
									const sched = val.split(':')

									const mornSched = sched[1].split('-')
									const aftSched = sched[2].split('-')

									let schedule = new Date(
										parseInt(sched[0])
									).toLocaleDateString()

									if (mornSched[0] > 0) {
										schedule += `,\nMorning: ${Math.floor(
											mornSched[0]
										)}:${Math.floor(
											(mornSched[0] % 1) * 60
										)} am, ${mornSched[1]} hr/s`
									}

									if (aftSched[0] > 0) {
										schedule += `,\nAfternoon: ${Math.floor(
											aftSched[0]
										) % 12}:${Math.floor(
											(aftSched[0] % 1) * 60
										)} pm, ${aftSched[1]} hr/s`
									}

									return `${schedule},\n\n`
								})) ||
								''}
						</pre>
					</TableCell>
					<TableCell>
						<TextField
							onChange={this.handleFieldChange}
							type="number"
							name="slots"
							defaultValue={slots || ''}
						/>
					</TableCell>
					<TableCell padding="none">
						<TextField
							onChange={this.handleFieldChange}
							type="number"
							name="price"
							defaultValue={price || ''}
						/>
					</TableCell>
					<TableCell>
						<Select
							name="status"
							value={this.state.status}
							onChange={this.handleStatus}>
							<MenuItem name="status" value={'Completed'}>
								Completed
							</MenuItem>
							<MenuItem name="status" value={'On Going'}>
								On Going
							</MenuItem>
							<MenuItem name="status" value={'Cancelled'}>
								Cancelled
							</MenuItem>
						</Select>
					</TableCell>
					<TableCell>
						<div style={{ display: 'flex' }}>
							<Button
								onClick={this.toggleEditMode}
								style={{
									width: 'auto',
									height: '35px',
									color: 'white',
									background: 'green',
									padding: '10px',
									marginRight: '10px'
								}}>
								Cancel
							</Button>
							<Button
								data-sid={sid}
								onClick={this.saveEdits}
								style={{
									width: 'auto',
									height: '35px',
									color: 'white',
									background: 'green',
									padding: '10px',
									marginRight: '10px'
								}}>
								Save
							</Button>
						</div>
					</TableCell>
				</TableRow>
			)
		}
	}
}

export default ServiceRow
