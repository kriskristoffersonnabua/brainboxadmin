import React from 'react'
import { forIn } from 'lodash'
import { firebase } from '../../App'

const TutorsContext = React.createContext()

class TutorsProvider extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			allTutors: []
		}
	}

	getAllTutors = () => {
		this.setState({ loading: true })
		firebase
			.database()
			.ref()
			.child('userprofile')
			.orderByChild('accountType')
			.equalTo(1)
			.once('value', snapshot => {
				//id only
				let allTutors = []
				forIn(snapshot.val(), (value, key) => {
					allTutors.push(key)
				})
				setTimeout(() => {
					this.setState({ loading: false, allTutors })
				}, 1000)
			})
	}

	render() {
		const fns = {
			getAllTutors: this.getAllTutors
		}
		return (
			<TutorsContext.Provider
				value={{ ...this.state, methods: { ...fns } }}>
				{this.props.children}
			</TutorsContext.Provider>
		)
	}
}

export { TutorsContext as default, TutorsProvider }
