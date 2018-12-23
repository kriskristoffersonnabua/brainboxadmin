import React from 'react'
import { firebase } from '../../App'

class LRPRow extends React.Component {
	constructor(props) {
		super(props)
		this.state = { record: {}, id: props.id }
	}

	componentDidMount() {
		this.ref = firebase.datase().ref('lpr')
		ref.child(this.props.id).on('value', snapshot => {
			if (snaphsot.exists()) {
				this.setState({ record: snapshot.val() })
			}
		})
	}

	componentWillUnmount() {
		this.ref.off()
	}

	render() {
		const { record } = this.state
		return (
			<TableRow>
				<TableCell>
					{new Date(record.date).toLocaleDateString()}
				</TableCell>
				<TableCell>{record.tutorreport.topicsdiscussed}</TableCell>
				<TableCell>{record.tutorreport.time_started}</TableCell>
				<TableCell>{record.tutorreport.time_ended}</TableCell>
				<TableCell>{`${record.tutorreport.time_ended -
					record.tutorreport.time_started} hr/s`}</TableCell>
				<TableCell />
				<TableCell>{record.tutorreport.remarks}</TableCell>
				<TableCell>
					{!!record.isTutorPaymentClaimed ? 'Claimed' : 'Not Claimed'}
				</TableCell>
				<TableCell>
					<div
						style={{
							height: '100%',
							width: '100%',
							display: 'flex',
							alignItems: 'center'
						}}>
						<Button
							data-lprId={record.lprId}
							onClick={this.handleClaim}
							style={{
								width: 'auto',
								height: '35px',
								color: 'white',
								background: 'green',
								padding: '10px',
								marginRight: '10px'
							}}>
							ClAIM
						</Button>
						<Button
							data-lprId={record.lprId}
							onClick={this.handleDelete}
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
	}
}
