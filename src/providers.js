import React from 'react'
import { TutorsProvider } from './components/Tutors/data'
import { ServicesProvider } from './components/Services/data'

//import providers here
export default props => {
	return (
		<TutorsProvider>
			<ServicesProvider>{props.children}</ServicesProvider>
		</TutorsProvider>
	)
}
