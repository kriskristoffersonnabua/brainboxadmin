import React from 'react'
import TutorContext from '../Tutors/data'
import swal from 'sweetalert2'
import { forIn } from 'lodash'
import { firebase } from '../../App'
import {
	OverviewWrapper,
	OverviewHeader,
	Details,
	LPRContainer
} from './styles'
import { Folder, Feedback } from '@material-ui/icons'
import { navigate } from '@reach/router'
import {
	Button,
	Checkbox,
	Fab,
	Typography,
	Paper,
	Tabs,
	Tab,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Tooltip,
	Fade
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'

class TutorOverview extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tutorId: props.id,
			showLPR: true,
			allRecords: []
		}
	}

	handleTabChange = (evt, value) => {
		this.setState({ showLPR: !value })
	}

	navigateToList = () => navigate('/dashboard/tutors')

	componentDidMount() {
		//TODO: pull all lprs and feedbacks
		this.lprController = firebase.database().ref('lpr')
		this.lprController
			.orderByChild('tutorId')
			.equalTo(this.props.id)
			.on('value', snapshot => {
				if (snapshot.exists()) {
					let allRecords = []
					forIn(snapshot.val(), (record, key) => {
						if (record.tutorialCompleted) {
							allRecords.push({ ...record, lprId: key })
						}
					})
					this.setState({ allRecords })
				}
			})
		//TODO: pull all feedbacks for this tutor
	}

	componentWillUnmount() {
		this.lprController.off()
	}

	handleClaim = evt => {
		//handle claim here
		const lprId = evt.currentTarget.dataset.lprid
		let ref = firebase.database().ref('lpr')
		ref.child(lprId).update({
			isTutorPaymentClaimed: true
		})
		ref.off()
	}

	handleDelete = evt => {
		//handle delete here
		const lprId = evt.currentTarget.dataset.lprid
		swal({
			title: 'Are you sure?',
			text: 'You are about to delete this entry.',
			type: 'warning',
			showCancelButton: true
		}).then(response => {
			if (!!response.value) {
				let ref = firebase.database().ref('lpr')
				ref.child(lprId).remove()
				ref.off()
			}
		})
	}

	render() {
		const { tutorProfile = {} } = this.props
		const { showLPR, allRecords } = this.state

		return (
			<OverviewWrapper>
				<div
					style={{
						width: '100%',
						height: 'auto',
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}>
					<Button
						color="primary"
						variant="contained"
						onClick={this.navigateToList}>
						Back To List
					</Button>
					<Button
						color="secondary"
						variant="contained"
						onClick={() => {}}>
						Deactivate
					</Button>
				</div>
				<OverviewHeader>
					<Details>
						<Typography variant="h6">Name:</Typography>
						<Typography variant="span">{`${tutorProfile.first_name ||
							''} ${tutorProfile.last_name || ''}`}</Typography>
					</Details>
					<Details>
						<Typography>Contact:</Typography>
						<Typography>{tutorProfile.contact || ''}</Typography>
					</Details>
					<Details>
						<Typography>Address:</Typography>
						<Typography>{tutorProfile.address || ''}</Typography>
					</Details>
					<Details>
						<Typography>Email:</Typography>
						<Typography>{tutorProfile.email || ''}</Typography>
					</Details>
					<Details>
						<Typography>Subjects Handled:</Typography>
						<Typography>
							{(!!tutorProfile.subjects &&
								tutorProfile.subjects.join(', ')) ||
								''}
						</Typography>
					</Details>
					<Details>
						<Typography>Account Enabled:</Typography>
						<Typography>{!!tutorProfile.accountEnabled}</Typography>
					</Details>
				</OverviewHeader>
				<LPRContainer>
					<Tabs onChange={this.handleTabChange}>
						<Tab label="LPRs" icon={<Folder />} />
						<Tab label="Feedbacks" icon={<Feedback />} />
					</Tabs>
					{showLPR ? (
						<Fade in={showLPR}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>
											Topics/Lessons Discussed
										</TableCell>
										<TableCell>Time Started</TableCell>
										<TableCell>Time Ended</TableCell>
										<TableCell>
											Total Time Rendered
										</TableCell>
										<TableCell>Tutee/s</TableCell>
										<TableCell>Remarks</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allRecords.map(record => {
										return (
											<TableRow>
												<TableCell>
													{new Date(
														record.date
													).toLocaleDateString()}
												</TableCell>
												<TableCell>
													{
														record.tutorreport
															.topicsdiscussed
													}
												</TableCell>
												<TableCell>
													{
														record.tutorreport
															.time_started
													}
												</TableCell>
												<TableCell>
													{
														record.tutorreport
															.time_ended
													}
												</TableCell>
												<TableCell>{`${record
													.tutorreport.time_ended -
													record.tutorreport
														.time_started} hr/s`}</TableCell>
												<TableCell />
												<TableCell>
													{record.tutorreport.remarks}
												</TableCell>
												<TableCell>
													{!!record.isTutorPaymentClaimed
														? 'Claimed'
														: 'Not Claimed'}
												</TableCell>
												<TableCell>
													<div
														style={{
															height: '100%',
															width: '100%',
															display: 'flex',
															alignItems: 'center'
														}}>
														{!!!record.isTutorPaymentClaimed ? (
															<Button
																data-lprId={
																	record.lprId
																}
																onClick={
																	this
																		.handleClaim
																}
																style={{
																	width:
																		'auto',
																	height:
																		'35px',
																	color:
																		'white',
																	background:
																		'green',
																	padding:
																		'10px',
																	marginRight:
																		'10px'
																}}>
																ClAIM
															</Button>
														) : null}
														<Button
															data-lprId={
																record.lprId
															}
															onClick={
																this
																	.handleDelete
															}
															variant="outlined"
															color="secondary"
															style={{
																width: 'auto',
																height: '35px',
																padding: '10px'
															}}>
															DELETE
														</Button>
													</div>
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</Fade>
					) : null}
				</LPRContainer>
			</OverviewWrapper>
		)
	}
}

export default props => {
	return (
		<TutorContext.Consumer>
			{({ unselectTutor, tutorProfile }) => {
				return (
					<TutorOverview
						unselectTutor={unselectTutor}
						tutorProfile={tutorProfile}
						id={props.id}
					/>
				)
			}}
		</TutorContext.Consumer>
	)
}
