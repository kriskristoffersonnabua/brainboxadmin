import React, { Component } from 'react'
import logo from './logo.svg'
import firebase from 'firebase'
import { Router, Route } from '@reach/router'
import Login from './components/Login'
import './App.css'

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
		this.state = { toggle: true }
	}

	toggleToggle = () => this.setState({ toggle: !this.state.toggle })

	componentDidMount() {
		firebase.initializeApp(config)
	}

	render() {
		const { toggle } = this.state
		return (
			<Router>
				<Login path="/login" />
			</Router>
		)
	}
}

function A(props) {
	// you can use object spread because babel-preset-react-app is set up for you
	const { href, children, ...rest } = props
	return (
		<a
			className="App-link"
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			{...rest}>
			{children}
		</a>
	)
}
export default App
