import React from 'react'
import {
	TextField,
	Button,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
	MuiPickersUtilsProvider,
	TimePicker,
	DatePicker
} from 'material-ui-pickers'
import { ScheduleFormWrapper, ScheduleFormContainer } from './styles'

const defaultDate = () => {
	const nowDate = new Date().toLocaleDateString().split('/')
	return `${nowDate[2]}-${nowDate[2]}-${nowDate[2]}`
}

const ScheduleSpan = props => {
	const sched = props.schedule.split(':')

	const mornSched = sched[1].split('-')
	const aftSched = sched[2].split('-')

	let scheduleDate = new Date(parseInt(sched[0])).toLocaleDateString()

	let morningSchedule = `${Math.floor(mornSched[0])}:${Math.floor(
		(mornSched[0] % 1) * 60
	)} am, ${mornSched[1]} hr/s`

	let afternoonSchedule = `${Math.floor(aftSched[0] % 12)}:${Math.floor(
		(aftSched[0] % 1) * 60
	)} pm, ${aftSched[1]} hr/s`

	return (
		<TableRow onClick={() => props.removeFromSchedule(props.idx)}>
			<TableCell>{scheduleDate}</TableCell>
			<TableCell>
				{mornSched[0] > 0 ? morningSchedule : 'No morning schedule'}
			</TableCell>
			<TableCell>
				{aftSched[0] > 0 ? afternoonSchedule : 'No Afternoon schedule'}
			</TableCell>
		</TableRow>
	)
}

class ScheduleForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			schedule: [],
			morningtime: null,
			afternoontime: null
		}
	}

	removeFromSchedule = idx => {
		let temp = this.state.schedule
		temp.splice(idx, 1)
		this.setState({ schedule: temp })
	}

	handleFieldChange = evt => {
		const { name } = evt.currentTarget
		this.setState({ [name]: evt.currentTarget.value })
	}

	handleMorningTimePicker = date => {
		this.setState({ morningtime: date })
	}

	handleAfternoonTimePicker = date => {
		this.setState({ afternoontime: date })
	}

	handleAddSchedule = () => {
		const {
			date,
			morningtime,
			morningduration,
			afternoontime,
			afternoonduration,
			schedule
		} = this.state
		let morning = '0',
			afternoon = '0'

		if (!!morningtime && !!morningduration) {
			morning = parseFloat(
				morningtime.getHours() + morningtime.getMinutes() / 60
			).toFixed(1)
		}

		if (!!afternoontime && !!afternoonduration) {
			afternoon = parseFloat(
				afternoontime.getHours() + afternoontime.getMinutes() / 60
			).toFixed(1)
		}

		const data = `${new Date(
			date
		).valueOf()}:${morning}-${morningduration}:${afternoon}-${afternoonduration}`

		schedule.push(data)
		this.setState({ schedule })
		setTimeout(() => {
			this.resetForm()
		}, 1000)
	}

	resetForm = () =>
		this.setState({
			date: null,
			morningtime: null,
			morningduration: null,
			afternoontime: null,
			afternoontime: null
		})

	saveSchedule = () => {
		const { schedule } = this.state
		//save to form
		this.props.addNewSchedule(schedule)
		this.props.close()
	}

	render() {
		const { open } = this.props
		const {
			schedule,
			morningtime,
			afternoontime,
			morningduration,
			afternoonduration
		} = this.state

		const nowdata = defaultDate()
		return (
			<ScheduleFormWrapper open={open}>
				<ScheduleFormContainer>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							padding: '24px'
						}}>
						<MuiPickersUtilsProvider
							style={{ margin: 'none' }}
							utils={DateFnsUtils}>
							<TextField
								style={{ marginBottom: '12px' }}
								type="date"
								name="date"
								label="Date"
								defaultValue={nowdata}
								onChange={this.handleFieldChange}
							/>
							<TimePicker
								margin="normal"
								name="morningtime"
								label="Morning Time"
								style={{ marginBottom: '12px' }}
								onChange={this.handleMorningTimePicker}
								value={morningtime}
							/>
							<TextField
								name="morningduration"
								type="number"
								label="Morning Duration"
								style={{ marginBottom: '12px' }}
								value={morningduration}
								onChange={this.handleFieldChange}
							/>
							<TimePicker
								style={{ marginBottom: '12px' }}
								name="afternoontime"
								label="Afternoon Time"
								onChange={this.handleAfternoonTimePicker}
								value={afternoontime}
							/>
							<TextField
								name="afternoonduration"
								label="Afternoon Duration"
								type="number"
								value={afternoonduration}
								onChange={this.handleFieldChange}
								style={{ marginBottom: '12px' }}
							/>
							<Button
								style={{ marginTop: '12px' }}
								variant="outlined"
								onClick={this.handleAddSchedule}>
								Add
							</Button>
						</MuiPickersUtilsProvider>
					</div>
					<div>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Date</TableCell>
									<TableCell>Morning Schedule</TableCell>
									<TableCell>Afternoon Schedule</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!!schedule &&
									schedule.sort().map((schedule, idx) => {
										return (
											<ScheduleSpan
												schedule={schedule}
												idx={idx}
												removeFromSchedule={
													this.removeFromSchedule
												}
											/>
										)
									})}
							</TableBody>
						</Table>
						<div
							style={{
								width: '100%',
								height: 'auto',
								display: 'flex',
								padding: '24px',
								justifyContent: 'flex-end',
								alignItems: 'center',
								boxSizing: 'border-box'
							}}>
							<Button
								onClick={this.props.closeForm}
								variant="outlined"
								color="primary">
								Cancel
							</Button>
							<Button
								onClick={this.saveSchedule}
								style={{ marginLeft: '12px' }}
								variant="outlined"
								color="primary">
								Save
							</Button>
						</div>
					</div>
				</ScheduleFormContainer>
			</ScheduleFormWrapper>
		)
	}
}

export default ScheduleForm
