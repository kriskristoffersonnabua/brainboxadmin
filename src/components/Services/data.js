import React from 'react'
import { firebase } from '../../App'
import { forIn } from 'lodash'

const ServicesContext = React.createContext()

class ServicesProvider extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			services: []
		}
	}

	componentDidMount() {
		this.controller = firebase.database().ref('service')
		this.controller.on('value', snapshot => {
			if (snapshot.exists()) {
				let services = []
				forIn(snapshot.val(), (value, key) => {
					services.push({ sid: key, ...value })
				})
				setTimeout(() => {
					this.setState({ services })
				}, 500)
			}
		})
	}

	componentWillUnmount() {
		this.controller.off()
	}

	render() {
		return (
			<ServicesContext.Provider value={this.state}>
				{this.props.children}
			</ServicesContext.Provider>
		)
	}
}

export { ServicesContext as default, ServicesProvider }
