import React from 'react'
import { StyledHeader, HeroContainer, NavContainer } from './styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Group from '@material-ui/icons/Group'
import Mood from '@material-ui/icons/Mood'
import Avatar from '@material-ui/core/Avatar'

class Header extends React.Component {
	render() {
		return (
			<StyledHeader>
				<HeroContainer>
					<Avatar />
				</HeroContainer>
				<NavContainer>
					<Tabs>
						<Tab label="Tutors" icon={<Group />} />
						<Tab label="Clients" icon={<Group />} />
					</Tabs>
				</NavContainer>
			</StyledHeader>
		)
	}
}

export default Header
