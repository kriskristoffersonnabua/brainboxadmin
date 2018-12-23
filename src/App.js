import React, { Component } from 'react'
import { assign } from 'lodash'
import firebase from 'firebase'
import { Router, Route, redirectTo, navigate, Redirect } from '@reach/router'
import swal from 'sweetalert2'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const config = {
	apiKey: 'AIzaSyAS-i9qG4cGEF5pCErxwRCkLCpMBlO14RE',
	authDomain: 'brainbox-1526375140649.firebaseapp.com',
	databaseURL: 'https://brainbox-1526375140649.firebaseio.com',
	projectId: 'brainbox-1526375140649',
	storageBucket: 'brainbox-1526375140649.appspot.com',
	messagingSenderId: '122718275558'
}
firebase.initializeApp(config)

//import provider here
import Providers from './providers'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { loading: true, userprofile: null }
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (!!user) {
				firebase
					.database()
					.ref()
					.child('userprofile')
					.child(user.uid)
					.once('value')
					.then(snapshot => {
						let userprofile = snapshot.val()
						if (userprofile.accountType != 3) {
							swal(
								'Not Authorized.',
								'Your account is not authorized as an admin',
								'error'
							)
							firebase.auth().signOut()
							navigate('/login')
						} else {
							setTimeout(() => {
								assign(userprofile, { uid: user.uid })
								this.setState({ userprofile, loading: false })
								navigate('/dashboard/tutors')
							}, 1000)
						}
					})
			} else this.setState({ loading: false, userprofile: null })
		})
	}

	render() {
		const { userprofile, loading } = this.state
		return (
			<Providers>
				<Router>
					<Redirect from="/" to="/dashboard" noThrow />
					<Dashboard
						path="/dashboard/*"
						loading={loading}
						userprofile={userprofile}
					/>
					<Login path="/login" />
				</Router>
			</Providers>
		)
	}
}

export { App as default, firebase }
