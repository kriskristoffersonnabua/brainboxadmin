import React from 'react'
import Textfield from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class LoginPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div
				style={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					background: '#f0f0f0'
				}}>
				<div
					style={{
						width: '300px',
						height: 'auto',
						background: '#fafafa',
						padding: 20,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						boxShadow: '1px 2px 2px rgba(0,0,0,0.5)'
					}}>
					<img
						width="100"
						height="100"
						style={{
							marginBottom: 10
						}}
						src={require('../../assets/bboxapplogo.png')}
					/>
					<Textfield
						name="username"
						placeholder="email/username"
						style={{ marginBottom: 10, width: '100%' }}
					/>
					<Textfield
						name="password"
						placeholder="password"
						style={{ marginBottom: 10, width: '100%' }}
					/>
					<div
						style={{
							width: '100%',
							height: 'auto',
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 20
						}}>
						<Button color="secondary" variant="contained">
							Cancel
						</Button>
						<Button color="primary" variant="contained">
							Login
						</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default LoginPage
