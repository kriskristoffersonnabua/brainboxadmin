import React from 'react'
import { TutorsProvider } from './components/Tutors/data'

//import providers here
export default props => {
	return <TutorsProvider>{props.children}</TutorsProvider>
}
