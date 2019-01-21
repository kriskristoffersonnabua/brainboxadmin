import React from 'react'
import {
	TableRow,
	TableCell,
	Select,
	MenuItem,
	TextField,
	Button
} from '@material-ui/core'
import { assign } from 'lodash'
import { firebase } from '../../App'

class NewServiceForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			schedule: []
		}
	}

	static getDerivedStateFromProps(nextProps) {
		const { schedule } = nextProps
		return { schedule }
	}

	handleStatus = evt => {
		this.setState({ status: evt.target.value })
		this.handleFieldChange(evt)
	}

	handleServiceType = evt => {
		this.setState({ serviceType: evt.target.value })
		this.handleFieldChange(evt)
	}

	handleFieldChange = evt => {
		let updates = {}
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
			this.setState(updates)
		}, 100)
	}

	saveService = () => {
		const {
			schedule,
			slots,
			serviceDescription,
			price,
			serviceType,
			status
		} = this.state

		const ref = firebase.database().ref('service')
		const serviceId = ref.push().key
		ref.child(serviceId).update({
			schedule,
			slots,
			serviceDescription,
			price,
			serviceType,
			status
		})

		setTimeout(() => {
			this.clearState()
			this.props.toggleNewServiceForm()
		}, 2000)
	}

	clearState = () =>
		this.setState({
			schedule: [],
			slots: null,
			serviceDescription: null,
			price: null,
			serviceType: null,
			status: null
		})

	render() {
		const { schedule } = this.state
		const { open } = this.props
		console.log(this.state)

		if (open) {
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
							onChange={this.handleFieldChange}
						/>
					</TableCell>
					<TableCell onClick={this.props.toggleNewScheduleForm}>
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
								'Click To Add'}
						</pre>
					</TableCell>
					<TableCell>
						<TextField
							onChange={this.handleFieldChange}
							type="number"
							name="slots"
						/>
					</TableCell>
					<TableCell padding="none">
						<TextField
							onChange={this.handleFieldChange}
							type="number"
							name="price"
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
						<Button
							onClick={this.saveService}
							style={{
								width: 'auto',
								height: '35px',
								color: 'white',
								background: 'green',
								padding: '10px',
								marginRight: '10px'
							}}>
							Add
						</Button>
					</TableCell>
				</TableRow>
			)
		} else return null
	}
}

export default NewServiceForm
