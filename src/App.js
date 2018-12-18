import React, { Component } from 'react'
import { assign } from 'lodash'
import firebase from 'firebase'
import { Router, Route, redirectTo, navigate } from '@reach/router'
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

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { toggle: true, userprofile: null }
	}

	toggleToggle = () => this.setState({ toggle: !this.state.toggle })

	componentDidMount() {
		firebase.initializeApp(config)
		firebase.auth().onAuthStateChanged(user => {
			console.log(user)
			if (!!user) {
				firebase
					.database()
					.ref()
					.child('userprofile')
					.child(user.uid)
					.once('value')
					.then(snapshot => {
						let userprofile = snapshot.val()
						console.log(userprofile)
						assign(userprofile, { uid: user.uid })
						this.setState({ userprofile })
						navigate('/')
					})
			}
		})
	}

	render() {
		const { userprofile } = this.state
		console.log(userprofile)
		return (
			<Router>
				<Dashboard path="/" userprofile={userprofile} />
				<Login path="/login" />
			</Router>
		)
	}
}

export { App as default, firebase }
